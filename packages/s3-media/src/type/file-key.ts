class FileKey {
  constructor(public style: string, public id: string) {}

  get key(): string {
    return `${this.style}/${this.id}`;
  }

  static fromOrigin(id: string): FileKey {
    return new FileKey("original", id);
  }
}

export default FileKey;
