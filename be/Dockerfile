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

# Start the app
CMD ["npm", "start"]

# Ensure environment variables are passed to Docker
ENV NODE_ENV production
