module.exports = function (grunt) {
  require("load-grunt-tasks")(grunt);
  grunt.initConfig({
    less: {
      style: {
        files: {
          "source/css/style.css": ["source/less/style.less"],
          "build/css/style.css": ["source/less/style.less"]
        }
      },
      options: {
        javascriptEnabled: true
    }
    },
    postcss: {
      options: {
        processors: [
          require("autoprefixer"),
          require("css-mqpacker")({
            sort: true
          })
        ]
      },
      style: {
        src: "build/css/*.css",
      }
    },
    watch: {
      html: {
        files: ["source/*.html"],
        tasks: [
          "copy:html"
        ]
      },
      style: {
        files: ["source/less/**/*.less"],
        tasks: ["less", "postcss", "csso"]
      }
    },
    browserSync: {
      server: {
        bsFiles: {
          src: ["build/*.html",
            "build/css/*.css"
          ]
        },
        options: {
          server: "build",
          watchTask: true
        }
      }
    },
    csso: {
      style: {
        options: {
          report: "gzip"
        },
        files: {
          "build/css/style.min.css": ["build/css/style.css"],
          "source/css/style.min.css": ["source/css/style.css"],
        }
      }
    },
    imagemin: {
      images: {
        options: {
          optimizationLevel: 3
        },
        files: [{
          expand: true,
          src: ["build/img/**/*.{png,jpg,gif}"]
        }]
      }
    },
    copy: {
      build: {
        files: [{
          expand: true,
          cwd: "source/",
          src: [
            "fonts/**",
            "img/**",
            "js/**",
            "*.html"
          ],
          dest: "build"
        }]
      },
      html: {
        files: [{
          expand: true,
          cwd: "source/",
          src: ["*.html"],
          dest: "build"
        }]
      }
    },
    clean: {
      build: ["build"]
    }
  });
  grunt.registerTask("serve", ["browserSync", "watch"]);
  grunt.registerTask("build", ["clean", "copy", "less", "postcss", "csso", "imagemin"]);
};
