import { createClient, Entry } from "contentful";

export interface IArticleFields {
  title: string;
  slug: string;
  content: string;
}

export interface IArticle extends Entry<IArticleFields> {
  sys: {
    id: string;
    type: string;
    createdAt: string;
    updatedAt: string;
    locale: string;
    contentType: {
      sys: {
        id: "article";
        linkType: "ContentType";
        type: "Link";
      };
    };
  };
}

export const buildClient = () => {
  const client = createClient({
    space: process.env.CF_SPACE_ID || "",
    accessToken: process.env.CF_ACCESS_TOKEN || "",
  });
  return client;
};
