FROM node:18

# Set working directory
WORKDIR /usr/src/app

# Step 1: Copy only package files first to leverage Docker cache
COPY package*.json ./

# Step 2: Install dependencies and cache node_modules layer
RUN npm install

# Step 3: Copy the rest of your application
COPY . .

# Step 4: Generate Prisma client (safe to cache)
RUN npx prisma generate

# Expose port
EXPOSE 3001

# Default command (no Prisma setup here; handled by docker-compose)
CMD ["npm", "run", "dev"]
