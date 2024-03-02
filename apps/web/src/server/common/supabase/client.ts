import { createClient } from '@supabase/supabase-js'
import { Database } from './database.types'

const SUPABASE_URL = process.env.SUPABASE_URL ?? '';
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY ?? '';

const schema = 'app' as const;

type SchemaName = keyof Pick<Database, typeof schema>;
type TableName = Database[SchemaName];

export type SupabaseAppSchemaClient = ReturnType<typeof initSupabaseClient>;

const initSupabaseClient = () => {
  console.log('SUPABASE_URL', SUPABASE_URL);
  console.log('SUPABASE_SERVICE_ROLE_KEY', SUPABASE_SERVICE_ROLE_KEY);

  const client = createClient<Database, SchemaName, TableName>(
    SUPABASE_URL,
    SUPABASE_SERVICE_ROLE_KEY,
    {
      db: {
        schema,
      },
    }
  )

  return client;
}

export const supabase = initSupabaseClient();
