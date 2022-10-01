import { graphql, HeadFC, PageProps } from "gatsby";
import React from "react";
import { Layout } from "../components/Layout";

const PostPage = ({data}: PageProps<Queries.PostPageQuery>) => {
  const html = data.markdownRemark?.html
  return (
    <Layout>
      {html && <article dangerouslySetInnerHTML={{__html: html}}/>}
    </Layout>
  );
};

export default PostPage;

export const pageQuery = graphql`
  query PostPage($slug: String!) {  
    markdownRemark(frontmatter: {slug: {eq: $slug}}) {
      html
      frontmatter {
        title
        version
      }
    }
  }
`
