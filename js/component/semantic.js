components.add({
  name: "semantic",
  deps: ["page-title"],
  public: {
    copyright: "2024 Bohdan",
  },
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
        `<header class="sticky-top bg-light bg-opacity-75 text-dark shadow-sm border glass-effect">
          <nav class="nav nav-underline">
            <div class="container">
              <div class="row">
                <div class="col-auto align-self-center me-3">
                  <a class="navbar-brand h1 fs-4" href="#">${pageTitle.shortTitle}</a>
                </div>
                <div class="col-auto">
                  <a class="nav-link link-dark" href="/index.html">Home</a>
                </div>
              </div>
            </div>
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
        ["container", "mt-4", "mb-5"]
      );

      main.innerHTML = document.body.innerHTML;
      document.body.innerHTML = main.outerHTML;

      document.querySelectorAll("[autofocus]").forEach((el) => el.focus());

      const hashtag = window.location.hash ?? "";
      if (hashtag.length !== 0) {
        const el = document.querySelector(hashtag);
        if (el !== null) {
          el.scrollIntoView();
        }
      }
    },

    initFooter: function () {
      document.body.insertAdjacentHTML(
        "beforeend",
        `<footer class="bg-body-tertiary border-top">
            <nav class="nav">
              <div class="container">
                <div class="row py-4">
                  <div class="col-auto px-4">
                    <h5>Links</h5>
                    <a class="nav-link link-secondary px-0 pt-0" href="/forms.html#contact-us">
                      Contact Us
                    </a>
                  </div>
                </div>
                <div class="row py-2 text-body-tertiary text-center opacity-50">
                  <div class="col">&copy; ${this.public.copyright}</div>
                </div>
              </div>
            </nav>
        </footer>`
      );
    },
  },
});
