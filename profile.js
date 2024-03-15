// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAHbJ2pK6lIr3WzHRU3vPGxkboXqn0ott0",
  authDomain: "nacbadamba.firebaseapp.com",
  projectId: "nacbadamba",
  storageBucket: "nacbadamba.appspot.com",
  messagingSenderId: "653770638123",
  appId: "1:653770638123:web:b9c0d608c902adbb1b7b6e",
  measurementId: "G-Y1WQQVE4HD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Check if user is authenticated
auth.onAuthStateChanged(user => {
  const userProfileDiv = document.getElementById('userProfile');
  if (user) {
    // User is signed in, display their profile details
    const displayName = user.displayName || 'No Display Name';
    const email = user.email || 'No Email';
    const profileHTML = `
      <p><b>Your Name:</b> ${displayName}</p>
      <p><b>Your Email:</b> ${email}</p>
      <!-- Add more fields as needed -->
    `;
    userProfileDiv.innerHTML = profileHTML;
  } else {
    // No user is signed in
    userProfileDiv.innerHTML = '<p>You are not signed in.</p> ';
   
  }
});