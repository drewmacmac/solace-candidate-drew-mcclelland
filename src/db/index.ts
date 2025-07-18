import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

const setup = () => {
  if (!process.env.DATABASE_URL) {
    console.error("DATABASE_URL is not set");
    throw new Error("DATABASE_URL is not set");
  }

  // for query purposes
  // TODO instantiate DB client on backend init
  // Share connections between requests
  const queryClient = postgres(process.env.DATABASE_URL);
  const db = drizzle(queryClient);
  return db;
};

export default setup();
