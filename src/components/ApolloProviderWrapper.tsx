"use client";

import { ApolloProvider } from "@apollo/client";
import { createApolloClient } from "../apollo/apolloClient";

export default function ApolloProviderWrapper({ children }: { children: React.ReactNode }) {
  const client = createApolloClient();
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
