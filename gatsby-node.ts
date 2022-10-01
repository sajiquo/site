import type { GatsbyNode } from "gatsby";
import { resolve } from "path";

const templates: Record<string, string> = {
  text: resolve(__dirname, `./src/templates/text.tsx`),
  diff: resolve(__dirname, `./src/templates/diff.tsx`),
};

type Frontmatter =
  Queries.createPagesQuery["allMarkdownRemark"]["nodes"][number]["frontmatter"];

const resolveContext = (
  frontmatter: NonNullable<Frontmatter>
): Record<string, string> | undefined => {
  switch (frontmatter.type) {
    case "text":
      if (!frontmatter.slug) return;
      return {
        slug: frontmatter.slug,
      };
    case "diff":
      const { slug, before, after } = frontmatter;
      if (!slug || !before || !after) return;
      return {
        slug,
        before,
        after,
      };
  }
};

export const createPages: GatsbyNode["createPages"] = async ({
  actions,
  graphql,
}) => {
  const { data } = await graphql<Queries.createPagesQuery>(`
    query createPages {
      allMarkdownRemark {
        nodes {
          frontmatter {
            type
            slug
            before
            after
          }
        }
      }
    }
  `);

  data?.allMarkdownRemark.nodes.forEach((node) => {
    const frontmatter = node?.frontmatter;
    if (!frontmatter || !frontmatter.slug || !frontmatter.type) return;

    const path = frontmatter.slug;
    const component = templates[frontmatter.type];
    const context = resolveContext(frontmatter);
    if (!component || !context) return;

    actions.createPage({
      path,
      component,
      context,
    });
  });
};
