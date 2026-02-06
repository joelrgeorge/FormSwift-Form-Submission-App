# 1. Base image (Node runtime)
FROM node:18-alpine

# 2. Set working directory inside container
WORKDIR /app

# 3. Copy package files first (for caching)
COPY package*.json ./

# 4. Install dependencies
RUN npm install

# 5. Copy rest of the app
COPY . .

# 6. Expose the port your app uses
EXPOSE 5000

# 7. Start the server
CMD ["node", "server.js"]