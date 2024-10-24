<div align="center">
    <img src="https://accounts.nia.gov.ph/Content/images/icons/2020-nia-logo.svg?v=5" alt="NIA Logo" width="150"/>
    <h1 style="color: #046937;">National Irrigation Administrator (NIA) Project Templates</h1>
</div>

<p style="color: #046937;">This repository provides templates for developing web applications using modern technology stacks. It includes both a <strong>client</strong> (front-end) and a <strong>server</strong> (back-end) that can be used to kickstart development for NIA projects.</p>

<h2 style="color: #037628;">Tech Stack</h2>

<h3 style="color: #046937;">Client (Front-End)</h3>
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

<h3 style="color: #046937;">Server (Back-End)</h3>
<p>The server side is built with <strong>Node.js</strong>, <strong>Express.js</strong>, and <strong>MongoDB</strong> for data management:</p>
<ul>
    <li><strong>express</strong>: A fast, minimalist web framework for Node.js.</li>
    <li><strong>mongoose</strong>: ODM for MongoDB, providing schema-based data models.</li>
    <li><strong>dotenv</strong>: Loads environment variables from a <code>.env</code> file into <code>process.env</code>.</li>
    <li><strong>cors</strong>: Enables Cross-Origin Resource Sharing.</li>
    <li><strong>cookie-parser</strong>: Parses cookies attached to client requests.</li>
    <li><strong>jsonwebtoken (JWT)</strong>: Used to securely transmit information between the server and client as JSON objects, typically for authentication and authorization purposes.</li>
</ul>

<h2 style="color: #037628;">Getting Started</h2>

<h3 style="color: #046937;">Prerequisites</h3>
<p>Ensure you have the following installed on your machine:</p>
<ul>
    <li><strong>Node.js</strong> (version 16.x or later)</li>
    <li><strong>npm</strong> (comes bundled with Node.js)</li>
    <li><strong>MongoDB</strong> (for running the server-side database)</li>
</ul>

<h3 style="color: #046937;">Installation</h3>
<ol>
    <li><strong>Clone the repository:</strong>
        <pre><code>git clone https://github.com/johnkeru/NIA_TEMPLATES.git
cd NIA_TEMPLATES</code></pre>
    </li>
    <li><strong>Open two terminal or cmd prompt for CLIENT and SERVER.</strong></li>
    <li><strong>Install Client Dependencies:</strong>
        <p>Open a terminal and navigate to the CLIENT folder:</p>
        <pre><code>cd CLIENT
npm install</code></pre>
    </li>
    <li><strong>Install Server Dependencies:</strong>
        <p>Open another terminal window and navigate to the SERVER folder:</p>
        <pre><code>cd SERVER
npm install</code></pre>
    </li>
    <li><strong>Configuration:</strong>
        <p>Before running the application, reach out to <strong>Sir Ransey</strong> about the account API details. You will need the following configurations in your <code>.env</code> file:</p>
        <pre><code>

CLIENT1 = http://localhost:3000
CLIENT2 = http://localhost:3001

CLIENT_ID = 
OWNER_ID = 
ACCOUNT_TOKEN_API_URL = 
ACCOUNT_USER_API_URL = 

MONGODB_URL = 

JWT_SECRET_KEY = 

SUPER_ADMIN_1 = 123456

SUPER_ADMIN = 'SUPER ADMIN'
DEFAULT_USER = 'USER'

</code></pre>
    </li>
    <li><strong>Start the Application:</strong>
        <p>In one terminal, for CLIENT, run:</p>
        <pre><code>npm start</code></pre>
        <p>In the second terminal, for SERVER, run:</p>
        <pre><code>npm start</code></pre>
    </li>
    <li><strong>Generate jwt secret. Set Roles and Super Admin in the Database:</strong>
        <p>AFTER YOU SET EVERYTHING ABOVE ENV DETAILS</p>
        <p>GO TO <code>zrest/set.rest</code> AND RUN:</p>
        <ul>
            <li><strong>GET</strong> <code>http://localhost:5000/generate-jwt-secret</code> — It will respond with a <code>secretKey</code>. Get the value and set it as <code>JWT_SECRET_KEY</code> in the <code>.env</code> file.</li>
            <li><strong>GET</strong> <code>http://localhost:5000/set-roles-and-assign</code> — this will set roles and super admins for the user, e.g., <code>SUPER_ADMIN_1</code>.</li>
        </ul>
    </li>
   <li><strong>Restart the server after some changes in .env:</strong>
      <p>Press <strong>CTRL + C</strong> to stop the server in the terminal.</p>
      <p>For macOS and Linux users, you may also use <strong>CMD + C</strong> to stop the server.</p>
      <pre><code>npm start</code></pre>
   </li>
</ol>

<p>That's it! Your application should be up and running at <strong><code>http://localhost:3000/login</code></strong>.</p>
