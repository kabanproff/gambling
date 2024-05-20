(() => {
  function browserCheck() {
    // проверка браузера
    const userAgent = navigator.userAgent;
    if (userAgent.indexOf("Firefox") > -1) {
      // "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:61.0) Gecko/20100101 Firefox/61.0"
      document.querySelector('body').classList.add('browser-mozzila');
    } else if (userAgent.indexOf("Opera") > -1 || userAgent.indexOf("OPR") > -1) {
      //"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.102 Safari/537.36 OPR/57.0.3098.106"
      document.querySelector('body').classList.add('browser-opera');
    } else if (userAgent.indexOf("Trident") > -1) {
      // "Mozilla/5.0 (Windows NT 10.0; WOW64; Trident/7.0; .NET4.0C; .NET4.0E; Zoom 3.6.0; wbx 1.0.0; rv:11.0) like Gecko"
      document.querySelector('body').classList.add('browser-ie');
    } else if (userAgent.indexOf("Edge") > -1) {
      // "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36 Edge/16.16299"
      document.querySelector('body').classList.add('browser-edge');
    } else if (userAgent.indexOf("Chrome") > -1) {
      // "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Ubuntu Chromium/66.0.3359.181 Chrome/66.0.3359.181 Safari/537.36"
      document.querySelector('body').classList.add('browser-chrome');
    } else if (userAgent.indexOf("Safari") > -1) {
      // "Mozilla/5.0 (iPhone; CPU iPhone OS 11_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/11.0 Mobile/15E148 Safari/604.1 980x1306"
      document.querySelector('body').classList.add('browser-safari');
    }
    // проверка на МАС платформу
    if (navigator.platform.toUpperCase().indexOf('MAC') >= 0) {
      document.querySelector('body').classList.add('platform-mac');
    }
  };

  function detectTouchDevices() {
    if (
      ('ontouchstart' in window) ||
      (navigator.maxTouchPoints > 0) ||
      (navigator.msMaxTouchPoints > 0)
    ) {
      document.querySelector('body').classList.add('touchable-device');
    } else {
      document.querySelector('body').classList.add('no-touch');
    }
  };

  window.addEventListener('load', () => {
    browserCheck();
    detectTouchDevices();
  });
})();

(() => {
  const handlerClick = function (btn) {
    btn.classList.toggle('active');
    document.body.classList.toggle('mm-opened');
  };

  window.addEventListener('load', () => {
    var btn = document.querySelector('.js-burg');
    btn.addEventListener('click', () => handlerClick(btn));
  });
})();


(() => {
  const handlerClick = function (event, btn, langItems, root) {
    langItems.forEach(item => item.classList.remove('active'));
    btn.classList.add('active');
    event.stopPropagation();
    root.classList.remove('open');
  };

  window.addEventListener('load', () => {
    var btn = document.querySelector('.js-lang');
    if (!btn) return;
    btn.addEventListener('click', () => {
      btn.classList.toggle('open');
    });

    var langItems = btn.querySelectorAll('.lang__item');
    if (langItems.length) {
      langItems.forEach((i, d) => {
        i.addEventListener("click", (e) => handlerClick(e, i, langItems, btn));
      });
    }
  });
})();


(() => {
  const SliderChips = function (slider, root, iter) {
    const app = this;
    this.getHeight = function (elem) {
      let height = 0;
      for (var i = 0; i < elem.length; i++) {
        height += elem[i].offsetHeight;
      }
      return height + 5;
    };

    this.getWidth = function (elem) {
      let width = 0;
      for (var i = 0; i < elem.length; i++) {
        width += elem[i].offsetWidth;
      }
      return width;
    };

    this.initSliderDesktop = function () {
      if (!this._data.slider.children.length) return;
      let height = this.getHeight(this._data.slider.children);
      if (height < this._data.slider.offsetHeight) {
        for (var i = 0; (i < this._data.maxClones) && this._data.slider.children[i] && (height < (this._data.root.offsetHeight * 3)); i++) {
          const clone = this._data.slider.children[i].cloneNode(true);
          clone.classList.add('clone');
          this._data.slider.appendChild(clone);
          this._data.clones[i] = clone;
          height = this.getHeight(this._data.slider.children);
        }
      }
    };

    this.initSliderMobile = function () {
      if (!this._data.slider.children.length) return;
      let width = this.getWidth(this._data.slider.children);
      if (width < this._data.slider.offsetWidth) {
        for (var i = 0; (i < this._data.maxClones) && this._data.slider.children[i] && (width < (this._data.root.offsetWidth * 3)); i++) {
          const clone = this._data.slider.children[i].cloneNode(true);
          clone.classList.add('clone');
          this._data.slider.appendChild(clone);
          this._data.clones[i] = clone;
          width = this.getWidth(this._data.slider.children);
        }
      }
    };

    this.startSlider = function () {
      if ((this._data.clones.length < this._data.maxClones)) {
        if (this._data.currentAdaptive === 'mob') {
          this.initSliderMobile();
          this._data.needReinit = false;
        } else if (this._data.currentAdaptive === 'des') {
          this.initSliderDesktop();
          this._data.needReinit = false;
        }
      }
    };

    this.checkAdaptive = function () {
      if (window.innerWidth < this._data.maxMobWidth && this._data.currentAdaptive !== 'mob') {
        this._data.currentAdaptive = 'mob';
        this._data.needReinit = true;
      } else if (window.innerWidth >= this._data.maxMobWidth && this._data.currentAdaptive !== 'des') {
        this._data.currentAdaptive = 'des';
        this._data.needReinit = true;
      }
    };

    this.addClasses = function () {
      const isMob = this._data.currentAdaptive === 'mob';
      slider.classList.remove(...['rtl', 'ttb', 'btt', 'ltr']);
      if (iter % 2 === 1) {
        slider.classList.add(isMob ? 'rtl' : 'btt');
      } else {
        slider.classList.add(isMob ? 'ltr' : 'ttb');
      }
    };

    this.initSlider = function () {
      this.checkAdaptive();
      this.startSlider();
      this.addClasses();
    };

    this.bindEvents = function () {
      window.addEventListener('resize', () => {
        clearTimeout(app._data.timer);
        app._data.timer = setTimeout(() => {
          app.checkAdaptive();
          if (app._data.needReinit) {
            app.startSlider();
            this.addClasses();
          }
        }, app._data.resizeTimer);
      });
    };

    this.initParams = function () {
      this._data = {
        root: root,
        maxMobWidth: 1020,
        resizeTimer: 300,
        slider: slider,
        timer: null,
        currentAdaptive: '',
        clones: [],
        needReinit: true,
        maxClones: 15,
      };
    };

    this.init = function () {
      this.initParams();
      this.bindEvents();
      this.initSlider();
    };
  };

  window.addEventListener('load', () => {
    const root = document.querySelector('.sliders');
    const elms = document.getElementsByClassName('sliders__line');
    if (!root && !elms.length) return;
    for (let iter = 0; iter < elms.length; iter++) {
      new SliderChips(elms[iter], root, iter).init();
    }
  });
})();


