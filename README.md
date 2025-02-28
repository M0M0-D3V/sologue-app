# Sologue App - Solo Dialogue

This is a chat application built using React and Firebase. It features Google Authentication, real-time messaging, and chat history management.

## Table of Contents

- [Sologue App - Solo Dialogue](#sologue-app---solo-dialogue)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
  - [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
    - [Configuration](#configuration)
    - [Running the App](#running-the-app)
    - [Testing](#testing)
    - [Deployment](#deployment)
    - [License](#license)
  
## Features

- Google Authentication: Sign in using your Google account.
- Real-time Messaging: Send and receive messages in real-time.
- Chat History Management: View, edit, and delete chat history.
- User Profile: View and manage user profile information.

## Getting Started

To get a local copy up and running, follow these steps.

### Prerequisites

Ensure you have the following installed:

- Node.js
- npm (or yarn)
- Firebase CLI

### Installation

Clone the repository and install dependencies.

```bash
git clone https://github.com/M0M0-D3V/sologue-app.git
cd sologue-app
npm install
```

### Configuration

Set up your Firebase project:

1. Go to the Firebase Console.
2. Create a new project or select an existing one.
3. Navigate to Project settings and add a new web app.
4. Copy the Firebase config object and update src/firebaseConfig.js with your project credentials.

```Javascript
// src/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);

export { auth, provider, db };
```

### Running the App

Build and start the application

```Bash
npm run build
npm start
```

### Testing

Run unit tests using Jest and React Testing Library.

```Bash
npm test
```

### Deployment

Deploy the app to Firestore Hosting.

1. Build the app:

```Bash
npm run build
```

2. Deploy to Firebase:

```Bash
firebase deploy
```

### License

Feel free to customize this template based on your specific project details. This README provides a clear and structured overview of your project, including setup instructions, features, and how to run and test the app.

Let me know if you need any further assistance or adjustments!