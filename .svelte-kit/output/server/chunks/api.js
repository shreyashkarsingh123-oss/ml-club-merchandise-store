function json(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" }
  });
}
function ok(data, status = 200) {
  return json({ ok: true, data }, status);
}
function fail(code, message, status, details) {
  return json({ ok: false, error: { code, message, details } }, status);
}
function handleApiError(err) {
  const message = err instanceof Error ? err.message : "Internal server error";
  console.error("[API Error]", message);
  return fail("INTERNAL_ERROR", message, 500);
}
function validateEmail(email) {
  return /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email);
}
function validateRequired(obj, fields) {
  for (const f of fields) {
    const v = obj[f];
    if (v === void 0 || v === null || typeof v === "string" && v.trim() === "") {
      return `Missing required field: ${f}`;
    }
  }
  return null;
}
export {
  validateEmail as a,
  fail as f,
  handleApiError as h,
  ok as o,
  validateRequired as v
};
