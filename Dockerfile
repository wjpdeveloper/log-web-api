FROM node:slim as builder

WORKDIR /app

ADD ./package.json ./
RUN npm install --production
ADD ./app.js ./

FROM alpine:3.12
RUN apk add --update nodejs
COPY --from=builder /app /

EXPOSE 9998
ENTRYPOINT [ "node", "./app.js" ]
