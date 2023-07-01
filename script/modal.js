const modal = document.getElementById('modal');
const closeButton = document.querySelector('.close');

window.addEventListener('DOMContentLoaded', () => {
  modal.classList.add('show');
});

closeButton.addEventListener('click', () => {
  modal.classList.remove('show');
});
