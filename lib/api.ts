export function privateJson(data: unknown, status = 200) {
  return Response.json(data, {status, headers:{'Cache-Control':'private, no-store'}});
}
export function sameOrigin(request: Request) {
  const origin = request.headers.get('origin');
  return !origin || origin === new URL(request.url).origin;
}
