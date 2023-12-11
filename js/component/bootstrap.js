components.add({
  name: "bootstrap",
  public: {
    version: "5.3.2",
  },
  private: {
    resources: {
      css: {
        filename: "css/bootstrap.min.css",
        integrity:
          "sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN",
      },
      js: {
        filename: "js/bootstrap.bundle.min.js",
        integrity:
          "sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL",
      },
    },

    init: function (data) {
      mainComponent.addStyle(
        {
          href: this.getUrl(data.public.version, this.resources.css.filename),
        },
        this.getAttributes(this.resources.css.integrity)
      );
      mainComponent.addScript(
        {
          src: this.getUrl(data.public.version, this.resources.js.filename),
        },
        this.getAttributes(this.resources.js.integrity)
      );
    },

    getUrl: function (version, filename) {
      return `https://cdn.jsdelivr.net/npm/bootstrap@${version}/dist/${filename}`;
    },

    getAttributes: function (integrity) {
      return {
        integrity: integrity,
        crossorigin: "anonymous",
      };
    },
  },
});
