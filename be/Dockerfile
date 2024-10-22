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

# Ensure TypeScript compiler is executable
RUN chmod +x ./node_modules/.bin/tsc

# Build the TypeScript code
RUN npm run build

# Expose the port the app runs on
EXPOSE 3000

# Set environment to production
ENV NODE_ENV=production

# Run migrations and seeds, then start the app
CMD npx knex migrate:latest --env production && \
    npx knex seed:run --env production && \
    npm start
