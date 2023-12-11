// === Implementing short form methods ===

Object.prototype.oforEach = function (callback) {
  for (const [key, value] of Object.entries(this)) {
    callback(value, key);
  }
};

Object.prototype.olength = function () {
  return Object.keys(this).length;
};

var cl = console.log;

// === Implementing component system ===

var mainComponentName = "main";
var initCallbackName = "init";

var components = {
  vault: {
    entities: {},
    dependencies: {},
    callbacks: {},
  },

  /**
   * @param {string} name
   * @return {string}
   */
  getPath: function (name) {
    return `js/component/${name}.js`;
  },

  /**
   * @return {number}
   */
  count: function () {
    return this.vault.entities.olength();
  },

  /**
   * @param {string} name
   * @return {boolean}
   */
  has: function (name) {
    return name in this.vault.entities;
  },

  /**
   * @param {string} name
   * @return {Object|null}
   */
  get: function (name) {
    return this.vault.entities[name] ?? null;
  },

  /**
   * @param {Object} entity
   * @return
   */
  add: function (entity) {
    const name = entity.name ?? null;
    if (name === null || this.has(name)) {
      return;
    }

    this.vault.dependencies[name] = entity.dependencies ?? [];

    const public = entity.public ?? {};
    this.vault.entities[name] = public;

    const private = entity.private ?? null;
    if (private !== null) {
      this.addCallback(initCallbackName, name, function () {
        private.init({
          name: name,
          public: public,
          deps: components.getDependencies(name),
        });

        delete components.vault.callbacks[initCallbackName][name];
      });

      if (name === mainComponentName) {
        this.invokeCallback(initCallbackName, name);
      }
    }
  },

  /**
   * @param {string} name
   * @return {Array}
   */
  getDependencies: function (name) {
    return this.vault.dependencies[name] ?? [];
  },

  /**
   *
   * @param {string} type
   * @return {Object}
   */
  getCallbacks: function (type) {
    return this.vault.callbacks[type] ?? {};
  },

  /**
   * @param {string} type
   * @param {string} name
   * @param {Function} callback
   */
  addCallback: function (type, name, callback) {
    if (typeof this.vault.callbacks[type] === "undefined") {
      this.vault.callbacks[type] = {};
    }

    if (name in this.vault.callbacks[type]) {
      return;
    }

    this.vault.callbacks[type][name] = callback;
  },

  /**
   * @param {string} type
   * @param {string} name
   */
  invokeCallback: function (type, name) {
    if (type in this.vault.callbacks && name in this.vault.callbacks[type]) {
      this.vault.callbacks[type][name]();
    }
  },
};

// === Adding the main component ===

components.add({
  name: mainComponentName,
  dependencies: ["page-title", "bootstrap"],
  public: {
    /**
     * @param {Object} data
     * @param {Object} attributes
     */
    addStyle: function (data, attributes = {}) {
      this.appendTagToHead(
        "link",
        data,
        Object.assign(attributes, {
          rel: "stylesheet",
        })
      );
    },

    /**
     * @param {Object} data
     * @param {Object} attributes
     */
    addScript: function (data, attributes = {}) {
      this.appendTagToHead(
        "script",
        data,
        Object.assign(attributes, {
          type: "text/javascript",
        })
      );
    },

    /**
     * @param {string} tag
     * @param {Object} data
     * @param {Object} attributes
     */
    appendTagToHead: function (tag, data, attributes = {}) {
      document.head.appendChild(this.createTag(tag, data, attributes));
    },

    /**
     * @param {HTMLElement} element
     * @param {HTMLElement} container
     */
    prependElementToContainer: function (element, container) {
      container.insertBefore(element, container.firstChild);
    },

    /**
     *
     * @param {string} tag
     * @param {Object} data
     * @param {Object} attributes
     * @param {Array} classes
     * @return {HTMLElement}
     */
    createTag: function (tag, data = {}, attributes = {}, classes = []) {
      let tagElement = document.createElement(tag);

      if (data.olength() > 0) {
        data.oforEach(function (value, key) {
          tagElement[key] = value;
        });
      }

      if (attributes.olength() > 0) {
        attributes.oforEach(function (value, key) {
          tagElement.setAttribute(key, value);
        });
      }

      if (classes.length > 0) {
        tagElement.classList.add(...classes);
      }

      return tagElement;
    },
  },
  private: {
    public: null,

    init: function (data) {
      this.public = data.public;

      this.loadDependencies(data.name);
      this.loadComponents(this.readComponents("components"));
    },

    loadDependencies: function (componentName) {
      const dependencies = components.getDependencies(componentName);
      if (dependencies.length === 0) {
        return;
      }

      const self = this;
      dependencies.forEach(function (dependency) {
        self.loadComponent(dependency);
      });
    },

    loadComponents: function (componentNames) {
      const self = this;
      componentNames.forEach(function (componentName) {
        self.loadComponent(componentName);
      });
    },

    loadComponent: function (componentName) {
      if (components.has(componentName)) {
        return;
      }

      const self = this;
      this.public.addScript({
        src: components.getPath(componentName),
        onload: function () {
          components.invokeCallback(initCallbackName, componentName);

          self.loadDependencies(componentName);
        },
      });
    },

    readComponents: function (attributeName, separator = ";") {
      const script = document.head.querySelector(`script[${attributeName}]`);
      if (script === null) {
        return [];
      }

      const componentNames = script.getAttribute(attributeName);
      if (componentNames === null) {
        return [];
      }

      return componentNames.split(separator);
    },
  },
});

var mainComponent = components.get(mainComponentName);
