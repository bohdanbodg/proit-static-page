new Object({
  init: function () {
    this.loadStyles([
      {
        url: "https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/css/bootstrap.min.css",
        attributes: {
          integrity:
            "sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T",
          crossorigin: "anonymous",
        },
      },
    ]);

    const self = this;
    document.addEventListener("DOMContentLoaded", function () {
      self.initTitle();
      self.loadComponents();

      console.info("Page has been loaded.");
    });

    return this;
  },

  initTitle: function () {
    const name = "ProIT Static Page";
    if (document.title.includes(name)) {
      return;
    }

    document.title = `${document.title} - ${name}` + " (DEV)"; // TODO dev indicator
  },

  getComponentPath: function (component) {
    return `js/${component}.js`;
  },

  getComponents: function (attributeName) {
    const script = document.querySelector(`script[${attributeName}]`);
    if (
      script === null ||
      !script.src.endsWith(this.getComponentPath("init"))
    ) {
      return [];
    }

    const components = script.getAttribute(attributeName);
    if (components === null) {
      return [];
    }

    return components.split(";");
  },

  loadComponents: function () {
    const components = this.getComponents("components");

    if (components.length === 0) {
      console.info("No components found.");

      return;
    }

    const self = this;
    components.forEach(function (component) {
      if (component === "init") {
        return;
      }

      let scriptElement = document.createElement("script");
      scriptElement.src = self.getComponentPath(component);
      scriptElement.type = "text/javascript";

      document.head.appendChild(scriptElement);
    });

    console.info("Components have been loaded.");
  },

  loadStyles: function (styles) {
    styles.forEach(function (style) {
      let styleElement = document.createElement("link");
      styleElement.href = style.url;
      styleElement.rel = "stylesheet";

      for (const [key, value] of Object.entries(style.attributes)) {
        styleElement.setAttribute(key, value);
      }

      document.head.appendChild(styleElement);
    });

    console.info("Styles have been loaded.");
  },
}).init();