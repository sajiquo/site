import { graphql, HeadFC, PageProps } from "gatsby";
import React from "react";
import { Layout } from "../components/Layout";
import { SEO } from "../components/Seo";

const TextPage = ({ data }: PageProps<Queries.TextPageQuery>) => {
  const remark = data.markdownRemark;
  if (!remark || !remark.html || !remark.frontmatter?.title) return null;
  return (
    <Layout>
      <article className="prose prose-neutral prose-base leading-relaxed mx-auto px-4 prose-p:m-0 sm:prose-lg sm:leading-loose sm:px-0 sm:prose-p:m-0 ">
        <h1 className="mb-0 sm:mb-0">{remark.frontmatter.title}</h1>
        {remark.frontmatter.version && (
          <dl className="mb-6">
            <dt>version</dt>
            <dd>{remark.frontmatter.version}</dd>
          </dl>
        )}
        <section dangerouslySetInnerHTML={{ __html: remark.html }} />
      </article>
    </Layout>
  );
};

export default TextPage;

export const Head = ({ data }: PageProps<Queries.TextPageQuery>) => {
  return <SEO title={data.markdownRemark?.frontmatter?.title || undefined} />;
};

export const pageQuery = graphql`
  query TextPage($slug: String!) {
    markdownRemark(frontmatter: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        version
      }
    }
  }
`;
