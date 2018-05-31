# Build
FROM node:8.9 AS build-deps
MAINTAINER datapunt.ois@amsterdam.nl

WORKDIR /app

RUN apt-get update && \
    apt-get install -y \
      netcat \
      git && \
    rm -rf /var/lib/apt/lists/*

COPY package.json package-lock.json /app/

# Install all NPM dependencies. Also:
#  * Changing git URL because network is blocking git protocol...
#  * Using `CYPRESS_SKIP_BINARY_INSTALL` to skip installing Cypress for it is not used here
RUN git config --global url."https://".insteadOf git:// && \
    git config --global url."https://github.com/".insteadOf git@github.com: && \
    CYPRESS_SKIP_BINARY_INSTALL=1 \
    npm --production=false \
        --unsafe-perm \
        --verbose \
        install && \
    npm cache clean --force

# Build dependencies
COPY src /app/src
COPY modules /app/modules
COPY grunt /app/grunt
COPY public /app/public
COPY scripts /app/scripts
COPY .babelrc \
      403-geen-toegang.html \
      Gruntfile.js \
      index.html \
      webpack.* \
      index.ejs \
      favicon.png \
      /app/

ENV NODE_ENV=production
ARG BUILD_ENV=prod
RUN npm run build-${BUILD_ENV}
RUN echo "build= `date`" > /app/dist/version.txt

# Test dependencies
COPY karma.conf.js \
      jest.config.js \
      /app/
COPY .storybook /app/.storybook
COPY test /app/test


# Web server image
FROM nginx:1.12.2-alpine
COPY --from=build-deps /app/dist /usr/share/nginx/html
