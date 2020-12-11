FROM node:12-alpine as dist
WORKDIR /tmp/

COPY package.json ./package.json
COPY yarn.lock ./yarn.lock

RUN yarn
COPY lerna.json ./lerna.json

FROM dist as backend
WORKDIR /tmp/
COPY backend/package.json ./backend/package.json
COPY backend/yarn.lock ./backend/yarn.lock
RUN yarn bootstrap
COPY ./backend ./backend
RUN yarn build

FROM dist as frontend
WORKDIR /tmp/
COPY frontend/package.json ./frontend/package.json
COPY frontend/yarn.lock ./frontend/yarn.lock
RUN yarn bootstrap
COPY ./frontend ./frontend
RUN yarn build

FROM node:12-alpine as release
RUN npm install -g pm2
ENV TZ=UTC

WORKDIR /app
COPY --from=backend /tmp/backend/node_modules ./backend/node_modules
COPY --from=backend /tmp/backend/dist ./backend/dist
COPY --from=frontend /tmp/frontend/node_modules ./frontend/node_modules
COPY --from=frontend /tmp/frontend/dist ./frontend/dist
COPY --from=frontend /tmp/frontend/.next ./frontend/.next
COPY --from=frontend /tmp/frontend/public ./frontend/public
COPY process.json ./process.json

EXPOSE 4040
WORKDIR /app
ENV NODE_ENV=production
CMD ["pm2-runtime", "process.json"]
