# Base stage
FROM node:20.11-alpine AS builder

WORKDIR /app

COPY . .

RUN yarn install
RUN yarn build

FROM node:20.11-alpine AS dependencies

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install --production

FROM node:20.11-alpine AS runner

USER node

WORKDIR /app

ENV NODE_ENV=production

COPY --from=builder --chown=node:node /app/dist ./dist
COPY --from=dependencies --chown=node:node /app/node_modules ./node_modules

CMD ["node", "dist/main"]
