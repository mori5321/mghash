import { PostgrestError } from "@supabase/supabase-js";
import { supabase } from "../../../_lib/common/supabase/client";

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

export async function GET(
  _: Request,
  { params }: { params: { slug: string } },
): Promise<Response> {
  const id = params.slug;
  const { data, error } = await supabase.from('todos').select('id, title').eq('id', id);

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


export async function PATCH(
  req: Request,
  { params }: { params: { slug: string } }
): Promise<Response> {
  const id = params.slug;
  const { title } = await req.json();
  const { data, error } = await supabase.from('todos').update({ title }).eq('id', id).select('id, title');

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


export async function DELETE(
  _: Request,
  { params }: { params: { slug: string } }
): Promise<Response> {
  const id = params.slug;
  const { error } = await supabase.from('todos').delete().eq('id', id);

  if (error) {
    return errorResponse(error);
  }

  const json = JSON.stringify({
    data: null,
    error: null,
  });
  return new Response(json, {
    status: 200,
    ...defaultResponseOptions
  });
}
