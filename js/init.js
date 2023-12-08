Object.prototype.oforEach = function (callback) {
  for (const [key, value] of Object.entries(this)) {
    callback(value, key);
  }
};

var globalComponent = {
  name: "init",

  pageTitle: "ProIT Static Page",

  styles: [
    {
      href: "https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css",
      attributes: {
        integrity:
          "sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN",
        crossorigin: "anonymous",
      },
    },
  ],
  scripts: [],
  components: {},

  init: function () {
    this.initPageTitle();

    this.loadStyles(this.styles);
    this.loadScripts(this.scripts);
    this.loadComponents("components");

    return this;
  },

  initPageTitle: function () {
    if (document.title.includes(this.pageTitle)) {
      return;
    }

    document.title = `${document.title} - ${this.pageTitle}` + " (DEV)"; // TODO dev indicator
  },

  getComponentPath: function (component) {
    return `js/${component}.js`;
  },

  addComponent: function (componentObject) {
    if (
      typeof componentObject.name === "undefined" ||
      componentObject.name in this.components
    ) {
      return;
    }

    this.components[componentObject.name] =
      typeof componentObject.init === "undefined"
        ? componentObject
        : componentObject.init();
  },

  readComponents: function (attributeName) {
    const script = document.querySelector(`script[${attributeName}]`);
    if (
      script === null ||
      !script.src.endsWith(this.getComponentPath(this.name))
    ) {
      return [];
    }

    const components = script.getAttribute(attributeName);
    if (components === null) {
      return [];
    }

    return components.split(";");
  },

  loadComponents: function (componentsAttribute) {
    const components = this.readComponents(componentsAttribute);

    if (components.length === 0) {
      console.info("No components found.");

      return;
    }

    const self = this;
    components.forEach(function (component) {
      if (component === self.name) {
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
    this.loadHeadData("Styles", "link", styles, {
      rel: "stylesheet",
    });
  },

  loadScripts: function (scripts) {
    this.loadHeadData("Scripts", "script", scripts);
  },

  loadHeadData: function (name, tag, data, defaultData = null) {
    if (!Array.isArray(data) || data.length === 0) {
      console.info(`No ${name} found.`);

      return;
    }

    data.forEach(function (entry) {
      let tagElement = document.createElement(tag);

      if (defaultData !== null && typeof defaultData === "object") {
        defaultData.oforEach(function (defaultValue, defaultKey) {
          tagElement[defaultKey] = defaultValue;
        });
      }

      entry.oforEach(function (value, key) {
        tagElement[key] = value;
      });

      entry.attributes.oforEach(function (attributeValue, attributeKey) {
        tagElement.setAttribute(attributeKey, attributeValue);
      });

      document.head.appendChild(tagElement);
    });

    console.info(
      `${name.charAt(0).toUpperCase() + name.slice(1)} have been loaded.`
    );
  },
}.init();
