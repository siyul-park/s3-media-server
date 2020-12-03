import FileInfo from "../../type/file-info";

function convertInfoToMeta(fileInfo: FileInfo): Record<string, string> {
  const meta: Record<string, string> = {};

  meta.id = fileInfo.id;
  if (fileInfo.type) meta.type = fileInfo.type;

  meta.size = fileInfo.size.toString();
  if (fileInfo.width) meta.width = fileInfo.width.toString();
  if (fileInfo.height) meta.height = fileInfo.height.toString();

  return meta;
}

export default convertInfoToMeta;
