document.addEventListener("DOMContentLoaded", onInit);

function onInit() {
  initTitle();
  initBackToHomepageLink();

  console.log("Page is initialized!");
}

function initTitle() {
  const name = "ProIT Static Page";
  if (document.title.includes(name)) {
    return;
  }

  document.title = `${document.title} - ${name}` + " (DEV)"; // TODO dev indicator
}

function initBackToHomepageLink() {
  let firstNav = document.querySelector("body nav");
  if (firstNav === null) {
    return;
  }

  let backHomeLink = document.createElement("a");
  backHomeLink.appendChild(document.createTextNode("Back to Home Page"));
  backHomeLink.title = "Home Page";
  backHomeLink.href = "/index.html";

  firstNav.insertBefore(backHomeLink, firstNav.firstChild);
}
