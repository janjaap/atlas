FROM cypress/base:10
RUN apt-get update && \
    apt-get install -y \
      netcat && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /home

COPY package.json package-lock.json  /home/

# Install selected package (faster).
# Use versions defined in package-lock.json.
# `npm install` with `CI=true` is to stop cypress install progress from flooding the CI log
RUN CI=true npm ci

COPY . /home/
