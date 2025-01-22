import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";
import { getFirestore, collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js";

// Your web app's Firebase configuration


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
const auth = getAuth(app);

// Function to handle form submission
document.getElementById("uploadForm").addEventListener("submit", async (e) => {
    e.preventDefault(); // Prevent default form submission

    // Get form values
    const title = document.getElementById("title").value;
    const content = document.getElementById("content").value;
    const author = document.getElementById("author").value;

    try {
        // Add article data to Firestore
        await addDoc(collection(firestore, "articles"), {
            title: title,
            content: content,
            author: author,
            timestamp: new Date().getTime() // Adding timestamp for sorting purposes
        });

        // Reset form after successful upload
        document.getElementById("uploadForm").reset();
        alert("Article uploaded successfully!");
    } catch (error) {
        console.error("Error uploading article: ", error);
        alert("An error occurred while uploading the article. Please try again later.");
    }
});


const articlesContainer = document.getElementById('articles');

// Function to fetch articles from Firestore and display them
const displayArticles = async () => {
  try {
    const querySnapshot = await getDocs(collection(firestore, 'articles'));
    articlesContainer.innerHTML = ''; // Clear previous articles

    querySnapshot.forEach(doc => {
      const articleData = doc.data();
      const articleHTML = `
        <div class="animate__animated animate__fadeIn">
        <div class="article news_article_s_side">
          <h3 class="font-bold " id="news_article_s_side_headline" >${articleData.title}</h3>
          <p class="text-muted " id="news_article_s_side_authorName">Author: ${articleData.author}</p>
          <p id="news_article_s_side_content">${articleData.content}</p>
          
        </div>
        </div>
      `;
      articlesContainer.innerHTML += articleHTML;
    });
  } catch (error) {
    console.error('Error fetching articles:', error);
  }
};

// Call the function to display articles when the page loads
window.addEventListener('load', displayArticles);
