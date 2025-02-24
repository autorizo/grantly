export type Tickets = {
  name: string
  cost_in_points: number
  type: string
  value: number
  value_type: string
  expiration_days: number
}

export type Categories = {
  name: string
  tickets: Tickets[]
}

export type TicketsState = {
  categories: Categories[]
  userTickets: Categories[]
  setTickets: (tickets: Categories[]) => void
  setUserTickets: (tickets: Categories[]) => void
}
