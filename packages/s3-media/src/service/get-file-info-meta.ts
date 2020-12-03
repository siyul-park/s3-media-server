import { fromFile } from "file-type";
import sharp from "sharp";
import * as fs from "fs";

import FileInfoMeta from "../type/file-info-meta";

async function getFileInfoMeta(path: string): Promise<FileInfoMeta> {
  const fileStat = await fs.promises.stat(path);
  const fileType = await fromFile(path);
  const meta = await sharp(path).metadata();

  const type = fileType?.mime;
  const { size } = fileStat;

  return {
    type,
    size,
    width: meta.width,
    height: meta.height,
  };
}

export default getFileInfoMeta;
