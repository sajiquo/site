import * as React from "react";
import { HeadFC } from "gatsby";
import { Layout } from "../components/Layout";

const NotFoundPage = () => {
  return <Layout>404</Layout>;
};

export default NotFoundPage;

export const Head: HeadFC = () => <title>Not found</title>;
