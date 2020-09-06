FROM node:14 AS development
WORKDIR /usr/src/app
COPY ./package.json ./
RUN yarn install
COPY . .
RUN yarn build


FROM node:14-alpine
WORKDIR /usr/src/app
COPY --from=builder /usr/src/app ./
EXPOSE 3000
CMD ["yarn", "start:prod"]