<h2>National Irrigation Administrator (NIA) Project Templates</h2>

<p>This repository provides templates for developing web applications using modern technology stacks. It includes both a <strong>client</strong> (front-end) and a <strong>server</strong> (back-end) that can be used to kickstart development for NIA projects.</p>

<hr />

<h3>Tech Stack</h3>

<h4>Client (Front-End)</h4>
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

<h4>Server (Back-End)</h4>
<p>The server side is built with <strong>Node.js</strong>, <strong>Express.js</strong>, and <strong>MongoDB</strong> for data management:</p>
<ul>
  <li><strong>express</strong>: A fast, minimalist web framework for Node.js.</li>
  <li><strong>mongoose</strong>: ODM for MongoDB, providing schema-based data models.</li>
  <li><strong>dotenv</strong>: Loads environment variables from a <code>.env</code> file into <code>process.env</code>.</li>
  <li><strong>cors</strong>: Enables Cross-Origin Resource Sharing.</li>
  <li><strong>cookie-parser</strong>: Parses cookies attached to client requests.</li>
  <li><strong>jsonwebtoken (JWT)</strong>: Used to securely transmit information between the server and client as JSON objects, typically for authentication and authorization purposes.</li>
</ul>

<hr />

<h3>Getting Started</h3>

<h4>Prerequisites</h4>
<p>Ensure you have the following installed on your machine:</p>
<ul>
  <li><strong>Node.js</strong> (version 16.x or later)</li>
  <li><strong>npm</strong> (comes bundled with Node.js)</li>
  <li><strong>MongoDB</strong> (for running the server-side database)</li>
</ul>

<h4>Installation</h4>
<ol>
  <li><strong>Clone the repository:</strong>
    <pre><code>git clone https://github.com/johnkeru/NIA_TEMPLATES.git
cd NIA_TEMPLATES</code></pre>
  </li>

  <li><strong>Open two terminals or command prompts for CLIENT and SERVER.</strong></li>

  <li><strong>Install Client Dependencies:</strong>
    <ul>
      <li>Open a terminal and navigate to the CLIENT folder:</li>
      <pre><code>cd CLIENT
npm install</code></pre>
    </ul>
  </li>

  <li><strong>Install Server Dependencies:</strong>
    <ul>
      <li>Open another terminal window and navigate to the SERVER folder:</li>
      <pre><code>cd SERVER
npm install</code></pre>
    </ul>
  </li>

  <li><strong>Configuration:</strong>
    <p>Before running the application, reach out to <strong>Sir Ransey</strong> about the account API details. You will need the following configurations in your <code>.env</code> file:</p>
    <pre><code># your react.js url
CLIENT1 = http://localhost:3000
CLIENT2 = http://localhost:3001

# sir ransey's api for accounts
CLIENT_ID = 
OWNER_ID = 
ACCOUNT_TOKEN_API_URL = 
ACCOUNT_USER_API_URL = 

# mongo database url
MONGODB_URL = 
  
JWT_SECRET_KEY = 

# your system's super admin
SUPER_ADMIN_1 = 123456
# SUPERADMIN2 = 123457

# system's roles
SUPER_ADMIN = 'SUPER ADMIN'
DEFAULT_USER = 'USER'</code></pre>
  </li>

  <li><strong>Start the Application:</strong>
    <ul>
      <li>In one terminal, for CLIENT, run:</li>
      <pre><code>npm start</code></pre>
      <li>In the second terminal, for SERVER, run:</li>
      <pre><code>npm start</code></pre>
    </ul>
  </li>

  <li><strong>Set Roles and Super Admin in the Database:</strong>
    <p>After setting everything in the <code>.env</code> file:</p>
    <ul>
      <li>Go to <code>zrest/set.rest</code> and run:</li>
      <ul>
        <li><strong>GET</strong> <code>http://localhost:5000/generate-jwt-secret</code> — It will respond with a <code>secretKey</code>. Get the value and set it as <code>JWT_SECRET_KEY</code> in the <code>.env</code> file.</li>
        <li><strong>GET</strong> <code>http://localhost:5000/set-roles-and-assign</code> — This will set roles and super admins for the user, e.g., <code>SUPER_ADMIN_1</code>.</li>
      </ul>
    </ul>
  </li>
</ol>

<p><strong>That's it!</strong> Your application should be up and running at <a href="http://localhost:3000/login">http://localhost:3000/login</a>.</p>
