import type { NextPage, GetStaticProps, InferGetStaticPropsType } from "next";
import Head from 'next/head'
import Image from 'next/image'
import Link from "next/link";
import { Entry, EntryCollection } from "contentful";
import styles from '../styles/Home.module.css'
import { buildClient, IArticleFields } from "../lib/contentful";

const client = buildClient();

export const getStaticProps: GetStaticProps = async () => {
  const { items }: EntryCollection<IArticleFields> = await client.getEntries({
    content_type: "article",
    order: "-sys.createdAt",
  });
  return {
    props: { posts: items },
  };
};

type Props = InferGetStaticPropsType<typeof getStaticProps>;

const Home: NextPage<Props> = ({ posts }) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <h1 className={styles.title}>teralympic blog</h1>
        <div>
          <ul>
            {posts &&
              posts.map((post: Entry<IArticleFields>) => (
                <li key={post.sys.id}>
                  <Link href={post.fields.slug}>
                    <h2>{post.fields.title}</h2>
                  </Link>
                </li>
              ))}
          </ul>
        </div>
      </main>
    </div>
  );
};

export default Home;
