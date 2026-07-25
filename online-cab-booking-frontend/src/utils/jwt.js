export function decodeJwt(token) {
  try {
    const payload = token.split(".")[1];
    const json = atob(payload.replace(/-/g, "+").replace(/_/g, "/"));
    return JSON.parse(decodeURIComponent(escape(json)));
  } catch {
    return null;
  }
}

export function isExpired(token) {
  const p = decodeJwt(token);
  if (!p?.exp) return false;
  return Date.now() >= p.exp * 1000;
}