import { Container } from "@/components/Container";
import Link from "next/link";
import { gql } from "@apollo/client";
import { Client } from "client";
import postcss from "postcss";

export async function getStaticProps() {
  const { data } = await Client.query({
    query: gql`
      query {
        posts {
          title
          excerpt
          slug
        }
      }
    `,
  });
  return {
    props: {
      data,
    },
  };
}
interface Props {
  data: any;
}

export default function Home( props: Props ) {
  console.log(props.data.posts)
  console.log(props.data.excerpt)
  let posts: any[] = props.data.posts;
  return (
    <>
    <Container>
      <h1 className="font-serif text-2xl font-extrabold">Zipperfield</h1>
    </Container>
    <h1>Posts</h1>
      <div>Here are my posts:</div>
      <div>
        {posts.map((post) => {
          return (
            <div>
              <h3>{post.title}</h3>
              <h4>{post.excerpt}</h4>
              <Link href={`/post/${post.slug}`}>
                <a>View More!</a>
              </Link>
            </div>
          );
        })}
      </div>
    </>
  );
}
