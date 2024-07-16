## ⚙️ Project Setup & Express Server
---

### Step 1: Initialize a Node.js Project
#### 1. Create a New Directory
```bash
mkdir node-express-quickstart
cd node-express-quickstart
```
#### 2. Initialize npm
```bash
npm init -y
```
_This creates a `package.json` file with default settings._


### Step 2: Install Dependencies
#### 1. **Install Express.js**
```bash
npm install express
```
#### 2. **Install Nodemon & dotenv as a Development Dependency**
```bash
npm install dotenv // - Loads env variables from .env file
npm install -D nodemon // - Auto-restarts server on changes
```
#### 3. **Add Start Script in package.json**
```bash
"scripts": {
    "start": "node server.js", // Starts the server using Node.js,
    "dev": "nodemon server.js" // Starts the server using Nodemon, which automatically restarts the server when file changes are detected.
}
```


### Step 3: Create the Basic Project Structure
#### 1. **Create Main Application File**
```bash
touch server.js
```
#### 2. **Create Directory for Routes and Middleware**
```bash
mkdir routes middleware
```
#### 3. **Create .env File and Environment Variables**
```bash
touch .env
PORT=3000 # You can change this port number if needed.
```

### Step 4: Write Basic Express Server with dotenv Integration
#### 1. **Write Basic Server Code in server.js**
```bash
// Import required modules
const express = require('express');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

// Create an instance of an Express application
const app = express();

// Define the port number where the server will listen for requests (from .env)
const port = process.env.PORT || 3000;

// Define a route for the root URL ("/") that sends "Hello World!" as a response
app.get('/', (req, res) => {
res.send('Hello World!'); });

// Start the server and listen on the specified port console.log(`Server is running on <http://localhost>:${port}`); });
```

---

<a href="https://github.com/RajonDey/node-express-quickstart/tree/2-Setting-Up-Controllers" style="display: inline-block; padding: 10px 20px; font-size: 16px; color: white; background-color: orange; text-align: center; text-decoration: none; border-radius: 5px;">Branch for Source Code</a>
