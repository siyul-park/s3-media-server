import Link from "../type/link";

function createFileLinks(styles: string[], id: string): Link[] {
  return styles.map((style) => ({
    relation: style,
    href: `/bins/${style}/${id}`,
  }));
}

export default createFileLinks;
