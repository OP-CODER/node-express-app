# Use official Node.js LTS image as base
FROM node:18

# Create app directory inside container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json (if any) and install dependencies including devDependencies
COPY package*.json ./

# Install all dependencies, including devDependencies (adding --legacy-peer-deps to avoid peer dependency errors)
RUN npm install --legacy-peer-deps

# Copy the rest of the app source code
COPY . .

# Expose the port the app listens on
EXPOSE 3000

# Command to run the app
CMD ["npm", "start"]
