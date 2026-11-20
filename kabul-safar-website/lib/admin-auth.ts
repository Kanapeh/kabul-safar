import { createHmac, timingSafeEqual } from "crypto";

/**
 * Minimal admin session for the blog dashboard.
 *
 * Credentials come from env vars (set them in production!):
 *   ADMIN_USERNAME, ADMIN_PASSWORD, ADMIN_SESSION_SECRET
 * Defaults are admin / admin so the client can log in out of the box.
 */
export const ADMIN_COOKIE = "ks_admin_session";
const SESSION_TTL_SECONDS = 60 * 60 * 24 * 7; // 7 days

const getSecret = () =>
  process.env.ADMIN_SESSION_SECRET || "kabul-safar-admin-dev-secret-change-me";

export const getAdminCredentials = () => ({
  username: process.env.ADMIN_USERNAME || "admin",
  password: process.env.ADMIN_PASSWORD || "admin",
});

const sign = (value: string) =>
  createHmac("sha256", getSecret()).update(value).digest("hex");

const safeEqual = (a: string, b: string) => {
  const ab = Buffer.from(a);
  const bb = Buffer.from(b);
  return ab.length === bb.length && timingSafeEqual(ab, bb);
};

export function checkCredentials(username: string, password: string) {
  const creds = getAdminCredentials();
  // evaluate both to avoid leaking which one failed via timing
  const userOk = safeEqual(username.trim(), creds.username);
  const passOk = safeEqual(password, creds.password);
  return userOk && passOk;
}

export function createSessionToken() {
  const expires = Math.floor(Date.now() / 1000) + SESSION_TTL_SECONDS;
  const payload = String(expires);
  return { token: `${payload}.${sign(payload)}`, maxAge: SESSION_TTL_SECONDS };
}

export function verifySessionToken(token: string | undefined | null) {
  if (!token) return false;
  const [payload, signature] = token.split(".");
  if (!payload || !signature) return false;
  if (!safeEqual(signature, sign(payload))) return false;
  const expires = Number(payload);
  return Number.isFinite(expires) && expires > Date.now() / 1000;
}
