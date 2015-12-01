FROM node:4.2.1
RUN apt-get update -qq && apt-get install -y build-essential libpq-dev

# Set workdir
WORKDIR /ibeer
ADD . /ibeer

# Install node dependencies
RUN npm install