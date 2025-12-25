
FROM node:24-alpine

RUN apk add --no-cache openssl libc6-compat

WORKDIR /app

ENV NODE_ENV=production

ENV DATABASE_URL="postgres://dummy:dummy@localhost:5432/dummy"
ENV SHADOW_DATABASE_URL="postgres://dummy:dummy@localhost:5432/shadow"

COPY package*.json ./
RUN npm ci

COPY . .

RUN npx prisma generate

ARG NEXT_PUBLIC_APP_URL
ENV NEXT_PUBLIC_APP_URL=$NEXT_PUBLIC_APP_URL

RUN npm run build

EXPOSE 3000

CMD ["node", "--experimental-strip-types", "server.ts"]