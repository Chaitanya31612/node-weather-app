const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");
const messageThree = document.querySelector("#message-3");

weatherForm.addEventListener("submit", e => {
  e.preventDefault();

  messageThree.textContent = "";
  messageOne.textContent = "Loading...";
  messageTwo.textContent = "";
  const location = search.value;
  fetch("/weather?address=" + location).then(res => {
    res.json().then(data => {
      if (data.error) {
        messageOne.textContent = "";
        messageTwo.textContent = "";
        messageThree.textContent = data.error;
      } else {
        messageThree.textContent = "";
        messageOne.textContent = data.location;
        messageTwo.textContent = data.forecast;
      }
    });
  });
});
