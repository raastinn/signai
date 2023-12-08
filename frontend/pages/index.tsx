import Head from "next/head";
import Signai from "../components/signai";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Signai | AI Marketing</title>
        <meta
          name="description"
          content="Generate branding snippets for your product."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Signai />
    </div>
  );
}
