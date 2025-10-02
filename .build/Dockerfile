FROM node:trixie-slim

RUN mkdir -p /opt/cannedfindit/{src,dist}
COPY ./src /opt/cannedfindit/src
COPY ./*.js* /opt/cannedfindit

WORKDIR /opt/cannedfindit

RUN npm install
RUN npm run prod:bundler

EXPOSE 4242

ENTRYPOINT ["/usr/local/bin/npm", "run", "prod:server"]
