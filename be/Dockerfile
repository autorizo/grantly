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

# Copy the entrypoint script and make it executable
COPY entrypoint.sh ./entrypoint.sh
RUN chmod +x ./entrypoint.sh

# Expose the port the app runs on
EXPOSE 3000

# Set environment to production
ENV NODE_ENV=production

# Start the app using the compiled JS, not TypeScript
CMD ["node", "dist/index.js"]
