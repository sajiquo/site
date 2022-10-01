import * as React from "react";
import { HeadFC, Link } from "gatsby";
import { Layout } from "../components/Layout";

const IndexPage = () => {
  return (
    <Layout>
      <h1 className="text-3xl font-bold mb-8">Nachsommer</h1>
      <ul>
        <li className="hover:text-neutral-400">
          <Link to="/shorts/wash-and-eat.html">洗って食べる</Link>
        </li>
      </ul>
    </Layout>
  );
};

export default IndexPage;

export const Head: HeadFC = () => <title>Nachsommer</title>;
