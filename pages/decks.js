import { ApolloClient, InMemoryCache } from "@apollo/client";
import { GET_ALL_DECKS } from "../lib/api";
import Link from "next/link";
import React from "react";
import Image from "next/image";

export default function Decks(decks) {
  return (
    <main>
      <h2>recently updated decks</h2>
      <ul>
        {decks.decks.map((val, i) => {
          return (
            <>
              <li>
                <div key={i} className="listImage">
                  <p>{val.attributes.deckName}</p>
                </div>
              </li>
            </>
          );
        })}
      </ul>
      <Link href={`/`}> Back to Home </Link>
    </main>
  );
}

export async function getStaticProps() {
  const client = new ApolloClient({
    uri: `${process.env.GRAPHQL_API}`,
    cache: new InMemoryCache(),
  });

  const { data } = await client.query({ query: GET_ALL_DECKS });

  return {
    props: {
      decks: data.decks.data,
    },
  };
}
