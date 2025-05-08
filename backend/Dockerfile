FROM node:18-alpine

# Install PostgreSQL client for health check and wait-for script
RUN apk add --no-cache postgresql-client curl

WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Make wait-for-postgres.sh executable
RUN chmod +x wait-for-postgres.sh

# Expose the port the app runs on
EXPOSE 5000

# Wait for PostgreSQL then start the app
CMD ["sh", "-c", "./wait-for-postgres.sh postgres && npm run dev"]