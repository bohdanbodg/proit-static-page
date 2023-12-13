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

var components = {
  base: { name: "base" },
  vault: {
    entities: {},
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

    entity.deps = entity.deps ?? [];

    entity.public = entity.public ?? {};
    entity.public.name = name;
    entity.public.deps = entity.deps;
    entity.public.base = this.base;
    this.vault.entities[name] = entity.public;

    if (name === this.base.name) {
      Object.assign(this.base, entity.public);
    }

    entity.private = entity.private ?? {};
    entity.private.name = name;
    entity.private.deps = entity.deps;
    entity.private.base = this.base;
    entity.private.public = entity.public;

    const originalInit = entity.private.init ?? null;
    entity.private.init = function () {
      const args = { component: this.public };

      components.invokeCallbacks("component.deps.load", "before", args);
      this.base.loadDependencies(name);
      components.invokeCallbacks("component.deps.load", "after", args);

      if (originalInit !== null) {
        components.invokeCallbacks("component.init", "before", args);
        originalInit.call(this);
        components.invokeCallbacks("component.init", "after", args);
      }
    };

    entity.private.init();
  },

  /**
   * @param {string} name
   * @param {string} hookType
   * @return {boolean}
   */
  hasAnyCallback: function (name, hookType) {
    return (
      name in this.vault.callbacks &&
      hookType in this.vault.callbacks[name] &&
      Array.isArray(this.vault.callbacks[name][hookType]) &&
      this.vault.callbacks[name][hookType].length > 0
    );
  },

  /**
   * @param {string} name
   * @param {string} hookType
   * @param {Function} callback
   */
  addCallback: function (name, hookType, callback) {
    if (!["before", "after"].includes(hookType)) {
      return;
    }

    if (!(name in this.vault.callbacks)) {
      this.vault.callbacks[name] = {};
    }

    if (
      !(hookType in this.vault.callbacks[name]) ||
      !Array.isArray(this.vault.callbacks[name][hookType])
    ) {
      this.vault.callbacks[name][hookType] = [];
    }

    this.vault.callbacks[name][hookType].push(callback);
  },

  /**
   * @param {string} name
   * @param {string} hookType
   * @param {Object} args
   */
  invokeCallbacks: function (name, hookType, args = {}) {
    if (this.hasAnyCallback(name, hookType)) {
      this.vault.callbacks[name][hookType].forEach((callback) =>
        callback.call(null, args)
      );
    }
  },
};

// === Adding base component ===

components.add({
  name: components.base.name,
  deps: ["bootstrap", "styles", "page-title", "semantic"],
  public: {
    /**
     * @param {Object} data
     * @param {Object} attributes
     * @return {HTMLElement}
     */
    addStyle: function (data, attributes = {}) {
      attributes.rel = "stylesheet";

      return this.appendTagToHead("link", data, attributes);
    },

    /**
     * @param {Object} data
     * @param {Object} attributes
     * @return {HTMLElement}
     */
    addScript: function (data, attributes = {}) {
      attributes.type = "text/javascript";

      return this.appendTagToHead("script", data, attributes);
    },

    /**
     * @param {string} tag
     * @param {Object} data
     * @param {Object} attributes
     * @return {HTMLElement}
     */
    appendTagToHead: function (tag, data, attributes = {}) {
      return document.head.appendChild(this.createTag(tag, data, attributes));
    },

    /**
     * @param {string} tag
     * @param {Object} data
     * @param {Object} attributes
     * @param {Array} classes
     * @return {HTMLElement}
     */
    createTag: function (tag, data = {}, attributes = {}, classes = []) {
      let tagElement = document.createElement(tag);

      if (data.olength() > 0) {
        data.oforEach((value, key) => (tagElement[key] = value));
      }

      if (attributes.olength() > 0) {
        attributes.oforEach((value, key) =>
          tagElement.setAttribute(key, value)
        );
      }

      if (classes.length > 0) {
        tagElement.classList.add(...classes);
      }

      return tagElement;
    },

    /**
     * @return {string}
     */
    getCurrentHTML: function () {
      return window.location.pathname.split("/").pop();
    },

    /**
     * @param {string} componentName
     */
    loadDependencies: function (componentName) {
      const component = components.get(componentName);
      if (component === null || component.deps.length === 0) {
        return;
      }

      const self = this;
      component.deps.forEach((dependency) => self.loadComponent(dependency));
    },

    /**
     * @param {string} name
     */
    loadComponent: function (name) {
      if (components.has(name)) {
        return;
      }

      this.addScript({
        src: components.getPath(name),
        async: false,
        defer: true,
      });
    },
  },
  private: {
    init: function () {
      this.loadComponents(this.readComponents("components"));
    },

    loadComponents: function (names) {
      const public = this.public;
      names.forEach((name) => public.loadComponent(name));
    },

    readComponents: function (attributeName, separator = ";") {
      const script = document.head.querySelector(`script[${attributeName}]`);
      if (script === null) {
        return [];
      }

      const names = script.getAttribute(attributeName);
      if (names === null) {
        return [];
      }

      return names.split(separator);
    },
  },
});
