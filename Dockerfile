FROM node:20-alpine

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install --omit=dev

# Copy app
COPY . .

# Expose port
EXPOSE 8080

# Run
CMD ["node", "index.js"]
