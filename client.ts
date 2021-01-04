import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
export const Client = new ApolloClient({
  uri: process.env.CMS_URL,
  cache: new InMemoryCache(),
});
