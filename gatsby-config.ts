import type { GatsbyConfig } from "gatsby";

const config: GatsbyConfig = {
  siteMetadata: {
    title: `Nachsommer`,
    description: `text site by @_nachsommer_`,
    twitterUsername: `@_nachsommer_`,
    image: `/favicon.png`,
    siteUrl: `https://nachsommer.gatsbyjs.io`,
  },
  // More easily incorporate content into your pages through automatic TypeScript type generation and better GraphQL IntelliSense.
  // If you use VSCode you can also use the GraphQL plugin
  // Learn more at: https://gatsby.dev/graphql-typegen
  graphqlTypegen: true,
  plugins: [
    "gatsby-plugin-pnpm",
    "gatsby-plugin-postcss",
    "gatsby-transformer-remark",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "contents",
        path: "./contents",
      },
      __key: "pages",
    },
  ],
};

export default config;
