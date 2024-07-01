# Use a Node.js base image
FROM node:20-alpine
 
# Set the working directory in the container
WORKDIR /app

# Install curl for .env download
RUN apk add --update curl

ARG AZURE_ENV_URL
RUN curl -o /app/.env $AZURE_ENV_URL 
 
# Copy the rest of the application code
COPY . .
 
# Install dependencies using npm ci
RUN npm install
RUN npm run build


# Expose the port on which your app runs
EXPOSE 3000
 
# Command to run the application
CMD ["npm","start"]
