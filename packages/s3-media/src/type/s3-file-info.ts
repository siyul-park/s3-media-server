import FileInfo from "./file-info";

interface S3FileInfo extends FileInfo {
  key: string;
  bucket: string;
  location: string;
}

export default S3FileInfo;
