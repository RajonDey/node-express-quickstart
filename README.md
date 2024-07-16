# A Complete Guide to How Websites Work Using Node.js and Express

![A-Step-by-Step-Guide-with-Node.js-Express](https://www.rajondey.com/wp-content/uploads/2024/07/How-Websites-Work-A-Step-by-Step-Guide-with-Node.js-Express.png)

## Table of Contents
1. [📖 Introduction](#introduction)
    - [🌐 How a Website Works](#how-a-website-works)
    - [🛠️ What is Node.js?](#what-is-nodejs)
    - [🚀 Benefits of Using Express.js with Node.js](#benefits-of-using-expressjs-with-nodejs)
2. [⚙️ Project Setup & Creating an Express Server](#project-setup--creating-an-express-server)
3. [🔌 API Client Setup](#api-client-setup)
4. [🗺️ Express Router Setup](#express-router-setup)
5. [🏗️ Setting Up Controllers](#setting-up-controllers)
6 .[🔄 Handling HTTP Methods and Middleware ](#handling-http-methods-and-middleware )
7 .[✅ Conclusion ](#conclusion )

| Plugin | README |
| ------ | ------ |
| 📖 Intro | [📖 Introduction](#introduction) |
| 📖 Step 1 | [STEPS/step-1.md][PlDb] |


---

## 📖 Introduction

### 🌐 How a Website Works

A website consists of two main parts: the frontend and the backend. The frontend is what users interact with directly in their web browser - design, buttons, text, and images. The backend handles data processing, storage, and business logic.

#### Simplified Flow:
1. **User Request**: User interacts with the frontend.
2. **HTTP Request**: Frontend sends an HTTP request to the backend.
3 .**Backend Processing:** Backend processes request .
4 .**Database Interaction:** Backend retrieves stores data database .
5 .**HTTP Response:** Backend sends response back frontend .
6 .**Frontend Update:** Frontend updates UI based on response .

### 🛠️ What is Node.js?

- **What**: A runtime environment that allows JavaScript to run on the server side.
- **Why**:
  - Single Programming Language for both frontend and backend (JavaScript).
  - Vibrant Ecosystem with npm (Node Package Manager).

### 🚀 Benefits of Using Express.js with Node.js

Express.js is a framework for Node.js that simplifies web application development.

#### Key Benefits:
*Simplified Routing:* Easier management different endpoints .
Middleware Support : Built-in support logging ,authentication error handling etc …..
Fast Lightweight : Unopinionated structure freedom flexibility developers prefer respectively …..

Integration Databases Easily integrates various databases SQL NoSQL alike through libraries modules available within ecosystem respectively

## ⚙️ Project Setup & Creating an Express Server

### Step 1: Initialize a Node.js Project

1. **Create a New Directory**
```bash
mkdir node-express-quickstart
cd node-express-quickstart
```
2. Initialize npm
```bash
npm init -y
```
This creates a `package.json` file with default settings.


### Step 2: Install Dependencies
1. **Install Express.js**
```bash
npm install express
```
2. **Install Nodemon & dotenv as a Development Dependency**
```bash
npm install dotenv // - Loads env variables from .env file
npm install -D nodemon // - Auto-restarts server on changes
```
3. **Add Start Script in package.json**
```bash
"scripts": {
    "start": "node server.js", // Starts the server using Node.js,
    "dev": "nodemon server.js" // Starts the server using Nodemon, which automatically restarts the server when file changes are detected.
}
```

### Step 3: Create the Basic Project Structure
1. **Create Main Application File**
```bash
touch server.js
```
2. **Create Directory for Routes and Middleware**
```bash
mkdir routes middleware
```
3. **Create .env File and Environment Variables**
```bash
touch .env
PORT=3000 # You can change this port number if needed.
```

### Step 4: Write Basic Express Server with dotenv Integration
1. **Write Basic Server Code in server.js**
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

### Step 5: Start The Server
Open your browser and go to [http://localhost:<PORT>](http://localhost:<PORT>) (replace <PORT> with whatever value you've set in your .env). You should see `"Hello World!" displayed.
```bash
npm run dev # or use 'npm start' if not developing actively.
```
