export const jwtConstants = {
  secret: process.env.JWT_SECRET ?? "fallback-secret-change-in-production",
  secretExpiration: "1d",
} as const;
