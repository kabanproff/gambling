const browserSync = require('browser-sync').create();

function browsersync() {
  browserSync.init({
    server: {
      baseDir: ["./"],
      startPath: 'index.html'
    }
  });
}

exports.default = browsersync;
