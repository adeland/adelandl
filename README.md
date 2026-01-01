# Simon Chen - Portfolio Website

A modern, responsive portfolio website built with React, featuring smooth animations, contact form integration, and containerized deployment with Docker.

> **Note**: This README documents a migration from GitHub Pages to a self-hosted setup. The website is now hosted locally on a home server and exposed to the internet using Cloudflare Tunnels.

## 🚀 Live Demo

Visit the live website: [https://shangmin.me](https://shangmin.me)

## 🛠️ Tech Stack

- **Frontend**: React 19.1.0, JavaScript (ES6+)
- **Styling**: CSS3 with custom animations
- **Email Service**: EmailJS for client-side email functionality
- **Smooth Scrolling**: Lenis for enhanced user experience
- **Containerization**: Docker with multi-stage builds
- **Web Server**: Nginx for production serving

## 🐳 Quick Start with Docker

### Prerequisites:
- [Docker](https://www.docker.com/get-started) (version 20.10+)
- Docker Compose V2 (included with Docker Desktop, or install separately)

### Option 1: Using Docker Compose (Recommended)

1. **Clone the Repository**
   ```bash
   git clone https://github.com/shangmin-chen/Shangmin-Chen.github.io.git
   cd Shangmin-Chen.github.io
   ```

2. **Set Environment Variables (Optional)**

   If you need EmailJS functionality, create a `.env` file:
   ```env
   REACT_APP_EMAILJS_SERVICE_ID=your_service_id_here
   REACT_APP_EMAILJS_TEMPLATE_ID=your_template_id_here
   REACT_APP_EMAILJS_PUBLIC_KEY=your_public_key_here
   ```

3. **Build and Run**
   ```bash
   docker compose up -d --build
   ```

4. **Access the Application**
   
   Open your browser and navigate to [http://localhost:3000](http://localhost:3000)

## 🏗️ Docker Architecture

The Docker setup uses a **multi-stage build** for optimal image size and performance:

### Stage 1: Builder
- Uses `node:20-alpine` as base image
- Installs dependencies with `npm ci`
- Builds the React application
- Creates optimized production bundle

### Stage 2: Production
- Uses `nginx:alpine` as base image (lightweight)
- Copies built static files from builder stage
- Configures nginx for:
  - React Router support (SPA routing)
  - Gzip compression
  - Static asset caching
  - Security headers

### Features:
- ✅ **Small Image Size**: Multi-stage build reduces final image size
- ✅ **Production Ready**: Optimized nginx configuration
- ✅ **Health Checks**: Built-in health monitoring
- ✅ **SPA Support**: Proper routing for React Router
- ✅ **Performance**: Gzip compression and asset caching
- ✅ **Security**: Security headers configured

## 📧 EmailJS Setup

If you need the contact form to work, you'll need to configure EmailJS:

1. **Create EmailJS Account**
   - Sign up at [EmailJS](https://www.emailjs.com/)
   - Verify your email address

2. **Create Email Service and Template**
   - Follow the EmailJS setup guide in `pre-migration.md`
   - Get your Service ID, Template ID, and Public Key

3. **Pass Environment Variables**
   
   **For Docker Compose:**
   - Add variables to `.env` file
   - Uncomment `args` section in `docker-compose.yml`
   
   **For Docker Build:**
   - Use `--build-arg` flags when building
   - Or create a `.env` file and use it with build args

## 🔧 Configuration

### Port Configuration

To change the port mapping, modify `docker-compose.yml`:
```yaml
ports:
  - "3000:3000"  # Change YOUR_PORT to desired port
```

### Nginx Configuration

The nginx configuration is in `nginx.conf`. You can customize:
- Server settings
- Compression settings
- Cache policies
- Security headers

After modifying, rebuild the image:
```bash
docker compose build --no-cache
```

## 🚀 Deployment

### Current Hosting Setup

The website is currently hosted on a **home server** and exposed to the internet using **Cloudflare Tunnels**. This setup provides:
- Secure tunneling without exposing ports directly to the internet
- DDoS protection and security features from Cloudflare
- Free SSL/TLS certificates
- No need for static IP or port forwarding

### Alternative Deployment Options

The Docker container can also be deployed to various cloud platforms:

**Docker Hub:**
```bash
# Tag the image
docker tag shangmin-portfolio yourusername/shangmin-portfolio

# Push to Docker Hub
docker push yourusername/shangmin-portfolio
```

**AWS ECS, Google Cloud Run, Azure Container Instances:**
- Use the Dockerfile directly
- Platforms will build and deploy automatically

**VPS/Server:**
```bash
# On your server
docker pull yourusername/shangmin-portfolio
docker run -d -p 80:80 --name portfolio shangmin-portfolio
```

### Environment Variables in Production

For production deployments, pass environment variables at build time:
- Use build args during image build
- Or use platform-specific secret management
- Never commit sensitive keys to the repository

## 📚 Additional Resources

- [Docker Documentation](https://docs.docker.com/)
- [Docker Compose Documentation](https://docs.docker.com/compose/)
- [React Documentation](https://reactjs.org/)
- [Nginx Documentation](https://nginx.org/en/docs/)
- [EmailJS Documentation](https://www.emailjs.com/docs/)

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

**Built with ❤️ by Simon Chen**
