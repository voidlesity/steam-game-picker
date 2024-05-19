# Stage 1: Build the application
FROM node:20-alpine

# Set the working directory
WORKDIR /app

# Set environment variables
ENV NUXT_HOST=0.0.0.0
ENV NUXT_PORT=3000

# Copy package.json and package-lock.json files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application code and build the application
COPY . .
RUN npm run build && npm cache clean --force

# Remove everything except the .output directory
RUN find . -mindepth 1 -maxdepth 1 ! -name '.output' -exec rm -rf {} +

# Expose the port the app runs on
EXPOSE 3000

# Command to run the application
CMD [ "node", ".output/server/index.mjs" ]
