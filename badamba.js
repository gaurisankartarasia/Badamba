// hamburger menu

document.addEventListener('DOMContentLoaded', function() {
  const toggleButton = document.querySelector('.dropdown-toggle');
  const dropdownMenu = document.querySelector('.dropdown-menu');
  let menuOpened = false;

  toggleButton.addEventListener('click', function() {
    if (!menuOpened) {
      dropdownMenu.style.display = 'block';
      anime({
        targets: '.dropdown-menu',
        opacity: 1,
        translateY: '10px',
        duration: 900,
        // easing: 'easeInOutBounce'
      });
      menuOpened = true;
    } else {
      anime({
        targets: '.dropdown-menu',
        opacity: 0,
        translateY: '0px',
        duration: 900,
        // easing: 'easeOutCubic',
        complete: function() {
          dropdownMenu.style.display = 'none';
        }
      });
      menuOpened = false;
    }
  });
});


// search

document.addEventListener("DOMContentLoaded", function() {
  const searchInput = document.getElementById("searchInput");
  const searchIcon = document.getElementById("searchIcon");
  const userList = document.getElementById("userList");
  const closeBtn = document.getElementById("closeBtn");
  
  // Toggle search box and user list on search icon click
  searchIcon.addEventListener("click", function() {
    searchInput.classList.toggle("d-none");
    userList.classList.toggle("d-none");
    closeBtn.classList.toggle("d-none");
  });
  
  // Toggle user list on search input focus
  searchInput.addEventListener("focus", function() {
    userList.classList.remove("d-none");
    closeBtn.classList.remove("d-none");
  });

  // Close user list on close button click
  closeBtn.addEventListener("click", function() {
    searchInput.value = ""; // Clear the search input
    userList.classList.add("d-none");
    closeBtn.classList.add("d-none");
  });
});

// dark mode
const darkModeBtn = document.getElementById('dark-mode');
const lightModeBtn = document.getElementById('light-mode');
const body = document.body;

darkModeBtn.addEventListener('click', () => {
  body.classList.add('dark-mode');
});

lightModeBtn.addEventListener('click', () => {
  body.classList.remove('dark-mode');
});

// animation on scroll
