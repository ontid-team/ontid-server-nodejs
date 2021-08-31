FROM node:14-alpine3.12

# Create directory
RUN mkdir -p /app
WORKDIR /app

# Install app dependencies
COPY package*.json ./ \
  tsconfig.build.json ./ \
  tsconfig.json ./

RUN npm ci
RUN npm run build

# Bundle app source
COPY . /app

EXPOSE 5757
CMD ["npm", "run", "start:prod"]
