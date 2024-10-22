# Start from the Node.js image
FROM node:20-alpine

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy TypeScript config and source files
COPY tsconfig*.json ./
COPY . .

# Ensure TypeScript compiler and Knex are executable
RUN chmod +x ./node_modules/.bin/tsc
RUN chmod +x ./node_modules/.bin/knex

# Build the TypeScript code
RUN npm run build

# Expose the port the app runs on
EXPOSE 3000

# Set environment to production
ENV NODE_ENV=production

# Run migrations and seeds, then start the app
CMD ./node_modules/.bin/knex migrate:latest --env production && \
    ./node_modules/.bin/knex seed:run --env production && \
    node dist/index.js

