FROM node:22-alpine AS builder
WORKDIR /usr/src/app

COPY package*.json ./
RUN npm ci --only=production

FROM node:22-alpine AS runner
WORKDIR /usr/src/app

ENV NODE_ENV=production
ENV PORT=3000

COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY package*.json ./
COPY src ./src

USER node

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:3000/health || exit 1

CMD ["node", "src/app.js"]