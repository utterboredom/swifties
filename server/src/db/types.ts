import {
    ColumnType,
    Generated,
    Insertable,
    Selectable,
    Updateable,
  } from 'kysely'
  
  export interface Database {
    person: PersonTable
  }
  
  export interface PersonTable {
    id: Generated<number>
    first_name: string | null
    gender: 'man' | 'woman' | 'other'
    last_name: string | null
    created_at: ColumnType<Date, string | undefined, never>
    greeting?: string,
    interest: 'men' | 'women' | 'other' 
  }
  export type Person = Selectable<PersonTable>
  export type NewPerson = Insertable<PersonTable>
  export type PersonUpdate = Updateable<PersonTable>