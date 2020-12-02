import FileInfo from "./file-info";
import Link from "./link";

interface RelationalFileInfo extends FileInfo {
  links: Link[];
}

export default RelationalFileInfo;
