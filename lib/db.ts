"use server";
import { neon } from "@neondatabase/serverless";
// import { drizzle } from "drizzle-orm/neon-http";

export async function getDBConnection() {
    if (!process.env.DATABASE_URL) {
        throw new Error("DATABASE_URL is not set");
      }
  const sql = neon(process.env.DATABASE_URL);
  // const db = drizzle(sql)
  return sql;
}

