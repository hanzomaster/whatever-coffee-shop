FROM oven/bun:1 AS base
WORKDIR /app

# Install dependencies
FROM base AS deps
COPY api/package.json api/bun.lockb* ./
RUN bun install --frozen-lockfile

# Build the application
FROM base AS build
COPY --from=deps /app/node_modules ./node_modules
COPY api/ .
RUN bunx prisma generate
RUN bun run build

# Production image
FROM base AS production
ENV NODE_ENV=production

COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/prisma ./prisma

EXPOSE 3333
CMD ["bun", "run", "dist/main.js"]
