// const form = document.querySelector("form");

// form.addEventListener("submit",(event) => {
//   event.preventDefault();
//   const username = document.getElementById("name").value.trim();
//   const password = document.getElementById("password").value.trim();

//   document.getElementById("name-error").textContent = '';
//   document.getElementById("password-error").textContent = '';

//   const isValid = true;

//   if(username === ''){
//     document.getElementById("name-error").textContent = "Please enter your name";
//     isValid = false;
//   }else if(password === ''){
//     document.getElementById("password-error").textContent = "Please enter password";
//     isValid = false;
//   }

//   if(!isValid){
//     form.submit();
//   }
// });