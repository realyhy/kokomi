import { ApolloClient, InMemoryCache } from "@apollo/client";
import { GET_ALL_SLUGS, GET_INDIVIDAL_CARD } from "../../lib/api";
import Search from "../../components/Search";
import Image from "next/image";
import Link from "next/link";

const client = new ApolloClient({
  uri: `${process.env.GRAPHQL_API}`,
  cache: new InMemoryCache(),
});

export default function Card({ card }) {
  return (
    <>
      <Search />
      <h1 align="center">{card.name} </h1>
      <h3 align="center">{card.primaryType}</h3>
      <div className="card-wrapper">
        <div className="card-image">
          <br />
          {card.faction}
          <br />
          {card.element}
          <br />
          <Image
            src={card.image}
            alt="Picture of the card"
            height={250}
            width={150}
          />
          <br />
          <div className="hp_bg"> {card.hp}</div>
          <div className="energy_bg">{card.energy}</div>
          <br />
          <p>
            {card.diceCost !== null ? (
              <span>Cost: {card.diceCost}</span>
            ) : (
              <span></span>
            )}
            <br />
            {card.tag}
            <br />
            {card.secondaryType}
          </p>
          <Link href={`/cards`}> Back to cards list </Link>
        </div>
        <div className="card-desc">
          <div
            className="card-desc-decoration"
            dangerouslySetInnerHTML={{ __html: card.description }}
          />
          <h2>Other</h2>
          <p>
            How to get: {card.get}
            <br />
            <br />
          </p>
        </div>
      </div>
    </>
  );
}

export async function getStaticPaths() {
  const { data } = await client.query({ query: GET_ALL_SLUGS });

  const paths = data.cards.data.map((card) => {
    return { params: { slug: card.attributes.slug } };
  });

  return {
    paths,
    fallback: "blocking",
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
        primaryType: attrs.primary_type.data?.attributes.name ?? null,
        secondaryType: attrs.secondary_type.data?.attributes.name ?? null,
        tag: attrs.tag.data?.attributes.name ?? null,
        diceCost: attrs.diceCost,
        get: attrs.get?.split("_").join(" ") ?? null,
        faction: attrs.faction,
        element: attrs.element,
        weapons: attrs.weapons,
        energy: attrs.energy,
        hp: attrs.hp,
      },
      revalidate: 20,
    },
  };
}
