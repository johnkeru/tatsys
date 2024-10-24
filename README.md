<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>National Irrigation Administrator (NIA) Project Templates</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            background-color: #f4f4f4;
            margin: 0;
            padding: 20px;
        }
        header {
            background-color: #046937;
            color: #fff;
            padding: 10px 0;
            text-align: center;
        }
        h1, h2, h3 {
            color: #046937;
        }
        h1 {
            font-size: 2.5rem;
        }
        h2 {
            font-size: 2rem;
            margin-top: 20px;
        }
        h3 {
            font-size: 1.5rem;
            margin-top: 15px;
        }
        p, ul {
            margin: 10px 0;
            font-size: 1rem;
        }
        ul {
            list-style-type: none;
            padding: 0;
        }
        li {
            margin: 5px 0;
            padding-left: 20px;
            position: relative;
        }
        li::before {
            content: '✔️';
            position: absolute;
            left: 0;
            color: #037628;
        }
        .logo {
            max-width: 150px;
            margin: 20px auto;
            display: block;
        }
        code {
            background-color: #e2e2e2;
            padding: 2px 4px;
            border-radius: 4px;
        }
        pre {
            background-color: #e2e2e2;
            padding: 10px;
            border-radius: 4px;
            overflow-x: auto;
        }
    </style>
</head>
<body>

<header>
    <img src="https://accounts.nia.gov.ph/Content/images/icons/2020-nia-logo.svg?v=5" alt="NIA Logo" class="logo">
    <h1>National Irrigation Administrator (NIA) Project Templates</h1>
</header>

<main>
    <section>
        <h2>Overview</h2>
        <p>This repository provides templates for developing web applications using modern technology stacks. It includes both a <strong>client</strong> (front-end) and a <strong>server</strong> (back-end) that can be used to kickstart development for NIA projects.</p>
    </section>

    <section>
        <h2>Tech Stack</h2>

        <h3>Client (Front-End)</h3>
        <p>The client side is built with <strong>React</strong> and incorporates the following key technologies:</p>
        <ul>
            <li><strong>@emotion/react & @emotion/styled</strong>: CSS-in-JS styling solutions.</li>
            <li><strong>@mui/material</strong>: Material-UI component library for UI design.</li>
            <li><strong>@tanstack/react-query</strong>: Efficient server-state management and caching.</li>
            <li><strong>axios</strong>: For making HTTP requests.</li>
            <li><strong>react-hook-form</strong>: For form management and validation.</li>
            <li><strong>yup</strong>: Schema validation for <code>react-hook-form</code>.</li>
            <li><strong>react-router-dom</strong>: For client-side routing management.</li>
            <li><strong>react-hot-toast</strong>: For displaying notifications and toast messages.</li>
        </ul>

        <h3>Server (Back-End)</h3>
        <p>The server side is built with <strong>Node.js</strong>, <strong>Express.js</strong>, and <strong>MongoDB</strong> for data management:</p>
        <ul>
            <li><strong>express</strong>: A fast, minimalist web framework for Node.js.</li>
            <li><strong>mongoose</strong>: ODM for MongoDB, providing schema-based data models.</li>
            <li><strong>dotenv</strong>: Loads environment variables from a <code>.env</code> file into <code>process.env</code>.</li>
            <li><strong>cors</strong>: Enables Cross-Origin Resource Sharing.</li>
            <li><strong>cookie-parser</strong>: Parses cookies attached to client requests.</li>
            <li><strong>jsonwebtoken (JWT)</strong>: Used to securely transmit information between the server and client as JSON objects, typically for authentication and authorization purposes.</li>
        </ul>
    </section>

    <section>
        <h2>Getting Started</h2>

        <h3>Prerequisites</h3>
        <p>Ensure you have the following installed on your machine:</p>
        <ul>
            <li><strong>Node.js</strong> (version 16.x or later)</li>
            <li><strong>npm</strong> (comes bundled with Node.js)</li>
            <li><strong>MongoDB</strong> (for running the server-side database)</li>
        </ul>

        <h3>Installation</h3>
        <ol>
            <li><strong>Clone the repository:</strong>
                <pre><code>git clone https://github.com/johnkeru/NIA_TEMPLATES.git
cd NIA_TEMPLATES</code></pre>
            </li>
            <li><strong>Open two terminal or cmd prompt for CLIENT and SERVER.</strong></li>
            <li><strong>Install Client Dependencies:</strong>
                <pre><code>cd CLIENT
npm install</code></pre>
            </li>
            <li><strong>Install Server Dependencies:</strong>
                <pre><code>cd SERVER
npm install</code></pre>
            </li>
            <li><strong>Configuration:</strong>
                <p>Before running the application, reach out to <strong>Sir Ransey</strong> about the account API details. You will need the following configurations in your <code>.env</code> file:</p>
                <pre><code># your react.js url
CLIENT1=http://localhost:3000
CLIENT2=http://localhost:3001

# sir ransey's api for accounts
CLIENT_ID=
OWNER_ID=
ACCOUNT_TOKEN_API_URL=
ACCOUNT_USER_API_URL=

# mongo database url
MONGODB_URL=

JWT_SECRET_KEY=

# your system's super admin
SUPER_ADMIN_1=123456
# SUPERADMIN2=123457

# system's roles
SUPER_ADMIN='SUPER ADMIN'
DEFAULT_USER='USER'</code></pre>
            </li>
            <li><strong>Start the Application:</strong>
                <p>In one terminal, for CLIENT, run:</p>
                <pre><code>npm start</code></pre>
                <p>In the second terminal, for SERVER, run:</p>
                <pre><code>npm start</code></pre>
            </li>
            <li><strong>Set Roles and Super Admin in the Database:</strong>
                <p>AFTER YOU SET EVERYTHING ABOVE ENV DETAILS, GO TO <code>zrest/set.rest</code> AND RUN:</p>
                <ul>
                    <li><strong>GET</strong> <code>http://localhost:5000/generate-jwt-secret</code> — It will respond with a <code>secretKey</code>. Get the value and set it as <code>JWT_SECRET_KEY</code> in the <code>.env</code> file.</li>
                    <li><strong>GET</strong> <code>http://localhost:5000/set-roles-and-assign</code> — this will set roles and super admins for the user, e.g., <code>SUPER_ADMIN_1</code>.</li>
                </ul>
            </li>
        </ol>

        <p>That's it! Your application should be up and running at <code>http://localhost:3000/login</code>.</p>
    </section>
</main>

</body>
</html>
