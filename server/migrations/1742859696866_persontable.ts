import { sql, type Kysely } from 'kysely'

// `any` is required here since migrations should be frozen in time. alternatively, keep a "snapshot" db interface.
export async function up(db: Kysely<any>): Promise<void> {
    await db.schema
      .createTable('person')
      .addColumn('id', 'integer', (col) => col.primaryKey())
      .addColumn('first_name', 'text', (col) => col.notNull())
      .addColumn('last_name', 'text')
      .addColumn('gender', 'text', (col) => col.notNull())
      .addColumn('interest', 'text', (col) => col.notNull())
      .addColumn('created_at', 'text', (col) =>
        col.defaultTo(sql`CURRENT_TIMESTAMP`).notNull(),
      )
      .addColumn('greeting', 'text')
      .execute()
}

// `any` is required here since migrations should be frozen in time. alternatively, keep a "snapshot" db interface.
export async function down(db: Kysely<any>): Promise<void> {
    await db.schema.dropTable('person').execute()
}