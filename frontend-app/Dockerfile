FROM node:18-alpine

WORKDIR /frontend-app

# Installing dependencies
COPY package*.json ./
RUN npm install --force

# Copying source files
COPY . .

# Expose the app port
EXPOSE 3000

# Start the Next.js app in development mode
CMD ["npm", "run", "dev"]