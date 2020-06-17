import { Machine, assign } from 'xstate'
import { generateVueMachine } from './generateVueMachine'

const MEETUP_API =
  'https://api.meetup.com/BAN-Berlin-Architectural-Network/events'

const machine = new Machine(
  {
    id: 'EventMachine',
    context: {
      eventId: null,
      event: null,
      error: null,
    },
    initial: 'idle',
    states: {
      idle: {
        on: {
          FETCH: 'fetching',
        },
      },
      fetching: {
        invoke: {
          id: 'invoke-fetch',
          src: invokeFetch,
          onDone: {
            actions: ['setEvent'],
            target: 'idle',
          },
          onError: {
            actions: ['setError'],
            target: 'failed',
          },
        },
      },
      failed: {},
    },
  },
  {
    actions: {
      setEvent: assign({
        event: (_, event) => event.data,
      }),

      setError: assign({
        error: (_, event) => event.data,
      }),
    },
  }
)

async function invokeFetch(context, event) {
  console.log(event)
  console.log(context)

  const response = await fetch(`${MEETUP_API}/${event.params.id}`, {
    mode: 'no-cors',
  })

  return response.json()
}

export const eventMachine = generateVueMachine(machine)
