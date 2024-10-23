# Start from a regular Node.js image (non-Alpine)
FROM node:20

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Ensure TypeScript compiler and Knex are executable
RUN chmod +x ./node_modules/.bin/tsc
RUN chmod +x ./node_modules/.bin/knex

# Build the TypeScript code using npx
RUN npx tsc -p tsconfig.build.json

# Copy the entrypoint script and make it executable
COPY entrypoint.sh ./entrypoint.sh
RUN chmod +x ./entrypoint.sh

# Expose the port the app runs on
EXPOSE 3000

# Set environment to production
ENV NODE_ENV=production

# Use the entrypoint script
ENTRYPOINT ["./entrypoint.sh"]
