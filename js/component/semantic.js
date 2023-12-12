components.add({
  name: "semantic",
  dependencies: ["bootstrap"],
  private: {
    init: function () {
      this.initMain();
      this.initHeader();
      this.initFooter();
    },

    initHeader: function () {
      document.body.insertAdjacentHTML(
        "afterbegin",
        `<header class="sticky-top shadow-sm">
            <nav class="nav nav-underline bg-body-tertiary px-3">
                <a class="nav-link" href="/index.html">Home</a>
            </nav>
        </header>`
      );
    },

    initMain: function () {
      const main = mainComponent.createTag(
        "main",
        {},
        {
          style: "min-height: 90vh",
        },
        ["container", "mx-1", "my-3"]
      );

      main.innerHTML = document.body.innerHTML;
      document.body.innerHTML = main.outerHTML;

      document.querySelectorAll("[autofocus]").forEach((el) => el.focus());
    },

    initFooter: function () {
      document.body.insertAdjacentHTML(
        "beforeend",
        `<footer>
            <nav class="nav bg-body-tertiary">
                <a class="nav-link link-secondary" href="/forms.html#contact-us">
                    Contact Us
                </a>
            </nav>
            <div class="bg-dark text-light text-center py-2">&copy; 2023 Bohdan</div>
        </footer>`
      );
    },
  },
});
