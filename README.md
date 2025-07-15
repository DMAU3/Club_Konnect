# ClubKonnect

**ClubKonnect** is a simple web application that connects students with college clubs and allows club admins to manage their members. Built for ease of use and real-time collaboration.

---

## Problem Statement

In many colleges, students find it difficult to explore or join campus clubs. ClubKonnect solves this by providing a central place where students can view all available clubs and join the ones they’re interested in. Club admins can also see who joined and manage events or announcements.

---

## Features

### For Students:
- View all available clubs
- Read club descriptions
- Join clubs easily
- See which clubs you’ve joined

### For Club Admins:
- Log in securely
- View students who joined their club
- Manage club-related data and update club details

---

## Tech Stack

- **Frontend**: React (Vite)
- **Backend**: Firebase Firestore (NoSQL)
- **Authentication**: Firebase Auth
- **Deployment/Dev**: Google IDX

---

## Setup & Run Locally

1. **Clone the repo**

    git clone https://github.com/your-username/clubkonnect.git
    cd clubkonnect

2. **Install Dependencies**

    npm install

3. **Set up Firebase**

    -Create a Firebase project at console.firebase.google.com
    -Enable Authentication (Email/Password)
    -Create Firestore Database
    -Add a Web App and copy Firebase config
    -Create a firebase.js inside "src/" folder:

    **Code of firebase.js file** 
    // src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  // ...rest of config
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
---

4. **Run the web app locally**

    CLI command: npm run dev
    and then
    Visit the link provided: http://localhost:1234(any link of this sort that you got)

---

## Google Technologies Used

-Firebase Authentication
-Cloud Firestore
-Google IDX (for development environment)
