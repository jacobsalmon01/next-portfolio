import { gql } from "@apollo/client";
import { Client } from "client";

const GET_POST_BY_SLUG = gql`
  query getPost($slug: String!) {
    product(where: { slug: $slug }) {
      title
      excerpt
    }
  }
`;

export async function getStaticProps({ params }: any) {
  let slug: string = params.slug;
  const { data } = await Client.query({
    query: GET_POST_BY_SLUG,
    variables: {
      slug,
    },
  });
  return {
    props: {
      data,
    },
  };
}

export async function getStaticPaths() {
  const { data } = await Client.query({
    query: gql`
      query {
        posts {
          slug
        }
      }
    `,
  });
  let posts: any[] = data.posts;
  return {
    paths: posts.map((post) => ({
      params: { slug: post.slug },
    })),
    fallback: false,
  };
}

export default function Product({ data }: any) {
  let post: any = data.post;
  return (
    <>
      <h1>{post.title}</h1>
      <h2>{post.excerpt}</h2>
    </>
  );
}
