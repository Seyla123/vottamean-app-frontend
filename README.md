# HexCode+

## Client-Side Project

## [Convention Guide](https://outgoing-oval-b13.notion.site/Capstones-Convention-Guide-f8214576f0da41758941a1678c8a6e07?pvs=4)

## Table of Contents
1. [Project Overview](#project-overview)
2. [Dependencies](#dependencies)
3. [Project Structure](#project-structure)
4. [Component Standards](#component-standards)
5. [State Management](#state-management)
6. [Form Handling](#form-handling)
7. [Routing Standards](#routing-standards)
8. [Styling Guide](#styling-guide)
9. [Testing and Linting](#testing-and-linting)
10. [Version Control](#version-control)
11. [Naming, Git & Deployment Conventions](#naming-git-deployment-conventions)

## 1. Project Overview
This project is a client-side application built using **React** with **Vite**. It utilizes **MUI** (Material UI) for the user interface, **Redux Toolkit** for state management, **React Hook Form** and **Yup** for form validation, and various other libraries for additional features like PDF generation, image compression, and date manipulation.

## 2. Dependencies
The following are the key dependencies used in this project:
- **@mui/material**: Provides Material UI components for designing the user interface.
- **@mui/icons-material**: Material Icons for UI elements.
- **@reduxjs/toolkit**: For managing the application state.
- **react-router-dom**: Handles client-side routing.
- **axios**: Handles API requests.
- **@hookform/resolvers**: Resolver support for React Hook Form with Yup.
- **react-hook-form**: For form handling and validation.
- **yup**: Schema validation library for form validation.
- **html2canvas**: Converts DOM elements to canvas images.
- **jspdf**: Generates PDF documents from HTML.
- **browser-image-compression**: Compresses images in the browser.
- **moment** and **dayjs**: For date manipulation and formatting.
- **mui-tel-input**: Telephone input component with MUI integration.
- **notistack**: Notification stack for displaying alerts and messages.

For a full list of dependencies, refer to the `package.json` file.

## 3. Project Structure

### 3.1 Root Directory
- **index.html**: Main HTML file.
- **src**: Contains all source code.
  - **/assets**: Images, fonts, and static assets.
  - **/components**: Reusable React components.
  - **/hooks**: Custom hooks.
  - **/pages**: Main pages of the application.
  - **/redux**: Redux setup.
  - **/services**: API services using axios.
  - **/utils**: Utility functions.
  - **/routes**: Application routing configuration.
  - **/styles**: Contains global styles and theme configuration.

## 4. Component Standards
- Each component should be placed in its respective folder in `/components`.
- Use functional components with hooks.
- Component naming should follow **PascalCase** (e.g., `LoginForm.js`).
- Keep components as reusable as possible.

## 5. State Management
- **Redux Toolkit** is used for state management.
- Create **slices** under the `/redux/slices` directory for each domain (e.g., `authSlice.js`, `userSlice.js`).
- Use **RTK Query** for API integration if necessary.

## 6. Form Handling
- Use **React Hook Form** for managing forms and form validations.
- For schema-based validation, use **Yup** in combination with **@hookform/resolvers**.
- Place form-related components in `/components/forms` directory.

## 7. Routing Standards
- All routes are defined in **AppRouter.js** using **React Router**.
- Routes should follow this structure: `/` for home, `/login` for login, and `/dashboard` for the main dashboard.
- Use lazy loading for large page components.

## 8. Styling Guide
- Use **MUI** for all UI components to maintain a consistent design.
- Global styles and custom themes are managed in `/styles`.
- **Emotion** is used for creating custom styled components.
- Use consistent theme properties across all components (e.g., colors, typography).

## 9. Testing and Linting
- **ESLint** is used for code linting with React and React Hooks plugins.
- All code should follow the ESLint configuration provided in `.eslintrc.json`.
- Testing is recommended with **React Testing Library** and **Jest**.

## 10. Version Control
- Follow the **feature-branch** strategy for development.
- Main branches:
  - **main**: Stable release.
  - **develop**: Latest development changes.
- Branch naming convention: `feature/<feature-name>`, `bugfix/<bug-name>`, `hotfix/<hotfix-name>`.

## 11. Naming, Git & Deployment Conventions

### 11.1 Coding Standards
- **Naming Conventions:**
  - Use `camelCase` for variables and functions.
  - Use `PascalCase` for React components and class names.
  - Use `snake_case` for database table names.
- **Commenting:** Write meaningful comments to explain complex logic and functions.
- **Code Formatting:** Use a linter like `ESLint` and a formatter like `Prettier` to maintain consistent code style.

### 11.2 Version Control

#### 11.2.1 Commits
- Write clear, concise commit messages.
- Use present tense (e.g., "Add entry form").

#### 11.2.2 Branching
- Use branches for new features and bug fixes.
- Follow a naming convention (e.g., `feature/entry-form`, `bugfix/header`).

### 11.3 Git Conventions
**Git/GitHub Workflow:**

#### 11.3.1 Remote Repository
- **Creating Issues and Choosing Labels:** Create a clear issue description with relevant labels.
- **Feature Branch:** 
  - Feature-Issue: Describe the issue.
- **Release Branch:**
  - Release-version: Provide release description.
- **Bug-fix Branch:**
  - Bugfix: Describe the issue.
- **Hot-fix Branch:**
  - Hotfix: Describe the issue.

**Workspace Setup:**
1. Assign the person responsible for the issue.
2. Set the issue's status.
3. Link the issue to a project.
4. Upon completion, assign a reviewer.

💡 **Note:** Pay attention to all aspects of the issue (title message, detailed description, assignee, reviewer, label, project).

#### 11.3.2 Local Repository
**Branching Workflow:**
- Name the branch according to the actual problem and the task to be accomplished in that branch.

### 11.4 Deployment Conventions

#### 11.4.1 Server-side Deployment
- **Platform:** AWS EC2 instance with Ubuntu.
- **Containerization:** Docker to package the application and its dependencies.
- **Web Server:** Use Nginx to serve the application.

**Steps:**
1. **Setup EC2:** 
   - Create and configure an AWS EC2 instance with Ubuntu.
   - Connect to your instance using SSH.
   
   ```bash
   ssh -i your-key.pem ubuntu@your-ec2-instance-ip

### 11.4 Deployment Conventions

#### 11.4.1 Server-side Deployment
- **Platform:** AWS EC2 instance with Ubuntu.
- **Containerization:** Docker to package the application and its dependencies.
- **Web Server:** Use Nginx to serve the application.

**Steps:**
1. **Setup EC2:** 
   - Create and configure an AWS EC2 instance with Ubuntu.
   - Connect to your instance using SSH.

   ```bash
   ssh -i your-key.pem ubuntu@your-ec2-instance-ip
   ```

2. **Install Docker and Docker Compose:**
   - Update your system and install Docker:

     ```bash
     sudo apt update
     sudo apt install -y docker.io
     ```

   - Install Docker Compose:

     ```bash
     sudo curl -L "https://github.com/docker/compose/releases/download/$(curl -s https://api.github.com/repos/docker/compose/releases/latest | jq -r .tag_name)/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
     sudo chmod +x /usr/local/bin/docker-compose
     ```

3. **Clone the Repository:**
   - Navigate to the desired directory and clone the GitHub repository:

     ```bash
     git clone https://github.com/your-username/your-repo.git
     cd your-repo
     ```

4. **Configure Environment Variables:**
   - Set up a `.env` file for environment variables.
   - Ensure all required API keys, database URLs, and other sensitive data are stored in this file.

5. **Set Up Docker Configuration:**
   - Create a `docker-compose.yml` file for container configuration:

     ```yml
     version: '3'
     services:
       web:
         image: node:16
         working_dir: /app
         volumes:
           - .:/app
         command: ["npm", "run", "start"]
         ports:
           - "80:3000"
         env_file:
           - ./.env
     ```

6. **Build and Run the Docker Container:**

   ```bash
   sudo docker-compose up -d --build
   ```

7. **Set Up Nginx as a Reverse Proxy:**
   - Install Nginx:

     ```bash
     sudo apt install -y nginx
     ```

   - Configure Nginx by creating a new configuration file:

     ```bash
     sudo nano /etc/nginx/sites-available/your-app
     ```

   - Add the following configuration:

     ```nginx
     server {
       listen 80;

       server_name your-domain.com;

       location / {
         proxy_pass http://localhost:3000;
         proxy_http_version 1.1;
         proxy_set_header Upgrade $http_upgrade;
         proxy_set_header Connection 'upgrade';
         proxy_set_header Host $host;
         proxy_cache_bypass $http_upgrade;
       }
     }
     ```

   - Enable the configuration and restart Nginx:

     ```bash
     sudo ln -s /etc/nginx/sites-available/your-app /etc/nginx/sites-enabled
     sudo systemctl restart nginx
     ```

8. **SSL Configuration (Optional but Recommended):**
   - For SSL, use **Certbot**:

     ```bash
     sudo apt install -y certbot python3-certbot-nginx
     sudo certbot --nginx -d your-domain.com
     ```

9. **Verify Deployment:**
   - Visit `http://your-domain.com` or `https://your-domain.com` to confirm the deployment is live.

### 11.5 Maintenance and Updates

- Regularly check server logs for errors using:

  ```bash
  sudo docker logs <container-id>
  sudo journalctl -u nginx
  ```

- For application updates:
  - Pull changes from the repository:

    ```bash
    git pull origin main
    ```

  - Rebuild the Docker container:

    ```bash
    sudo docker-compose up -d --build
    ```

This completes the deployment setup for the client-side project on an AWS EC2 instance using Docker and Nginx as a reverse proxy with optional SSL configuration through Certbot. This approach ensures a scalable and secure deployment pipeline.
