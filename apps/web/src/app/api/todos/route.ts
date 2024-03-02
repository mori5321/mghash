import { PostgrestError } from "@supabase/supabase-js";
import { supabase } from "../../../server/common/supabase/client";


const defaultResponseOptions = {
  headers: {
    'content-type': 'application/json'
  }
};

const errorResponse = (err: PostgrestError): Response => {
  const json = JSON.stringify({
    data: null,
    error: err.message
  });
  return new Response(json, {
    status: 500,
    ...defaultResponseOptions
  });
}

// Next 側は anonKey で書いた方が楽そうだなぁ
export async function GET(_req: Request): Promise<Response> {
  const { data, error } = await supabase.from('todos').select('id, title');

  if (error) {
    return errorResponse(error);
  }
  
  const json = JSON.stringify({
    data: data,
    error: null,
  });
  return new Response(json, {
    status: 200,
    ...defaultResponseOptions
  });
}

export async function POST(req: Request): Promise<Response> {
  const { title } = await req.json();
  const { data, error } = await supabase.from('todos').insert({ title }).select('id, title');
  
  if (error) {
    return errorResponse(error);
  }
  
  const json = JSON.stringify({
    data: data,
    error: null,
  });
  return new Response(json, {
    status: 201,
    ...defaultResponseOptions
  });
}


