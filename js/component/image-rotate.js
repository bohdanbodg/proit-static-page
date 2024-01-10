components.add({
  name: "image-rotate",
  private: {
    canvas: null,
    context: null,
    image: null,
    imageLoaded: false,
    imageAnimated: false,
    K: 1.5,
    degree: 0,
    imageFilename: "image.png",

    init: function () {
      const self = this;

      this.canvas = document.getElementById("canvas");
      this.context = this.canvas.getContext("2d");

      this.base.addScript("/js/lib/reimg.js");

      document
        .getElementById("imageFile")
        .addEventListener("change", function (event) {
          self.imageLoaded = false;
          self.imageAnimated = false;

          const tgt = event.target || window.event.srcElement,
            files = tgt.files;

          // FileReader support
          if (FileReader && files && files.length) {
            const fr = new FileReader();
            fr.onload = function () {
              self.emplaceImage(fr.result, files[0]);
            };

            fr.readAsDataURL(files[0]);
          }
        });

      document
        .getElementById("rotationAngle")
        .addEventListener("input", function () {
          self.degree = parseInt(this.value);

          if (!self.imageLoaded || !self.imageAnimated) {
            return;
          }

          self.processRotate();
        });

      document
        .getElementById("saveImage")
        .addEventListener("click", function () {
          if (!self.imageLoaded) {
            alert("Upload image please!");

            return;
          }

          if (!self.imageAnimated) {
            return;
          }

          self.saveImage();
        });
    },

    emplaceImage: function (src, file) {
      const self = this;

      this.imageFilename = file.name;

      this.image = new Image();
      this.image.src = src;
      this.image.onload = function () {
        self.imageLoaded = true;

        const size = Math.max(this.width, this.height) * self.K;
        self.canvas.width = size;
        self.canvas.height = size;

        cl("image loaded", [self.image]);

        self.animateImage();
        self.processRotate();
      };
    },

    animateImage: function () {
      const self = this;

      const initDegree = this.degree;
      const interval = setInterval(function () {
        self.degree += 5;

        if (self.degree > initDegree + 360) {
          self.imageAnimated = true;
          self.degree = initDegree;

          clearInterval(interval);
        }

        self.processRotate();
      }, 1);
    },

    saveImage: function () {
      const filename = `rotated.${this.degree}deg.${this.imageFilename}`;

      ReImg.fromCanvas(this.canvas).downloadPng(filename);
    },

    processRotate: function () {
      // c = canvas, i = image
      // w = width, h = height
      const cw = this.canvas.width,
        ch = this.canvas.height;
      const iw = this.image.width,
        ih = this.image.height;

      this.context.save();
      this.context.clearRect(0, 0, cw, ch);

      if (this.imageLoaded) {
        const canvasMaxSize = Math.max(cw, ch);
        const imageDiagonal = this.calcDiagonal(iw, ih);

        const scale = canvasMaxSize / this.K / imageDiagonal;
        const ix = -iw / 2;
        const iy = -ih / 2;

        this.context.translate(cw / 2, ch / 2);
        this.context.rotate((this.degree * Math.PI) / 180);
        this.context.scale(scale, scale);

        this.context.drawImage(this.image, ix, iy, iw, ih);
      }

      this.context.restore();
    },

    calcDiagonal: function (width, height) {
      return Math.sqrt(Math.pow(width, 2) + Math.pow(height, 2));
    },
  },
});
