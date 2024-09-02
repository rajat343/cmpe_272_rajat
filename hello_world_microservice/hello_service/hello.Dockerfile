FROM node:22

# Set the working directory
WORKDIR /app

# Copy the package.json and install dependencies
COPY package.json ./
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port
EXPOSE 3001

# Start the service
CMD ["node", "hello.service.js"]
