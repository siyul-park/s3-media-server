function addExtension(name: string, extension?: string): string {
  if (extension === undefined) {
    return name;
  }

  return `${name}.${extension}`;
}

export default addExtension;
