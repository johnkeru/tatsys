<div align="center">
    <img src="https://accounts.nia.gov.ph/Content/images/icons/2020-nia-logo.svg?v=5" alt="NIA Logo" width="150"/>
    <h1 style="color: #046937;">National Irrigation Administrator (NIA) Project Templates</h1>
</div>

<p align="center" style="color: #046937; font-size: 1.2em;">
    Kickstart your NIA projects with comprehensive templates for developing web applications using modern technology stacks. This repository includes both a <strong>client</strong> (front-end) and a <strong>server</strong> (back-end).
</p>

---

## 🚀 Tech Stack

### 💻 Client (Front-End)

Built with **React** and includes the following technologies:

- **@emotion/react & @emotion/styled** - CSS-in-JS styling solutions
- **@mui/material** - Material-UI component library for UI design
- **@tanstack/react-query** - Server-state management and caching
- **axios** - HTTP request library
- **react-hook-form** - Form management and validation
- **yup** - Schema validation for forms
- **react-router-dom** - Client-side routing
- **react-hot-toast** - For notifications and toast messages

### 🖥️ Server (Back-End)

Built with **Node.js**, **Express.js**, and **MongoDB** for data management:

- **express** - Fast, minimalist web framework for Node.js
- **mongoose** - ODM for MongoDB with schema-based data models
- **dotenv** - Environment variables management
- **cors** - Cross-Origin Resource Sharing management
- **cookie-parser** - Parses cookies in client requests
- **jsonwebtoken (JWT)** - For secure client-server communication (authentication & authorization)

---

## ⚙️ Getting Started

### Prerequisites

Make sure you have the following installed:

- **Node.js** (v16.x or later)
- **npm** (bundled with Node.js)
- **MongoDB** (for server-side database)

### Installation

1. **Clone the Repository**

   ```bash
   git clone https://github.com/johnkeru/NIA_TEMPLATES.git
   cd NIA_TEMPLATES
   ```

2. **Open Two Terminals for CLIENT and SERVER**

3. **Install Client Dependencies**
   Open a terminal, navigate to the CLIENT folder, and install dependencies:

   ```bash
   cd CLIENT
   npm install
   ```

4. **Install Server Dependencies**
   In another terminal, navigate to the SERVER folder and install dependencies:

   ```bash
   cd SERVER
   npm install
   ```

5. **Configuration**
   Set up your `.env` file configurations. Contact **Sir Ransey** for API account details. Here are the required configurations:

   ```dotenv
   CLIENT1=http://localhost:3001
   CLIENT_ID=
   OWNER_ID=
   ACCOUNT_TOKEN_API_URL=
   ACCOUNT_USER_API_URL=https://accounts.nia.gov.ph/api/user
   MONGODB_URL=
   JWT_SECRET_KEY=
   ```

6. **Start the Application**

   - In the CLIENT terminal, run:
     ```bash
     npm start
     ```
   - In the SERVER terminal, run:
     ```bash
     npm start
     ```

7. **Set Roles and Super Admin in the Database**
   Once configured, go to `utils/set.rest` and run:

   - **GET** `http://localhost:5000/setData` — This will set roles and super admins for the user.

8. **Restart the Server after Changes**
   To restart after updating `.env` details:
   ```bash
   Press CTRL + C (or CMD + C for macOS/Linux) to stop the server, then:
   npm start
   ```

## 🎉 That's it!

Your application should now be running at **[http://localhost:3000/login](http://localhost:3000/login)**.
