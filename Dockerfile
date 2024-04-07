FROM node:18.13.0 as builder
WORKDIR /app

RUN yarn global add @nestjs/cli
COPY package.json yarn.lock ./

RUN yarn install
COPY . .

RUN nest build mqttSender
RUN nest build mqttListener

FROM node:16.17.0 as executor
WORKDIR /app
COPY --from=builder /app .
