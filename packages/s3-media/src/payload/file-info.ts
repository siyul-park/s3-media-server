interface FileInfo {
  id: string;

  name: string;
  type: string;

  size: number;
  width: number;
  height: number;

  hash: string;
  hashAlgorithm: string;

  createdAt: number;
  updatedAt: number;
}

export default FileInfo;
