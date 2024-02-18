export async function GET(_req: Request): Promise<Response> {
  const body = { message: 'Hello World!' };
  const json = JSON.stringify(body);

  return new Response(json, { status: 200 });
}
