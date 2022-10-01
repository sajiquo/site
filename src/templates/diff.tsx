import { graphql, HeadFC, PageProps } from "gatsby";
import React from "react";
import { Layout } from "../components/Layout";

const DiffPage = ({ data }: PageProps<Queries.DiffPageQuery>) => {
  return (
    <Layout>
      <article className="prose prose-neutral prose-base leading-relaxed mx-auto px-4 prose-p:m-0 sm:prose-lg sm:leading-loose sm:px-0 sm:prose-p:m-0 ">
        <section>{data.before?.rawMarkdownBody}</section>
        <section>{data.after?.rawMarkdownBody}</section>
      </article>
    </Layout>
  );
};

export default DiffPage;

export const pageQuery = graphql`
  query DiffPage($before: String!, $after: String!) {
    before: markdownRemark(frontmatter: { slug: { eq: $before } }) {
      rawMarkdownBody
    }
    after: markdownRemark(frontmatter: { slug: { eq: $after } }) {
      rawMarkdownBody
    }
  }
`;
