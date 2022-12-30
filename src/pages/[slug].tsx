import type { NextPage, InferGetStaticPropsType, GetStaticPaths } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import ErrorPage from "next/error";
import styles from "../styles/Home.module.css";
import { buildClient, IArticleFields } from "../lib/contentful";
import { EntryCollection } from "contentful";
import ReactMarkdown from 'react-markdown'

const client = buildClient();

const getPostEntries = async () => {
  const { items }: EntryCollection<IArticleFields> = await client.getEntries({
    content_type: "article",
  });
  return items;
};

export const getStaticPaths: GetStaticPaths = async () => {
  const items = await getPostEntries();
  const paths = items.map((item) => {
    return {
      params: { slug: item.fields.slug },
    };
  });
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async () => {
  const items = await getPostEntries();
  return {
    props: {
      posts: items,
    },
  };
};

type Props = InferGetStaticPropsType<typeof getStaticProps>;

const Post: NextPage<Props> = ({ posts }) => {
  const router = useRouter();
  if (!router.isFallback && !posts[0].fields.slug) {
    return <ErrorPage statusCode={404} />;
  }
  const post = posts[0];
  return (
    <div className={styles.container}>
      <Head>
        <title>{post.fields.title}</title>
      </Head>
      <main>
        <h1>{post.fields.title}</h1>
        <div>
          <ReactMarkdown>{post.fields.content}</ReactMarkdown>
        </div>
      </main>
    </div>
  );
};

export default Post;
