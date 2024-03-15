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
        translateY: '0px',
        duration: 300,
        easing: 'easeOutQuad'
      });
      menuOpened = true;
    } else {
      anime({
        targets: '.dropdown-menu',
        opacity: 0,
        translateY: '-10px',
        duration: 300,
        easing: 'easeOutQuad',
        complete: function() {
          dropdownMenu.style.display = 'none';
        }
      });
      menuOpened = false;
    }
  });
});

