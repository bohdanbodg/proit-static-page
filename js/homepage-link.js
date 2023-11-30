pageInitCallbacks.push(initBackToHomepageLink);

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
