import * as React from "react";
import type { HeadFC } from "gatsby";
import { Layout } from "../components/Layout";

const IndexPage = () => {
  return (
    <Layout>
      <h1 className="text-3xl font-bold">Nachsommer</h1>
    </Layout>
  );
};

export default IndexPage;

export const Head: HeadFC = () => <title>Nachsommer</title>;
