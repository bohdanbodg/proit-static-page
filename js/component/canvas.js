components.add({
  name: "canvas",
  public: {
    selectors: {
      canvas: "#canvas",
      controls: {
        size: "#canvas-pen-size",
        color: "#canvas-pen-color",
        reset: "#canvas-reset",
      },
    },
    canvas: null,
    context: null,
    controls: {
      size: null,
      color: null,
      reset: null,
    },
    penSize: 10,
    penColor: "#AAAAAA",

    /**
     * @param {HTMLElement} canvas
     * @param {CanvasRenderingContext2D} context
     * @param {MouseEvent} event
     */
    onDraw: function (canvas, context, event = null) {
      if (event === null || event.buttons !== 1) {
        return;
      }

      const rect = canvas.getBoundingClientRect();
      const x =
        ((event.clientX - rect.left) / (rect.right - rect.left)) * canvas.width;
      const y =
        ((event.clientY - rect.top) / (rect.bottom - rect.top)) * canvas.height;

      context.beginPath();
      context.arc(x, y, this.penSize, 0, Math.PI * 2, false);
      context.strokeStyle = this.penColor;
      context.stroke();
    },
  },
  private: {
    init: function () {
      if (this.initCanvas()) {
        this.initControls();
      }
    },

    initCanvas: function () {
      const public = this.public;

      public.canvas = document.querySelector(public.selectors.canvas);
      if (public.canvas === null) {
        return false;
      }

      public.context = public.canvas.getContext("2d");
      if (public.context === null) {
        return false;
      }

      this.addCanvasCallback("mousedown");
      this.addCanvasCallback("mousemove");

      return true;
    },

    addCanvasCallback: function (eventType) {
      const public = this.public;

      public.canvas.addEventListener(eventType, (e) => {
        public.onDraw(public.canvas, public.context, e);
      });
    },

    initControls: function () {
      const public = this.public;

      this.addControlCallbacks(
        "size",
        (element) => {
          element.value = public.penSize.toString();
          element.title = public.penSize.toString();
        },
        "change",
        (element) => {
          public.penSize = parseInt(element.value);
          element.title = public.penSize.toString();
        }
      );

      this.addControlCallbacks(
        "color",
        (element) => {
          element.value = public.penColor;
          element.title = public.penColor;
        },
        "change",
        (element) => {
          public.penColor = element.value;
          element.title = public.penColor;
        }
      );

      this.addControlCallbacks("reset", null, "click", () =>
        public.context.clearRect(
          0,
          0,
          public.canvas.width,
          public.canvas.height
        )
      );
    },

    addControlCallbacks: function (
      name,
      initCallback,
      eventType,
      eventCallback
    ) {
      const public = this.public;

      const control = document.querySelector(public.selectors.controls[name]);
      if (control === null) {
        return;
      }

      public.controls[name] = control;

      if (initCallback !== null) {
        initCallback(control);
      }

      control.addEventListener(
        eventType,
        (event) => eventCallback(control, event),
        false
      );
    },
  },
});
