import { defineConfig } from 'kysely-ctl'
import {dialect} from "../src/db/database"

export default defineConfig({
	dialect: dialect,
})
