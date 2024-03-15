import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-analytics.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js"; // Import Firebase Auth
import { getFirestore, collection, addDoc, onSnapshot } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";

// Your web app's Firebase configuration
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
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app); // Initialize Firebase Auth
// const db = firebase.firestore();

// Function to add a comment
function addComment() {
  // Get the authenticated user
  const user = auth.currentUser;

  // Check if user is authenticated
  if (user) {
    // Retrieve user's display name
    const displayName = user.displayName;

    // Get comment text
    const commentText = document.getElementById('comment').value;

    // Create comment data
    const commentData = {
      name: displayName,
      text: commentText
    };
    // Add a comment to the user's document using their display name
    addDoc(collection(db,  'comments'), commentData)
      .then((docRef) => {
        console.log("Comment added with ID: ", docRef.id);
      })
      .catch((error) => {
        console.error("Error adding comment: ", error);
      });
  } else {
    console.error("User not authenticated.");
  }
}

// Function to display comments
function displayComments(snapshot) {
  const commentsDiv = document.getElementById('comments');
  commentsDiv.innerHTML = '';

  snapshot.forEach(commentSnapshot => {
    const commentData = commentSnapshot.data();
    const commentElement = document.createElement('div');
    commentElement.innerHTML = `
    <div class="comment-display">
    <strong>${commentData.name}</strong>: ${commentData.text}
    </div>`;
    commentsDiv.appendChild(commentElement);
  });
}


// // Call the function to display comments when the DOM is loaded
// document.addEventListener('DOMContentLoaded', function () {
//   displayUserComments();
// });


// Set up event listener for the button
document.addEventListener('DOMContentLoaded', function () {
  console.log("DOM content loaded.");

  const addCommentBtn = document.getElementById('addCommentBtn');
  addCommentBtn.addEventListener('click', addComment);

  // Reference to the "comments" collection
  const commentsRef = collection(db, 'comments');

  // Listen for changes in the "comments" collection and update the display
  onSnapshot(commentsRef, (snapshot) => {
    console.log("Comments snapshot received:", snapshot.docs.length, "comments");
    displayComments(snapshot);
  });
});

