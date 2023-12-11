components.add({
  name: "homepage-link",
  public: {
    homePageLink: "/index.html",
  },
  private: {
    init: function (data) {
      let firstContainer = document.querySelector("div.container");
      if (firstContainer === null) {
        return;
      }

      let navElement = document.createElement("nav");
      navElement.appendChild(
        mainComponent.createTag("a", {
          href: data.public.homePageLink,
          title: "Home Page",
          innerHTML: "Back to Home Page",
        })
      );

      mainComponent.prependElementToContainer(navElement, firstContainer);
    },
  },
});
