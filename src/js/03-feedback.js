import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
const emailInput = document.querySelector('input[name="email"]');
const messageInput = document.querySelector('textarea[name="message"]');
const storageKey = 'feedback-form-state';

form.addEventListener('input', throttle(saveFormState, 500));
form.addEventListener('submit', handleSubmit);

loadFormState();

function saveFormState() {
  const formState = {
    email: emailInput.value,
    message: messageInput.value,
  };
  localStorage.setItem(storageKey, JSON.stringify(formState));
}

function loadFormState() {
  const savedState = localStorage.getItem(storageKey);
  if (savedState) {
    const formState = JSON.parse(savedState);
    emailInput.value = formState.email;
    messageInput.value = formState.message;
  }
}

function handleSubmit(event) {
  event.preventDefault();
  const formState = {
    email: emailInput.value,
    message: messageInput.value,
  };
  console.log('submit:', formState);
  localStorage.removeItem(storageKey);
  form.reset();
}