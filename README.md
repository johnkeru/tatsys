## National Irrigation Administrator (NIA) Project Templates

This repository provides templates for developing web applications using modern technology stacks. It includes both a **client** (front-end) and a **server** (back-end) that can be used to kickstart development for NIA projects.

### Tech Stack

#### Client (Front-End)
The client side is built with **React** and incorporates the following key technologies:
- **@emotion/react & @emotion/styled**: CSS-in-JS styling solutions.
- **@mui/material**: Material-UI component library for UI design.
- **@tanstack/react-query**: Efficient server-state management and caching.
- **axios**: For making HTTP requests.
- **react-hook-form**: For form management and validation.
- **yup**: Schema validation for `react-hook-form`.
- **react-router-dom**: For client-side routing management.
- **react-hot-toast**: For displaying notifications and toast messages.

#### Server (Back-End)
The server side is built with **Node.js**, **Express.js**, and **MongoDB** for data management:
- **express**: A fast, minimalist web framework for Node.js.
- **mongoose**: ODM for MongoDB, providing schema-based data models.
- **dotenv**: Loads environment variables from a `.env` file into `process.env`.
- **cors**: Enables Cross-Origin Resource Sharing.
- **cookie-parser**: Parses cookies attached to client requests.

### Getting Started

#### Prerequisites
Ensure you have the following installed on your machine:
- **Node.js** (version 16.x or later)
- **npm** (comes bundled with Node.js)
- **MongoDB** (for running the server-side database)

#### Installation
1. **Clone the repository:**
   ```bash
   git clone https://github.com/johnkeru/NIA_TEMPLATES.git
   cd NIA_TEMPLATES
   ```
2. **Open two terminal or cmd prompt for CLIENT and SERVER.**
3. **Install Client Dependencies:**
   - Open a terminal and navigate to the CLIENT folder:
     ```bash
     cd CLIENT
     npm install
     ```

4. **Install Server Dependencies:**
   - Open another terminal window and navigate to the SERVER folder:
     ```bash
     cd SERVER
     npm install
     ```

5. **Configuration:**
   - Before running the application, reach out to **Sir Ransey** about the account API details. You will need the following configurations in your `.env` file:

   ```plaintext
   # your react.js url
   CLIENT1 = http://localhost:3000
   CLIENT2 = http://localhost:3001

   # sir ransey's api for accounts
   CLIENT_ID = 
   OWNER_ID = 
   ACCOUNT_TOKEN_API = 
   ACCOUNT_USER_API = 

   # mongo database url
   MONGODB_URL = 

   # your system's super admin
   SUPER_ADMIN_1 = 123456
   # SUPERADMIN2 = 123457

   # system's roles
   SUPER_ADMIN = 'SUPER ADMIN'
   DEFAULT_USER = 'USER'
   ```

6. **Start the Application:**
   - In one terminal, navigate to the CLIENT folder and run:
     ```bash
     npm start
     ```
   - In the second terminal, navigate to the SERVER folder and run:
     ```bash
     npm start
     ```

That's it! Your application should be up and running.
