import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "http://127.0.0.1:1337",
  cache: new InMemoryCache(),
});

export default client;
