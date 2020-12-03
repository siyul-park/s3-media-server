import Link from "../type/link";

function createFileLinks(styles: string[], id: string): Link[] {
  const links: Link[] = [];
  styles.forEach((style) => {
    links.push(
      {
        relation: `bin/${style}`,
        href: `/bins/${style}/${id}`,
      },
      {
        relation: `meta/${style}`,
        href: `/metas/${style}/${id}`,
      }
    );
  });

  return links;
}

export default createFileLinks;
