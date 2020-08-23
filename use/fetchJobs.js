import gql from 'graphql-tag'
import { sub } from 'date-fns'
import { hasuraClient } from '@/plugins/apollo'

const jobFragment = gql`
  fragment jobItem on job {
    id
    date
    title
    job_id
    created_at
    company
    subtitle
    url
    site
    image_url
  }
`

export async function invokeFetchAll() {
  const today = new Date()
  const oneWeekAgo = sub(today, { weeks: 1 }).toISOString()
  const oneMonthAgo = sub(today, { months: 1 }).toISOString()

  const { data } = await hasuraClient.query({
    query: gql`
      query allJobs {
        lastWeek: job(
          order_by: { date: desc }
          where: {
            date: { _gt: "${oneWeekAgo}" }
          }
        ) {
          ...jobItem
        }
        lastMonth: job(
          order_by: { date: desc }
          where: {
            date: { _gt: "${oneMonthAgo}" }
            _and: { date: { _lt: "${oneWeekAgo}" } }
          }
        ) {
          ...jobItem
        }
      }
      ${jobFragment}
    `,
  })
  return data
}

export async function invokeFetchLatest() {
  const { data } = await hasuraClient.query({
    query: gql`
      query allJobs {
        job(
          order_by: { date: desc }
          limit: 5
          where: { status: { _neq: "disabled" } }
        ) {
          ...jobItem
        }
      }
      ${jobFragment}
    `,
  })
  return data.job
}
