import { graphql, PageProps } from "gatsby";
import React from "react";
import { diffChars, diffLines, diffSentences, diffWords } from "diff";
import { Layout } from "../components/Layout";
import { SEO } from "../components/Seo";

const DiffPage = ({ data }: PageProps<Queries.DiffPageQuery>) => {
  const before = data.before?.rawMarkdownBody?.replaceAll("\n\n", "\n");
  const after = data.after?.rawMarkdownBody?.replaceAll("\n\n", "\n");
  if (!before || !after) return null;
  const diff = diffLines(before, after, { ignoreCase: false });
  return (
    <Layout>
      <article className="prose prose-neutral prose-base leading-relaxed mx-auto px-4 whitespace-pre-line prose-p:m-0 sm:prose-lg sm:leading-loose sm:px-0 sm:prose-p:m-0 ">
        <h1 className="mb-6 sm:mb-6">{data.meta?.frontmatter?.title}</h1>
        {diff.map((part) => {
          return (
            <span
              className={
                part.removed
                  ? "text-red-600 line-through"
                  : part.added
                  ? "text-green-600"
                  : "text-neutral-700"
              }
            >
              {part.value}
            </span>
          );
        })}
      </article>
    </Layout>
  );
};

export default DiffPage;

export const Head = ({ data }: PageProps<Queries.DiffPageQuery>) => {
  return <SEO title={data.meta?.frontmatter?.title || undefined} />;
};

export const pageQuery = graphql`
  query DiffPage($before: String!, $after: String!, $slug: String!) {
    before: markdownRemark(frontmatter: { slug: { eq: $before } }) {
      rawMarkdownBody
    }
    after: markdownRemark(frontmatter: { slug: { eq: $after } }) {
      rawMarkdownBody
    }
    meta: markdownRemark(frontmatter: { slug: { eq: $slug } }) {
      frontmatter {
        title
        date
        lastmod
      }
    }
  }
`;
