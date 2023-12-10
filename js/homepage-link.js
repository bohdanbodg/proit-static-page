globalComponent.addComponent({
  name: "homepage-link",

  homePageLink: "/index.html",

  init: function () {
    let firstContainer = document.querySelector("body div.container");
    if (firstContainer === null) {
      return this;
    }

    // Create an anchor HTML element
    let backHomeLink = document.createElement("a");
    backHomeLink.appendChild(document.createTextNode("Back to Home Page"));
    backHomeLink.title = "Home Page";
    backHomeLink.href = this.homePageLink;

    // Create a navigation HTML element and append the anchor element
    let navElement = document.createElement("nav");
    navElement.appendChild(backHomeLink);

    // Prepend the navigation element to the first container
    firstContainer.insertBefore(navElement, firstContainer.firstChild);

    return this;
  },
});
