import * as React from "react";
import { graphql, HeadFC, Link, PageProps } from "gatsby";
import { Layout } from "../components/Layout";

type TextNodeFrontMatter =
  Queries.IndexPageQuery["allMarkdownRemark"]["nodes"][number]["frontmatter"];
type TextMeta = {
  [x in keyof NonNullable<TextNodeFrontMatter>]: NonNullable<
    NonNullable<TextNodeFrontMatter>[x]
  >;
};

const assertTextMeta = (matter: TextNodeFrontMatter): matter is TextMeta =>
  !!matter && !!matter.slug && !!matter.title && !matter.title.startsWith("_");
const filterBlog = (meta: TextMeta): boolean => meta.slug.includes("blog");
const formatDate = (dateString: string): string =>
  new Intl.DateTimeFormat("ja", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  })
    .format(new Date(dateString))
    .replaceAll("/", "");

const IndexPage = ({ data }: PageProps<Queries.IndexPageQuery>) => {
  const textMetas = data.allMarkdownRemark.nodes
    .map((node) => node.frontmatter)
    .filter(assertTextMeta);
  const blogMetas = textMetas.filter(filterBlog);
  const novelMetas = textMetas.filter((meta) => !filterBlog(meta));
  return (
    <Layout>
      <h1 className="text-3xl font-bold mb-8">Nachsommer</h1>
      <h2 className="text-2xl font-bold my-8">Text</h2>
      <ul className="flex flex-col gap-4">
        {novelMetas.map((meta) => {
          return (
            <li className="hover:text-neutral-400">
              <Link to={meta.slug}>
                {meta.title} - {meta.version} - {formatDate(meta.lastmod)}
              </Link>
            </li>
          );
        })}
      </ul>
      <h2 className="text-2xl font-bold my-8">Blog</h2>
      <ul className="flex flex-col gap-4">
        {blogMetas.map((meta) => {
          return (
            <li className="hover:text-neutral-400">
              <Link to={meta.slug}>{meta.title}</Link>
            </li>
          );
        })}
      </ul>
    </Layout>
  );
};

export default IndexPage;

export const pageQuery = graphql`
  query IndexPage {
    allMarkdownRemark(
      sort: { fields: frontmatter___date, order: DESC }
      filter: {}
    ) {
      nodes {
        id
        frontmatter {
          slug
          title
          version
          date
          lastmod
        }
      }
    }
  }
`;
