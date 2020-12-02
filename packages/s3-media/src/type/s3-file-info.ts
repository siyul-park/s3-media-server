import FileInfo from "./file-info";

interface S3FileInfo extends FileInfo {
  key: string;
  bucket: string;
}

export default S3FileInfo;
