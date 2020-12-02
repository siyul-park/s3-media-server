import RelationalFileInfo from "../../type/relational-file-info";
import FileInfo from "../../type/file-info";
import Link from "../../type/link";

function convertInfoToRelational(
  fileInfo: FileInfo,
  links: Link[]
): RelationalFileInfo {
  return {
    id: fileInfo.id,
    name: fileInfo.name,
    type: fileInfo.type,
    size: fileInfo.size,
    width: fileInfo.width,
    height: fileInfo.height,
    links,
  };
}

export default convertInfoToRelational;
