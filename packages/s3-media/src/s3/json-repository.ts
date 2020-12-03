import NodeCache from "node-cache";

import S3Repository from "./s3-repository";
import addExtension from "../service/add-extension";
import NotFoundError from "../error/not-found-error";
import ConflictError from "../error/conflict-error";

class JsonRepository<T extends { id: string }> {
  private readonly cache = new NodeCache({ stdTTL: 60 * 24 });

  constructor(
    private readonly s3Repository: S3Repository,
    private readonly key: string
  ) {}

  async create(entity: T): Promise<T> {
    if (await this.forceExist(entity.id)) {
      throw new ConflictError(`${this.key}/${entity.id} already exists`);
    }

    return this.forceSave(entity);
  }

  async update(entity: Partial<T> & Pick<T, "id">): Promise<T> {
    const exist = await this.forceFind(entity.id);
    if (exist === undefined) {
      throw new NotFoundError(`${this.key}/${entity.id} not exists`);
    }

    const newOne = { ...exist, ...entity };

    return this.forceSave(newOne);
  }

  async fetch(id: string): Promise<T> {
    const result = await this.find(id);
    if (result === undefined) {
      throw new NotFoundError(`${this.key}/${id} not exists`);
    }

    return result;
  }

  async findOrSave(id: string, provider: () => T | Promise<T>): Promise<T> {
    const exist = await this.forceFind(id);
    if (exist !== undefined) {
      return exist;
    }
    return this.forceSave(await provider());
  }

  async findAll(): Promise<T[]> {
    const ids = await this.findAllIds();
    const idMap = new Set<string>(ids);
    this.cache.del(this.cache.keys().filter((id) => !idMap.has(id)));

    const result = await Promise.all(ids.map((id) => this.find(id)));
    return result.filter((value) => value !== undefined) as T[];
  }

  async findAllIds(): Promise<string[]> {
    const data = await this.s3Repository.listObjectsV2({
      Prefix: `${this.key}/`,
    });

    const keys = (data.Contents ?? []).map((value) => value.Key) as string[];
    return keys
      .map((key) => this.getId(key))
      .filter((value) => value !== undefined) as string[];
  }

  async find(id: string): Promise<T | undefined> {
    return this.getOrSet(id, async () => this.forceFind(id));
  }

  async forceSave(style: T): Promise<T> {
    await this.s3Repository.upload({
      Key: this.getKey(style.id),
      Body: JSON.stringify(style),
    });

    this.cache.set(style.id, style);

    return style;
  }

  async forceFind(id: string): Promise<T | undefined> {
    const data = await this.s3Repository.getObject({
      Key: this.getKey(id),
    });
    const json =
      data.Body === undefined ? undefined : JSON.parse(data.Body.toString());

    if (json === undefined) {
      this.cache.del(id);
    } else {
      this.cache.set(id, json);
    }

    return json as T | undefined;
  }

  async forceExist(id: string): Promise<boolean> {
    const data = await this.s3Repository.headObject({
      Key: this.getKey(id),
    });

    const isExist = data.Metadata !== undefined;
    if (!isExist) this.cache.del(id);

    return isExist;
  }

  private async getOrSet<T>(
    id: string,
    provider: () => T | Promise<T>
  ): Promise<T> {
    const exist = this.cache.get(id);
    if (exist !== undefined) {
      return exist as T;
    }

    const newOne = await provider();
    if (newOne === undefined) {
      this.cache.del(id);
    } else {
      this.cache.set(id, newOne);
    }

    return newOne;
  }

  private getKey(id: string): string {
    return addExtension(`${this.key}/${id}`, "json");
  }

  private getId(key: string): string | undefined {
    return key.split(`${this.key}/`).pop()?.split(".json")?.[0];
  }
}

export default JsonRepository;
