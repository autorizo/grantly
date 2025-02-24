import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.raw(`
    CREATE TRIGGER update_user_points
    AFTER INSERT ON points_transactions
    FOR EACH ROW
    BEGIN
      IF NEW.type = 'earned' THEN
        UPDATE users 
        SET total_points = total_points + NEW.points
        WHERE id = NEW.user_id;
      ELSEIF NEW.type = 'redeemed' THEN
        UPDATE users 
        SET total_points = total_points - NEW.points
        WHERE id = NEW.user_id;
      END IF;
    END;
  `);
}

export async function down(knex: Knex): Promise<void> {
  await knex.raw(`DROP TRIGGER IF EXISTS update_user_points;`);
}
