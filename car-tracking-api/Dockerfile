FROM node:14.17.5-alpine3.11 as builder

WORKDIR /app

COPY package*.json ./

RUN npm install

RUN npm ci

COPY . .

RUN npm run build 

FROM node:14.17.5-alpine3.11 as runner

WORKDIR /app

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json ./

RUN npm install --production --no-audit

RUN addgroup -g 1001 -S nodejs \
    && adduser -S nodejs -u 1001

RUN mkdir logs \
    && chown -R nodejs:nodejs /app/logs

USER nodejs

EXPOSE 7000

CMD ["npm", "run", "start:prod"]