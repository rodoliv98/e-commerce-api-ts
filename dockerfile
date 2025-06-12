# builder stage
FROM node:20 as builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# add deps
FROM node:20 as deps
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production && npm cache clean --force

# run time image
FROM node:20-alpine as runtime
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nodeapp -u 1001
WORKDIR /app
RUN chown nodeapp:nodejs /app
COPY --from=builder /app/dist ./dist
COPY --from=deps /app/node_modules ./node_modules
USER nodeapp
EXPOSE 3000
CMD [ "node", "dist/index.js" ]