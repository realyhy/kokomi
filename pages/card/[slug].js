import { ApolloClient, InMemoryCache } from "@apollo/client";
import { GET_ALL_SLUGS, GET_INDIVIDAL_CARD } from "../../lib/api";
import Image from "next/image";
import Link from "next/link";

const client = new ApolloClient({
  uri: `${process.env.GRAPHQL_API}`,
  cache: new InMemoryCache(),
});

export default function Card({ card }) {
  return (
    <div>
      <h1> {card.name} </h1>
      <small> Type: {card.type} </small>
      <br />
      <Image
        src={card.image}
        alt="Picture of the author"
        height={250}
        width={150}
      />
      <div dangerouslySetInnerHTML={{ __html: card.description }} />
      <Link href={`/cards`}> Back to cards list </Link>
    </div>
  );
}

export async function getStaticPaths() {
  const { data } = await client.query({ query: GET_ALL_SLUGS });

  const paths = data.cards.data.map((card) => {
    return { params: { slug: card.attributes.slug } };
  });

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const { data } = await client.query({
    query: GET_INDIVIDAL_CARD,
    variables: { slugUrl: params.slug },
  });

  const attrs = data.cards.data[0].attributes;

  return {
    props: {
      card: {
        name: attrs.name,
        description: attrs.description,
        image: attrs.Image.data.attributes.url,
        type: attrs.types.data[0].attributes.name,
      },
    },
  };
}
