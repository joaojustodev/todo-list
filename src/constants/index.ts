export const SESSION_TOKEN_COOKIE =
  process.env.NODE_ENV !== "development"
    ? "__Secure-next-auth.session-token"
    : "next-auth.session-token";
