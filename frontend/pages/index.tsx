import Image from 'next/image'
import { Inter } from 'next/font/google'
import Head from "next/head"
// import styles from "../styles/Home.module.css"
import Signai from "../components/signai"
import type { NextPage } from "next"
// import logo from "../public/signaiLogo.svg"

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
  )
}
