FROM node:20-slim
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 8080
# Node requires tracing to be initialized before the main app
CMD ["node", "--require", "./tracing.js", "server.js"]
