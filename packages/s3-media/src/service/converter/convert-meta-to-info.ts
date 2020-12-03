import FileInfo from "../../type/file-info";

function convertMetaToInfo(fileMeta: Record<string, string>): FileInfo {
  const info: Partial<FileInfo> = {};

  info.id = fileMeta.id;
  if (fileMeta.type) info.type = fileMeta.type;

  info.size = Number(fileMeta.size);
  if (fileMeta.width) info.width = Number(fileMeta.width);
  if (fileMeta.height) info.height = Number(fileMeta.height);

  return info as FileInfo;
}

export default convertMetaToInfo;
