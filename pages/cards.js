import { ApolloClient, InMemoryCache } from "@apollo/client";
import { GET_ALL_CARDS } from "../lib/api";
import Link from "next/link";
import Search from "../components/Search";

export default function Cards(cards) {
  return (
    <main>
      <Search />
      <h2>recently updated cards</h2>
      <ul>
        {cards.cards.map((val, i) => {
          return (
            <>
              <li key={i}>
                <Link href={`card/` + val.attributes.slug}>
                  <div className="listImage">
                    <img
                      src={val.attributes.Image.data.attributes.url}
                      alt={val.attributes.name}
                    />
                  </div>
                </Link>
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

  const { data } = await client.query({ query: GET_ALL_CARDS });

  return {
    props: {
      cards: data.cards.data,
    },
  };
}
