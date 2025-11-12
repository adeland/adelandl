# Stage 1: Build the React application
FROM node:20-alpine AS builder

WORKDIR /app

# Accept build arguments (no values here!)
ARG REACT_APP_EMAILJS_SERVICE_ID
ARG REACT_APP_EMAILJS_TEMPLATE_ID
ARG REACT_APP_EMAILJS_PUBLIC_KEY

# Convert to ENV for build
ENV REACT_APP_EMAILJS_SERVICE_ID=$REACT_APP_EMAILJS_SERVICE_ID
ENV REACT_APP_EMAILJS_TEMPLATE_ID=$REACT_APP_EMAILJS_TEMPLATE_ID
ENV REACT_APP_EMAILJS_PUBLIC_KEY=$REACT_APP_EMAILJS_PUBLIC_KEY

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Build the application
# Note: Environment variables should be passed at build time if needed
# For EmailJS, you can pass them via --build-arg or use .env file
RUN npm run build

# Stage 2: Serve the application with nginx
FROM nginx:alpine

# Copy custom nginx config (for SPA routing)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy built files from builder stage
COPY --from=builder /app/build /usr/share/nginx/html

# Expose port 80
EXPOSE 3000

# Start nginx
CMD ["nginx", "-g", "daemon off;"]

