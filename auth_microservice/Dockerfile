FROM node:20.13.1-bullseye-slim AS builder
COPY package.json .
RUN npm install

FROM node:20.13.1-bullseye-slim AS runner
WORKDIR app/
COPY . .
COPY --from=builder node_modules .
CMD ["npm", "start"]