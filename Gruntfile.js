
module.exports = function (grunt) {

  grunt.initConfig({

    pkg: grunt.file.readJSON("package.json"),

    clean: {
      default: ["lib/*.js"]
    },

   concat: {
        options: {
          banner: '/*!\n  <%= pkg.name %> <%= pkg.version %>\n' +
            //'  <%= pkg.repository.url %>\n\n' +
            '  Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author %>\n' +
            '  Licensed under the MIT license.\n' +
            '*/\n\n' +
            '(function (root, factory) {\n' +
            '    if (typeof define === "function" && define.amd) {\n' +
            '      define(["underscore", "backbone"], function (_, Backbone) {\n' +
            '        return (root.ZingChart = factory(_, Backbone));\n' +
            '      });\n' +
            '    } else if (typeof exports === "object") {\n' +
            '      module.exports = factory(require("underscore"), require("backbone"));\n' +
            '    } else {\n' +
            '      root.ZingChart = factory(root._, root.Backbone);\n' +
            '    }}(this, function (_, Backbone) {\n\n' +
  
            '        var ZingChart = {};\n',
          footer: '\n  return ZingChart;\n\n' +
            '}));'
        },
        default:{
          files: {
              'lib/backbone.zingchart.js': ['src/ZingChartModel.js', 'src/ZingChartView.js'],
              'lib/backbone.zingchart.extras.js': ['src/ZingChartModel.js', 'src/ZingChartView.js', 'src/ZingChartViewExtra.js']
          }
        }
    },

    

    uglify: {
      options: {
        mangle: true,
        compress: true
      },
      default: {
        files: {
          'lib/backbone.zingchart.min.js': ['lib/backbone.zingchart.js'],
          'lib/backbone.zingchart.extras.min.js': ['lib/backbone.zingchart.extras.js']
        }
      }
    }
    
  });

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks("grunt-contrib-uglify");
  
  
  grunt.registerTask("default", ["clean", "concat", "uglify"]);
  
};
