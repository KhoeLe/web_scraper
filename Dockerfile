# Use an official Node.js runtime as a parent image
FROM node:18-alpine AS runner

# Set the working directory to /app
WORKDIR /app

# Copy package.json and package-lock.json to /app
COPY package*.json /app

# Install dependencies
RUN yarn

# Copy the rest of the application code to /app
COPY . /app

# Build the Next.js app for production
RUN npm run build

# Expose port 3000 for the Next.js app to listen on
EXPOSE 3000

# Start the Next.js app
CMD ["yarn", "dev"]
