import { create } from "domain"

create
exports.createPages = async function ({ actions, graphql }) {
}


import type { GatsbyNode } from "gatsby"
import { resolve } from "path"

export const createPages: GatsbyNode["createPages"] = async ({
  actions,
  graphql
}) => {
  const { data } = await graphql(`
    query createPages {
      allMarkdownRemark {
        nodes {
          frontmatter {
            slug
            title
            version
          }
        }
      }
    }
  `)
  // @ts-expect-error
  data.allMarkdownRemark.nodes.forEach(node => {
    const slug = node.frontmatter.slug
    actions.createPage({
      path: slug,
      component: resolve(__dirname, `./src/templates/post.tsx`),
      context: { slug: slug },
    })
  })
}
