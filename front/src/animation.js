const sign_up_btn = document.querySelector("#sign-up-btn");
const sign_in_btn = document.querySelector("#sign-in-btn");
const container = document.querySelector(".container");

sign_in_btn.addEventListener("click", () => {
  container.classList.add("sign-in-mode");
});

sign_up_btn.addEventListener("click", () => {
  container.classList.remove("sign-in-mode");
})

const checkbox = document.querySelector('.checkbox-default');
const checkboxText = document.querySelector('.checkbox-text');

checkbox.addEventListener('change', function() {
  if (this.checked) {
    checkboxText.style.color = '#5D13E7';
  } else {
    checkboxText.style.color = '#5D13E759';
  }
});