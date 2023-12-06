new Object({
  init: function () {
    let firstContainer = document.querySelector("body div.container");
    if (firstContainer === null) {
      return this;
    }

    let backHomeLink = document.createElement("a");
    backHomeLink.appendChild(document.createTextNode("Back to Home Page"));
    backHomeLink.title = "Home Page";
    backHomeLink.href = "/index.html";

    let navElement = document.createElement("nav");
    navElement.appendChild(backHomeLink);

    firstContainer.insertBefore(navElement, firstContainer.firstChild);

    return this;
  },
}).init();
