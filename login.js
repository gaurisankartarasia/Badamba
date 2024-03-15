import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword,updateProfile, signOut, onAuthStateChanged, GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";


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

// Check if the user is already signed in
onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, display the logout button and username
    document.getElementById('logoutBtn').style.display = 'block';
    document.getElementById('signinBtn').style.display = 'none';
    var modal = document.getElementById('exampleModal');
    modal.style.display = 'none';

   // Hide the modal backdrop
  var modalBackdrop = document.getElementsByClassName('modal-backdrop')[0];
   if (modalBackdrop) {
  modalBackdrop.style.display = 'none';
}


    // document.getElementById('username').textContent = `Hello, ${user.displayName}!`;
  } else {
    // User is signed out, hide the logout button and username
    document.getElementById('logoutBtn').style.display = 'none';
    document.getElementById('signinBtn').style.display = 'block';
    document.getElementById('username').textContent = '';
  }
});

// Signup function
window.signup = async () => {
  const firstName = document.getElementById('signupFirstName').value;
  const lastName = document.getElementById('signupLastName').value;
  const email = document.getElementById('signupEmail').value;
  const password = document.getElementById('signupPassword').value;

  try {
    // Create user with email and password
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    
    // Access the user object from userCredential
    const user = userCredential.user;
    
    // Update the user's display name
    await updateProfile(user, {
      displayName: `${firstName} ${lastName}`
    });

    alert('Signup successful!');
  } catch (error) {
    alert(`Signup failed: ${error.message}`);
  }
}
// Login function
window.login = async () => {
  const email = document.getElementById('loginEmail').value;
  const password = document.getElementById('loginPassword').value;

  try {
    await signInWithEmailAndPassword(auth, email, password);
    alert('Login successful!');
    window.location.reload();
  } catch (error) {
    alert(`Login failed due to wrong email or password: ${error.message}`);
  }
};

// Logout function
window.logout = async () => {
  try {
    await signOut(auth);
    alert('Logout successful!');
    // window.location.reload();
    openModal(); // Call openModal() after successful login
  } catch (error) {
    alert(`Logout failed: ${error.message}`);
  }
}; 
