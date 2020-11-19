FROM node:14 AS development
WORKDIR /usr/src/app
COPY ./package.json ./
COPY ./yarn.lock ./
COPY ./.env.example ./.env
RUN yarn install
COPY . .
RUN yarn start:dev
EXPOSE 3000


FROM node:14-alpine
WORKDIR /usr/src/app
COPY --from=builder /usr/src/app ./
EXPOSE 3000
CMD ["yarn", "start:prod"]
