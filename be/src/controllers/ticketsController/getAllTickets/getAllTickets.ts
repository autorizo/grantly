import knex from '@db/index';

export const getAllTickets = async () => {
  try {
    const tickets = await knex('tickets')
      .select(
        'tickets.id as ticket_id',
        'tickets.name as ticket_name',
        'tickets.cost_in_points',
        'tickets.type as ticket_type',
        'tickets.value',
        'tickets.value_type',
        'tickets.expiration_days',
        'ticket_categories.id as category_id',
        'ticket_categories.name as category_name'
      )
      .leftJoin(
        'ticket_categories',
        'tickets.category_id',
        'ticket_categories.id'
      )
      .orderBy('ticket_categories.name', 'asc');

    const groupedTickets = tickets.reduce(
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
