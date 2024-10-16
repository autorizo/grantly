import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('permissions').del();

  // Get provider IDs from the database
  const claroId = await knex('providers')
    .where({ name: 'Claro' })
    .select('id')
    .first();
  const tigoId = await knex('providers')
    .where({ name: 'Tigo' })
    .select('id')
    .first();
  const bancolombiaId = await knex('providers')
    .where({ name: 'Bancolombia' })
    .select('id')
    .first();
  const daviviendaId = await knex('providers')
    .where({ name: 'Davivienda' })
    .select('id')
    .first();

  // Ensure provider IDs exist
  if (!claroId || !tigoId || !bancolombiaId || !daviviendaId) {
    throw new Error('One or more providers not found.');
  }

  // Inserts seed entries for permissions
  return knex('permissions').insert([
    // Claro permissions
    {
      id: knex.raw('UUID()'),
      provider_id: claroId.id,
      name: 'Consulta de Datos personales',
      points: 5,
      description: 'Habilitar consulta de datos personales.',
      image: 'user',
      pdf_path: 'https://morth.nic.in/sites/default/files/dd12-13_0.pdf',
    },
    {
      id: knex.raw('UUID()'),
      provider_id: claroId.id,
      name: 'Llamadas telefónicas',
      points: 10,
      description: 'Habilitar llamadas telefónicas.',
      image: 'phone',
      pdf_path: 'https://morth.nic.in/sites/default/files/dd12-13_0.pdf',
    },
    {
      id: knex.raw('UUID()'),
      provider_id: claroId.id,
      name: 'Envío de SMS',
      points: 5,
      description: 'Habilitar envío de SMS.',
      image: 'comment',
      pdf_path: 'https://morth.nic.in/sites/default/files/dd12-13_0.pdf',
    },
    {
      id: knex.raw('UUID()'),
      provider_id: claroId.id,
      name: 'Envío de Emails',
      points: 5,
      description: 'Habilitar envío de correos electrónicos.',
      image: 'envelope',
      pdf_path: 'https://morth.nic.in/sites/default/files/dd12-13_0.pdf',
    },
    {
      id: knex.raw('UUID()'),
      provider_id: claroId.id,
      name: 'Contacto por Whatsapp',
      points: 5,
      description: 'Habilitar contacto por Whatsapp.',
      image: 'whatsapp',
      pdf_path: 'https://morth.nic.in/sites/default/files/dd12-13_0.pdf',
    },
    {
      id: knex.raw('UUID()'),
      provider_id: claroId.id,
      name: 'Consulta de información financiera',
      points: 10,
      description: 'Habilitar consulta de información financiera.',
      image: 'finance',
      pdf_path: 'https://morth.nic.in/sites/default/files/dd12-13_0.pdf',
    },

    // Tigo permissions
    {
      id: knex.raw('UUID()'),
      provider_id: tigoId.id,
      name: 'Consulta de Datos personales',
      points: 5,
      description: 'Habilitar consulta de datos personales.',
      image: 'user',
      pdf_path: 'https://morth.nic.in/sites/default/files/dd12-13_0.pdf',
    },
    {
      id: knex.raw('UUID()'),
      provider_id: tigoId.id,
      name: 'Llamadas telefónicas',
      points: 10,
      description: 'Habilitar llamadas telefónicas.',
      image: 'phone',
      pdf_path: 'https://morth.nic.in/sites/default/files/dd12-13_0.pdf',
    },
    {
      id: knex.raw('UUID()'),
      provider_id: tigoId.id,
      name: 'Envío de SMS',
      points: 5,
      description: 'Habilitar envío de SMS.',
      image: 'comment',
      pdf_path: 'https://morth.nic.in/sites/default/files/dd12-13_0.pdf',
    },
    {
      id: knex.raw('UUID()'),
      provider_id: tigoId.id,
      name: 'Envío de Emails',
      points: 5,
      description: 'Habilitar envío de correos electrónicos.',
      image: 'envelope',
      pdf_path: 'https://morth.nic.in/sites/default/files/dd12-13_0.pdf',
    },
    {
      id: knex.raw('UUID()'),
      provider_id: tigoId.id,
      name: 'Contacto por Whatsapp',
      points: 5,
      description: 'Habilitar contacto por Whatsapp.',
      image: 'whatsapp',
      pdf_path: 'https://morth.nic.in/sites/default/files/dd12-13_0.pdf',
    },
    {
      id: knex.raw('UUID()'),
      provider_id: tigoId.id,
      name: 'Consulta de información financiera',
      points: 10,
      description: 'Habilitar consulta de información financiera.',
      image: 'finance',
      pdf_path: 'https://morth.nic.in/sites/default/files/dd12-13_0.pdf',
    },

    // Bancolombia permissions
    {
      id: knex.raw('UUID()'),
      provider_id: bancolombiaId.id,
      name: 'Consulta de Datos personales',
      points: 5,
      description: 'Habilitar consulta de datos personales.',
      image: 'user',
      pdf_path: 'https://morth.nic.in/sites/default/files/dd12-13_0.pdf',
    },
    {
      id: knex.raw('UUID()'),
      provider_id: bancolombiaId.id,
      name: 'Envío de SMS',
      points: 5,
      description: 'Habilitar envío de SMS.',
      image: 'comment',
      pdf_path: 'https://morth.nic.in/sites/default/files/dd12-13_0.pdf',
    },
    {
      id: knex.raw('UUID()'),
      provider_id: bancolombiaId.id,
      name: 'Envío de Emails',
      points: 5,
      description: 'Habilitar envío de correos electrónicos.',
      image: 'envelope',
      pdf_path: 'https://morth.nic.in/sites/default/files/dd12-13_0.pdf',
    },
    {
      id: knex.raw('UUID()'),
      provider_id: bancolombiaId.id,
      name: 'Consulta de información financiera',
      points: 10,
      description: 'Habilitar consulta de información financiera.',
      image: 'finance',
      pdf_path: 'https://morth.nic.in/sites/default/files/dd12-13_0.pdf',
    },

    // Davivienda permissions
    {
      id: knex.raw('UUID()'),
      provider_id: daviviendaId.id,
      name: 'Consulta de Datos personales',
      points: 5,
      description: 'Habilitar consulta de datos personales.',
      image: 'user',
      pdf_path: 'https://morth.nic.in/sites/default/files/dd12-13_0.pdf',
    },
    {
      id: knex.raw('UUID()'),
      provider_id: daviviendaId.id,
      name: 'Envío de SMS',
      points: 5,
      description: 'Habilitar envío de SMS.',
      image: 'comment',
      pdf_path: 'https://morth.nic.in/sites/default/files/dd12-13_0.pdf',
    },
    {
      id: knex.raw('UUID()'),
      provider_id: daviviendaId.id,
      name: 'Envío de Emails',
      points: 5,
      description: 'Habilitar envío de correos electrónicos.',
      image: 'envelope',
      pdf_path: 'https://morth.nic.in/sites/default/files/dd12-13_0.pdf',
    },
    {
      id: knex.raw('UUID()'),
      provider_id: daviviendaId.id,
      name: 'Consulta de información financiera',
      points: 10,
      description: 'Habilitar consulta de información financiera.',
      image: 'finance',
      pdf_path: 'https://morth.nic.in/sites/default/files/dd12-13_0.pdf',
    },
  ]);
}
