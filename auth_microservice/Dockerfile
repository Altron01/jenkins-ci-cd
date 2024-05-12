FROM node:20.13.1-bullseye-slim AS builder
COPY package.json .
RUN npm install

FROM node:20.13.1-bullseye-slim AS runner
WORKDIR app/
COPY [ "package*.json", "src", "./" ]
COPY --from=builder [ "package*.json", "node_modules", "./" ]
CMD ["npm", "start"]