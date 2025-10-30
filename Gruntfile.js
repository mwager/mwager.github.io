module.exports = function (grunt) {
  // load all grunt tasks
  require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),

    // replace tasks
    replace: {
      config_before: {
        src: ["./public/_config.yml"],
        dest: ["./public/_config.yml"],
        replacements: [
          {
            from: 'env: "dev"',
            to: 'env: "prod"',
          },
        ],
      },
      config_after: {
        src: ["./public/_config.yml"],
        dest: ["./public/_config.yml"],
        replacements: [
          {
            from: 'env: "prod"',
            to: 'env: "dev"',
          },
        ],
      },
    },

    // execute stuff via shell
    exec: {
      jekyll_serve: {
        cwd: "./public",
        cmd: function (cmd) {
          // log(grunt.file.read('./version').trim());
          return "jekyll serve -w --drafts";
        },
      },
      jekyll_build: {
        cwd: "./public",
        cmd: function (cmd) {
          return "rm -rf _site && jekyll build";
        },
      },
    },

    cssmin: {
      combine: {
        files: {
          "public/build/main.min.css": [
            "public/css/pure.css",
            "public/css/fancybox.css",
            "public/css/main.css",
          ],
        },
      },
    },

    uglify: {
      my_target: {
        options: {
          // sourceMap: true,
          // sourceMapName: 'public/build/main.min.map'
        },
        files: {
          "public/build/main.min.js": [
            "public/js/plugins.js",
            "public/js/main.js",
          ],
        },
      },
    },

    // experimenting with es6...
    traceur: {
      options: {
        blockBinding: true,
      },
      custom: {
        files: {
          "public/build/es6.js": ["public/js/es6.js"],
        },
      },
    },

    // sftp deployment (-:
    "sftp-deploy": {
      build: {
        auth: {
          host: "ssh.strato.de",
          port: 22,
          authKey: "key1", // see file "/.ftppass"
        },
        // cache: 'sftpCache.json',
        src: "./public/_site", // jekyll build dir
        dest: "/", // eg 'blog/' or '/' --> remote path: blog.mwager.de -> mwager.de/blog
        exclusions: [
          "./**/.DS_Store",

          // see public/build/* (-;
          "./css",
          "./js",

          "TODO",
          "LICENSE",
          "404.html",
          "readme.md",
          "README.md",
          "node_modules",
          "package.json",
          "Gruntfile.js",
          ".htaccess",
          ".htpasswd",
          "_.htpasswd",

          // XXX nach einmaligem upload VIEL MEHR IGNORIEREN!?
          // nicht immer alles hochjagen bei jedem "deploy"
          "Bachelorarbeit.pdf",
          "TCADINTEGRATIONMKT_CertificateTCAD201101_20120707_104028.pdf",
          "jAM.app.zip",
          "jAM.jar.zip",
          "socicon-webfont.eot",
          "socicon-webfont.svg",
          "socicon-webfont.ttf",
        ],
        cache: false,
        serverSep: "/",
        localSep: "/",
        concurrency: 3,
        progress: true,
      },
    },
  });

  // Load the plugin that provides the "uglify" task.
  // grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks("grunt-sftp-deploy");

  grunt.registerTask("default", function () {
    console.log("////////////////////////////////////////////////////////////");
    console.log("Gruntfile for mwager.de - Usage:");
    console.log(
      "grunt serve  - watch and serve the jekyll page locally for dev"
    );
    console.log(
      "grunt build  - build the jekyll page for production (also minify css/js)"
    );
    console.log("grunt deploy - build and deploy the page for production");
    console.log("////////////////////////////////////////////////////////////");
  });

  grunt.registerTask("serve", ["exec:jekyll_serve"]);

  grunt.registerTask("build", ["cssmin", "uglify", "exec:jekyll_build"]);

  grunt.registerTask("deploy", [
    // "replace:config_before",
    // "build",
    // "replace:config_after",
    "sftp-deploy",
  ]);
};