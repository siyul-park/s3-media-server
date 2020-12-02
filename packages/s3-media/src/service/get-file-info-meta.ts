import { fromFile } from "file-type";
import sharp from "sharp";

import FileInfoMeta from "../type/file-info-meta";
import stat from "./fs/stat";

async function getFileInfoMeta(path: string): Promise<FileInfoMeta> {
  const fileStat = await stat(path);
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
