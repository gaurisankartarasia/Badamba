import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-analytics.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js"; // Import Firebase Auth
import { getFirestore, collection, doc, getDoc, addDoc, onSnapshot, query, orderBy, startAfter, limit, getDocs } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js";
import { serverTimestamp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js";


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
async function addComment() {
  const user = auth.currentUser;

  if (user) {
    try {
      const displayName = user.displayName;
      const commentText = document.getElementById('comment').value;

      if (commentText.trim() === "") {
        alert("Please enter a comment.");
        return;
      }

      const userDocRef = doc(db, 'users', user.uid);
      const userDocSnap = await getDoc(userDocRef);

      if (userDocSnap.exists()) {
        const userData = userDocSnap.data();

        // Get the current date and time
        const currentDate = new Date();
        const timestamp = formatDate(currentDate);

        const commentData = {
          name: displayName,
          text: commentText,
          timestamp: timestamp,
          isVerified: userData.isVerified || false,
          isVerified_Admin: userData.isVerified_Admin || false
        };

        const commentRef = await addDoc(collection(db, 'comments'), commentData);
        console.log("Comment added with ID: ", commentRef.id);
      } else {
        console.error("User data not found in Firestore.");
      }
    } catch (error) {
      console.error("Error adding comment: ", error);
    }
  } else {
    alert("Sign in to comment.");
  }
}

// Function to format timestamp
function formatDate(timestamp) {
  const currentDate = new Date();
  const commentDate = new Date(timestamp);

  const timeDifference = currentDate.getTime() - commentDate.getTime();
  const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

  if (daysDifference === 0) {
    return 'Today';
  } else if (daysDifference === 1) {
    return 'Yesterday';
  } else if (daysDifference >= 2 && daysDifference <= 6) {
    return `${daysDifference} days ago`;
  } else {
    const day = commentDate.getDate();
    const monthIndex = commentDate.getMonth();
    const year = commentDate.getFullYear();
    return `${day}${getDaySuffix(day)} ${months[monthIndex]}, ${year}`;
  }
}

// Function to get the suffix for the day (e.g., st, nd, rd, th)
function getDaySuffix(day) {
  if (day >= 11 && day <= 13) {
    return "th";
  }
  switch (day % 10) {
    case 1: return "st";
    case 2: return "nd";
    case 3: return "rd";
    default: return "th";
  }
}

// fnction to open sign in modal
function openSuccessModal() {
  // Display modal
  var modal = document.getElementById("loginSuccessModal");
  modal.style.display = "block";
}











// Function to display comments-----------------------------------------







function displayComments(snapshot) {
  const commentsDiv = document.getElementById('comments');
  
  commentsDiv.innerHTML = '';

  snapshot.forEach(commentSnapshot => {
    const commentData = commentSnapshot.data();
    const commentElement = document.createElement('div');
    commentElement.classList.add('comment-display');

    let verifiedBadge = '';
    if (commentData.isVerified) {
      verifiedBadge = `<i class="bi bi-patch-check-fill text-primary fa-xs"></i>`;
    }

    let adminBadge = '';
    if (commentData.isVerified_Admin) {
      adminBadge = `<i class="bi bi-patch-check-fill text-secondary fa-xs"></i>`;
    }

    commentElement.innerHTML = `
      <div class="card animate__animated animate__fadeIn" style="background-color:var(--c-ash);border:none;">
        <div class="card-body">
          <b class="card-text">${commentData.name} ${verifiedBadge} ${adminBadge}</b>
          <p class="card-text">${commentData.text}</p>
          <p class="card-text"><small class="text-muted">${commentData.timestamp}</small></p>      
          
          
          <div class="d-flex align-items-center justify-between">
          <button><i class="fa-regular fa-thumbs-up"></i></button>
          <button>Report</button>
          </div>
         
          
          </div>
        
        
        
      </div>
      <hr>
    `;

    commentsDiv.appendChild(commentElement);
  });
}




// Set up event listener for the button
document.addEventListener('DOMContentLoaded', function () {
  console.log("DOM content loaded.");

  const addCommentBtn = document.getElementById('addCommentBtn');
  addCommentBtn.addEventListener('click', addComment);

  // Attach event listener for editing within DOMContentLoaded
  const editCommentBtn = document.getElementById('editCommentBtn');
  if (editCommentBtn) {
    editCommentBtn.addEventListener('click', function() {
      // Get the value of the edited comment
      var editedComment = document.getElementById("editCommentText").value;
      
      // Get the ID of the comment to be edited
      var commentId = document.getElementById("editCommentBtn").getAttribute("data-comment-id");
      
      // Call the editComment function with the comment ID and edited text
      editComment(commentId, editedComment);
      
      // Hide the edit comment section after editing
      document.getElementById("editCommentSection").style.display = "none";
    });
  }

  // Reference to the "comments" collection
  const commentsRef = collection(db, 'comments');

  // Query for the first 10 comments
  const initialQuery = query(commentsRef, orderBy('timestamp'), limit(10));

  // Retrieve the initial set of comments
  getDocs(initialQuery)
    .then((querySnapshot) => {
      if (!querySnapshot.empty) {
        // Display the initial set of comments
        displayComments(querySnapshot);

        // If there are more than 10 comments, show the "Load More" button
        if (querySnapshot.docs.length >= 10) {
          document.getElementById('loadMoreBtn').style.display = 'block';
        }
      } else {
        console.log('No comments found.');
      }
    })
    .catch((error) => {
      console.error('Error loading initial comments: ', error);
    });
});



// Function to display a single comment
function displayComment(commentData) {
  // Create elements for the comment
  const commentContainer = document.createElement('div');
  commentContainer.classList.add('comment-container');

  const nameElement = document.createElement('div');
  nameElement.classList.add('comment-name');
  nameElement.textContent = commentData.name;

  const textElement = document.createElement('div');
  textElement.classList.add('comment-text');
  textElement.textContent = commentData.text;

  const timestampElement = document.createElement('div');
  timestampElement.classList.add('comment-timestamp');
  timestampElement.textContent = commentData.timestamp;

  // Append elements to the comment container
  commentContainer.appendChild(nameElement);
  commentContainer.appendChild(textElement);
  commentContainer.appendChild(timestampElement);

  // Append the comment container to the comments section in the UI
  const commentsDiv = document.getElementById('comments');
  commentsDiv.appendChild(commentContainer);
}



// Function to load more comments
function loadMoreComments() {
  // Query for the next set of comments based on the number of comments already loaded
  const query = query(commentsRef, orderBy('timestamp'), startAfter(lastVisible), limit(10));

  // Retrieve the next set of comments
  getDocs(query)
      .then((querySnapshot) => {
          if (!querySnapshot.empty) {
              // Update the last visible comment for the next query
              lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];

              // Display the newly loaded comments
              querySnapshot.forEach((doc) => {
                  const commentData = doc.data();
                  // Display the comment in the UI
                  displayComment(commentData);
              });

              // If there are no more comments to load, hide the "Load More" button
              if (querySnapshot.docs.length < 10) {
                  document.getElementById('loadMoreBtn').style.display = 'none';
              }
          } else {
              console.log('No more comments to load.');
              document.getElementById('loadMoreBtn').style.display = 'none';
          }
      })
      .catch((error) => {
          console.error('Error loading more comments: ', error);
      });
}

// Event listener for the "Load More" button
document.getElementById('loadMoreBtn').addEventListener('click', loadMoreComments);




  // Reference to the "comments" collection
  const commentsRef = collection(db, 'comments');

  // Listen for changes in the "comments" collection and update the display
  onSnapshot(commentsRef, (snapshot) => {
    console.log("Comments snapshot received:", snapshot.docs.length, "comments");
    displayComments(snapshot);
  });

































