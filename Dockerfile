# builder
FROM node:lts-alpine AS frontend

RUN npm i -g pnpm

WORKDIR /web

COPY web/package.json .
COPY web/pnpm-lock.yaml .

RUN pnpm i
COPY web/ .
RUN sed -i "/VITE_API_URL/d" .env.production && \
    pnpm build

FROM node:lts-alpine

RUN npm i -g pnpm

WORKDIR /app

COPY backend/package.json .
COPY backend/pnpm-lock.yaml .

RUN pnpm i
COPY backend/ .
RUN pnpm run build 

COPY --from=frontend /web/dist /app/public

EXPOSE 3000

CMD ["pnpm", "run", "serve"]