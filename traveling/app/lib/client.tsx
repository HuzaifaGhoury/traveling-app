// apolloclient.ts
import { ApolloClient, InMemoryCache } from "@apollo/client";

const getApolloClient = () => {
  const apolloCache = new InMemoryCache();

  const apolloClient = new ApolloClient({
    uri: "https://api.hikeupmexico.com/graphql/",
    cache: apolloCache,
  });

  return apolloClient;
};

export default getApolloClient;