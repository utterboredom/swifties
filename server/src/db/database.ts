import { Database } from './types'
import SQLite from 'better-sqlite3'
import { Kysely, SqliteDialect } from 'kysely'

export const dialect = new SqliteDialect({
  database: new SQLite('database.db'),
})

export const db = new Kysely<Database>({
  dialect,
})