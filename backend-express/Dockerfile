# Stage 1: Build
FROM node:18-alpine as builder
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --omit=dev
COPY . .
RUN npm run build

# Stage 2: Production
FROM node:18-alpine
WORKDIR /app
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json ./

ENV NODE_ENV=production
EXPOSE 3000
USER node  # Non-root user
CMD ["node", "dist/index.js"]