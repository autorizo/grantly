import knex from '@db/index';

export const getUserTickets = async (userId: string) => {
  try {
    const userTickets = await knex('user_tickets')
      .select(
        'tickets.id as ticket_id',
        'tickets.name as ticket_name',
        'tickets.cost_in_points',
        'tickets.type as ticket_type',
        'tickets.value',
        'tickets.value_type',
        'tickets.expiration_days',
        'ticket_categories.id as category_id',
        'ticket_categories.name as category_name',
        'user_tickets.status',
        'user_tickets.redeemed_at',
        'user_tickets.expires_at'
      )
      .join('tickets', 'user_tickets.ticket_id', 'tickets.id')
      .leftJoin(
        'ticket_categories',
        'tickets.category_id',
        'ticket_categories.id'
      )
      .where('user_tickets.user_id', userId)
      .orderBy('ticket_categories.name', 'asc');

    const groupedTickets = userTickets.reduce(
      (acc, ticket) => {
        const category = ticket.category_name || 'Uncategorized';
        if (!acc[category]) {
          acc[category] = [];
        }
        acc[category].push({
          ticket_id: ticket.ticket_id,
          ticket_name: ticket.ticket_name,
          cost_in_points: ticket.cost_in_points,
          ticket_type: ticket.ticket_type,
          value: ticket.value,
          value_type: ticket.value_type,
          expiration_days: ticket.expiration_days,
          status: ticket.status,
          redeemed_at: ticket.redeemed_at,
          expires_at: ticket.expires_at,
        });
        return acc;
      },
      {} as Record<string, any[]>
    );

    return groupedTickets;
  } catch (error) {
    throw error;
  }
};
