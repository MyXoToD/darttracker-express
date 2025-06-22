# Stage 1: Build the Angular app
FROM node:20 AS builder

WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the app and build it
COPY . .
RUN npm run build --prod

# Stage 2: Serve the app using Nginx
FROM nginx:alpine
WORKDIR /usr/share/nginx/html

# Remove default nginx page
RUN rm -rf ./*

# Copy the Angular build output to Nginx's web root
COPY --from=builder /app/dist/darttracker/browser ./

# Copy custom nginx configuration (optional)
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
