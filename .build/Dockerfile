FROM node:trixie-slim

RUN apt update
RUN apt install curl -y

RUN mkdir -p /opt/cannedfindit
COPY ./src /opt/cannedfindit/src
COPY ./*.js* /opt/cannedfindit

WORKDIR /opt/cannedfindit

RUN npm install
RUN npm run prod:bundler

HEALTHCHECK --interval=35s --timeout=4s CMD curl -f http://localhost:4242 || exit 1

EXPOSE 4242

ENTRYPOINT ["/usr/local/bin/npm", "run", "prod:server"]
