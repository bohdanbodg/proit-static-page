components.add({
  name: "semantic",
  deps: ["bootstrap", "page-title"],
  private: {
    init: function () {
      this.initMain();
      this.initHeader();
      this.initFooter();
    },

    initHeader: function () {
      const pageTitle = components.get("page-title");

      document.body.insertAdjacentHTML(
        "afterbegin",
        `<header class="sticky-top shadow-sm">
          <nav class="nav nav-underline bg-body-tertiary px-2">
            <a class="navbar-brand align-self-center h1 mb-0 mx-1 fs-4" href="#">
              ${pageTitle.shortTitle}
            </a>
            <a class="nav-link" href="/index.html">Home</a>
          </nav>
        </header>`
      );
    },

    initMain: function () {
      const main = this.base.createTag(
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
