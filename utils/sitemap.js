import StoryblokClient from 'storyblok-js-client'

export const fetchSitemapRoutes = async () => {
  const routes = []
  const client = new StoryblokClient({
    accessToken: process.env.NUXT_ENV_STORYBLOK_TOKEN,
  })

  const { data: eventsData } = await client.get('cdn/links', {
    starts_with: 'events/',
  })

  Object.values(eventsData.links).forEach((event) =>
    routes.push(`/berlin/${event.slug}`)
  )

  return routes
}
