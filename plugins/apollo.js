import { ApolloClient, InMemoryCache, HttpLink } from 'apollo-boost'
import fetch from 'node-fetch'
const cache = new InMemoryCache()

export const storyblokClient = new ApolloClient({
  cache,
  link: new HttpLink({
    fetch,
    uri: process.env.NUXT_ENV_STORYBLOK_GRAPHQL_URI,
    headers: {
      Token: process.env.NUXT_ENV_STORYBLOK_TOKEN,
    },
  }),
})
export const hasuraClient = new ApolloClient({
  cache,
  link: new HttpLink({
    fetch,
    uri: process.env.NUXT_ENV_HASURA_GRAPHQL_URI,
    headers: {
      'x-hasura-admin-secret': process.env.NUXT_ENV_HASURA_ADMIN_SECRET,
    },
  }),
})
