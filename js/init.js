// Implementing a short form method for iterating through object entries
Object.prototype.oforEach = function (callback) {
  for (const [key, value] of Object.entries(this)) {
    callback(value, key);
  }
};

var globalComponent = {
  name: "init",

  pageTitle: "ProIT Static Page",
  pageOriginalTitle: null,

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
  scripts: [
    {
      src: "https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js",
      attributes: {
        integrity:
          "sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL",
        crossorigin: "anonymous",
      },
    },
  ],
  components: {},

  init: function () {
    this.initPageTitle();

    this.loadStyles(this.styles);
    this.loadScripts(this.scripts);
    this.loadComponents("components");

    return this;
  },

  initPageTitle: function () {
    const title = document.title;
    if (title.includes(this.pageTitle)) {
      return;
    }

    document.title =
      `${(this.pageOriginalTitle = title)} - ${this.pageTitle}` + " (DEV)"; // TODO: Remove dev indicator before release deploy
  },

  getComponentPath: function (component) {
    // Build the component path
    return `js/${component}.js`;
  },

  addComponent: function (componentObject) {
    // Don't add the component if it doesn't have name or was already added
    if (
      typeof componentObject.name === "undefined" ||
      componentObject.name in this.components
    ) {
      return;
    }

    // Add the component object and initialize if it has an initialization method
    this.components[componentObject.name] =
      typeof componentObject.init === "undefined"
        ? componentObject
        : componentObject.init();
  },

  readComponents: function (attributeName, separator = ";") {
    // Get the global component script
    const script = document.querySelector(`script[${attributeName}]`);
    if (
      script === null ||
      !script.src.endsWith(this.getComponentPath(this.name))
    ) {
      return [];
    }

    // Read components from the attribute
    const components = script.getAttribute(attributeName);
    if (components === null) {
      return [];
    }

    return components.split(separator);
  },

  loadComponents: function (componentsAttribute) {
    const components = this.readComponents(componentsAttribute);

    if (components.length === 0) {
      console.info("No components found.");

      return;
    }

    const self = this;
    components.forEach(function (component) {
      // Avoid an attempt of loading the global component since it is already loaded on the beggining
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

  /**
   * Create and append the element to the page head container
   *
   * @param {String} name
   * @param {String} tag
   * @param {Array} data
   * @param {Object} defaultData
   * @returns
   */
  loadHeadData: function (name, tag, data, defaultData = null) {
    if (!Array.isArray(data) || data.length === 0) {
      console.info(`No ${name} found.`);

      return;
    }

    data.forEach(function (entry) {
      let tagElement = document.createElement(tag);

      // Set the element default data
      if (defaultData !== null && typeof defaultData === "object") {
        defaultData.oforEach(function (defaultValue, defaultKey) {
          tagElement[defaultKey] = defaultValue;
        });
      }

      // Set the element main data
      entry.oforEach(function (value, key) {
        tagElement[key] = value;
      });

      // Set the element attribute data
      entry.attributes.oforEach(function (attributeValue, attributeKey) {
        tagElement.setAttribute(attributeKey, attributeValue);
      });

      document.head.appendChild(tagElement);
    });

    // Capitalize first letter and output the message to the console
    console.info(
      `${name.charAt(0).toUpperCase() + name.slice(1)} have been loaded.`
    );
  },
}.init();
