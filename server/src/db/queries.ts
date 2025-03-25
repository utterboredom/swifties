import { db } from './database'
import { PersonUpdate, Person, NewPerson } from './types'

export async function createPerson(person: NewPerson) {
    return await db.insertInto('person')
      .values(person)
      .returningAll()
      .executeTakeFirstOrThrow()
}

export async function updatePerson(id: number, updateWith: PersonUpdate) {
    await db.updateTable('person').set(updateWith).where('id', '=', id).execute()
}

export async function getRandomProfile() {
    const profiles = await await db.selectFrom('person').selectAll().execute();
    var profile = profiles[Math.floor(Math.random()*profiles.length)];
    return profile;
}

