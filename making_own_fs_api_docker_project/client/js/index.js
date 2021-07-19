const usernameField = document.querySelector('#login-username');
const passwordField = document.querySelector('#login-password');
const submitbtn = document.querySelector('#submitbtn');
const form = document.querySelector('form');

form.addEventListener('submit', requestUserLogin);

async function requestUserLogin(e) {
  e.preventDefault();
  const userLoginData = {
    username: e.target.loginuname.value,
    password: e.target.loginpword.value,
  };
  const options = {
    method: 'POST',
    header: 'content-type: application/json',
    body: JSON.stringify(userLoginData),
  };

  const data = await fetch(`http://localhost:5000/login`, options);
  const userInfo = await data.json();
  console.log(userInfo);
}

function renderRegisterForm() {
  const fields = [
    { tag: 'input', attributes: { type: 'text', name: 'username', placeholder: 'Enter your username' } },
    { tag: 'input', attributes: { type: 'citizenship', name: 'citizenship', placeholder: 'Enter your citizenship' } },
    { tag: 'input', attributes: { type: 'email', name: 'email', placeholder: 'Email' } },
    { tag: 'input', attributes: { type: 'password', name: 'password', placeholder: 'Password' } },
    { tag: 'input', attributes: { type: 'password', name: 'passwordConfirmation', placeholder: 'Confirm Password' } },
    { tag: 'input', attributes: { type: 'submit', value: 'Create Account' } },
  ];
  const form = document.createElement('form');
  fields.forEach((f) => {
    let field = document.createElement(f.tag);
    Object.entries(f.attributes).forEach(([a, v]) => {
      field.setAttribute(a, v);
      form.appendChild(field);
    });
  });
  form.addEventListener('submit', requestRegistration);
  main.appendChild(form);
}
