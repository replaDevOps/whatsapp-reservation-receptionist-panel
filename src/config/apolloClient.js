import { ApolloClient, InMemoryCache, createHttpLink, from, split } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";
import { getMainDefinition } from "@apollo/client/utilities";

const API_URL = "https://220.152.66.148.host.secureserver.net/graphql";

// HTTP Link
const httpLink = createHttpLink({
  uri: API_URL,
  credentials: "include",
});

// Auth Link (Attaches token)
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("accessToken");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer${token}` : "",
    },
  };
});


// Split links: send subscriptions to wsLink, others to httpLink
const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  authLink.concat(httpLink) // make sure auth applies to http
);

// Error Handling Link (Detect expired token)
const errorLink = onError(({ graphQLErrors }) => {
  if (graphQLErrors) {
    for (const err of graphQLErrors) {
      console.error("[GraphQL Error]:", err.message);
      if (
        err.message?.includes("Token is invalid or expired") ||
        err.message?.includes("Invalid token or authentication failed")
      ) {
        localStorage.clear();
        window.location.href = "/";
      }
    }
  }
});

export const client = new ApolloClient({
  link: from([errorLink, splitLink]),
  cache: new InMemoryCache(),
});
