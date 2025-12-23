FROM node:24-alpine

# Required for Prisma on Alpine
RUN apk add --no-cache openssl libc6-compat

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

# Prisma MUST be generated inside container
RUN npx prisma generate


EXPOSE 3000
CMD ["node", "server.ts"]
