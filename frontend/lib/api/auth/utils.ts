const ACCESS_COOKIE = "accessKey";

type JwtPayload = {
  exp?: number;
  roles?: string[];
  schoolId?: number;
  sub?: string;
};

export const redirectToLogin = () => {
  if (typeof window === "undefined") {
    return;
  }
  if (window.location.pathname !== "/login") {
    window.location.href = "/login";
  }
};

export const getCookieValue = (name: string) => {
  if (typeof document === "undefined") {
    return null;
  }
  const match = document.cookie.match(
    new RegExp(
      `(?:^|; )${name.replace(/[-\.$?*|{}\(\)\[\]\\/\+^]/g, "\\$&")}=([^;]*)`
    )
  );
  return match ? decodeURIComponent(match[1]) : null;
};

export const getAccessToken = () => getCookieValue(ACCESS_COOKIE);

export const decodeJwtPayload = (token: string) => {
  const parts = token.split(".");
  if (parts.length !== 3) {
    return null;
  }
  const base64 = parts[1].replace(/-/g, "+").replace(/_/g, "/");
  const padded = base64.padEnd(base64.length + ((4 - (base64.length % 4)) % 4), "=");
  try {
    const json = atob(padded);
    return JSON.parse(json) as JwtPayload;
  } catch {
    return null;
  }
};

export const isTokenExpired = (token: string) => {
  const payload = decodeJwtPayload(token);
  if (!payload?.exp) {
    return false;
  }
  return Date.now() >= payload.exp * 1000;
};
