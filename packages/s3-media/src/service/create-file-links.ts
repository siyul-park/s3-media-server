import Link from "../type/link";

function createFileLinks(styles: string[], id: string): Link[] {
  return styles.map((style) => ({
    relation: style,
    href: `/bin/${style}/${id}`,
  }));
}

export default createFileLinks;
