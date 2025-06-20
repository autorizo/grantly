# Step 1: Build the React app
FROM node:20-alpine AS build

# Set the working directory inside the container
WORKDIR /app

# Accept build arguments for environment variables
ARG REACT_APP_BE_URL


# Set the environment variables in the build context
ENV REACT_APP_BE_URL=$REACT_APP_BE_URL

# Copy package.json and package-lock.json to install dependencies
COPY package.json package-lock.json ./ 

# Install dependencies
RUN npm install 

# Copy the rest of the application code
COPY . . 

# Build the React app
RUN npm run build 

# Step 2: Serve the React app using Nginx
FROM nginx:alpine 

# Copy custom Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf 

# Copy the built files from the build step
COPY --from=build /app/build /usr/share/nginx/html 

# Expose port 8080 instead of 80
EXPOSE 8080 

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
