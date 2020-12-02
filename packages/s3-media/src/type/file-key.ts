class FileKey {
  constructor(public style: string, public id: string) {}

  get key(): string {
    return `${this.style}/${this.id}`;
  }
}

export default FileKey;
