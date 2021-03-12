## Stage 1. Compile TS sources to JS
FROM node:14.0.0 as builder

# set working directory
WORKDIR /

COPY package.json yarn.lock ./

# Install dev dependencies
RUN yarn install


COPY . .

EXPOSE 8000

CMD ["npm", "run", "start"]
