import { createClient } from '@supabase/supabase-js'
import { createServerClient } from '@supabase/ssr'
import { Database } from './database.types'
import { cookies } from 'next/headers';

const SUPABASE_URL = process.env.SUPABASE_URL ?? '';
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY ?? '';

const schema = 'public' as const;

type SchemaName = keyof Pick<Database, typeof schema>;
type TableName = Database[SchemaName];

export type SupabaseAppSchemaClient = ReturnType<typeof initSupabaseClient>;

const initSupabaseClient = () => {
  const client = createClient<Database, SchemaName, TableName>(
    SUPABASE_URL,
    SUPABASE_SERVICE_ROLE_KEY, // TODO: anon key にしたい
    {
      db: {
        schema,
      },
    }
  )

  return client;
}


const initSupabaseSSRClient = () => {
  const cookieStore = cookies(); // Closure内の定数で管理してるけど、使い方あってる?
  
  const client = createServerClient<Database, SchemaName, TableName>(
    SUPABASE_URL,
    SUPABASE_SERVICE_ROLE_KEY, // TODO: anon key にしたい
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
      }
    }
  )

  return client
}

export const supabase = initSupabaseClient();
export const supabaseSSR = initSupabaseSSRClient();
