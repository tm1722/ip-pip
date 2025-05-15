import { drizzle } from 'drizzle-orm/postgres-js';
import { pgTable, serial, varchar } from 'drizzle-orm/pg-core';
import { eq } from 'drizzle-orm';
import postgres from 'postgres';
import { genSaltSync, hashSync } from 'bcrypt-ts';


// Optionally, if not using email/pass login, you can
// use the Drizzle adapter for Auth.js / NextAuth
// https://authjs.dev/reference/adapter/drizzle
let client = postgres(`${process.env.POSTGRES_URL!}?sslmode=require`);
let db = drizzle(client);

export async function getUser(email: string) {
  const users = await ensureTableExists();
  return await db.select().from(users).where(eq(users.email, email));
}


export async function createUser({
  email,
  password,
  first_name,
  last_name,
  date_of_birth,
  place_of_occupation,
  education,
  user_type
}: {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  date_of_birth: string;
  place_of_occupation?: string | null;
  education?: string | null;
  user_type: 'User' | 'Moderator' | 'Banned User';
}) {
  const users = await ensureTableExists();
  let salt = genSaltSync(10);
  let hash = hashSync(password, salt);

  return await db.insert(users).values({
    email,
    password: hash,
    first_name,
    last_name,
    date_of_birth,
    place_of_occupation,
    education,
    user_type
  });
}



let cachedTable: any = null;

async function ensureTableExists() {
  if (cachedTable) return cachedTable;

  const existsResult = await client`
    SELECT EXISTS (
      SELECT FROM information_schema.tables 
      WHERE table_schema = 'public' 
      AND table_name = 'User'
    );
  `;

  const exists = existsResult[0]?.exists;

  if (!exists) {
    await client`
      CREATE TABLE "User" (
        id SERIAL PRIMARY KEY,
        email VARCHAR(64),
        password VARCHAR(64),
        first_name VARCHAR(64) NOT NULL,
        last_name VARCHAR(64) NOT NULL,
        date_of_birth VARCHAR(10) NOT NULL,
        place_of_occupation VARCHAR(128),
        education VARCHAR(128),
        user_type VARCHAR(32) NOT NULL DEFAULT 'User'
      );
    `;
  }

  // Always return the table schema
  cachedTable = pgTable('User', {
    id: serial('id').primaryKey(),
    email: varchar('email', { length: 64 }),
    password: varchar('password', { length: 64 }),
    first_name: varchar('first_name', { length: 64 }),
    last_name: varchar('last_name', { length: 64 }),
    date_of_birth: varchar('date_of_birth', { length: 10 }),
    place_of_occupation: varchar('place_of_occupation', { length: 128 }),
    education: varchar('education', { length: 128 }),
    user_type: varchar('user_type', { length: 32 })
  });

  return cachedTable;
}

