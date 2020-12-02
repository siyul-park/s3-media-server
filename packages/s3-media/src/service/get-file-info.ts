import uniqid from "uniqid";
import { fromFile } from "file-type";
import sharp from "sharp";

import FileInfo from "../type/file-info";
import stat from "./fs/stat";

async function getFileInfo(path: string): Promise<FileInfo> {
  const fileStat = await stat(path);
  const fileType = await fromFile(path);
  const meta = await sharp(path).metadata();

  const id = uniqid();
  const name = id;
  const type = fileType?.mime;
  const { size } = fileStat;

  return {
    id,
    name,
    type,
    size,
    width: meta.width,
    height: meta.height,
  };
}

export default getFileInfo;
