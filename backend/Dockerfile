FROM node:20-alpine

WORKDIR /app

# The node_modules and code will be mounted as volumes during development
# In production, we would copy package.json, install, and copy source code.
# Since this is optimized for the local docker-compose setup requested:
COPY package*.json ./
RUN npm install

# We rely on the mounted volume for source files and command `npm run dev`
# EXPOSE 5000 is for documentation, docker-compose actually maps it.
EXPOSE 5000

CMD ["npm", "run", "dev"]
