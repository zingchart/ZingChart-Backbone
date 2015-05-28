/*!
  backbone-zingchart 1.0.1
  Copyright (c) 2015 ZingChart
  Licensed under the MIT license.
*/

(function (root, factory) {
    if (typeof define === "function" && define.amd) {
      define(["underscore", "backbone"], function (_, Backbone) {
        return (root.ZingChart = factory(_, Backbone));
      });
    } else if (typeof exports === "object") {
      module.exports = factory(require("underscore"), require("backbone"));
    } else {
      root.ZingChart = factory(root._, root.Backbone);
    }}(this, function (_, Backbone) {

        var ZingChart = {};
    if (typeof ZingChart === 'undefined'){ZingChart = {}};
    ZingChart.ZingChartModel = Backbone.Model.extend({
    
        defaults:{
            width: 640,
            height: 480,
            json: {},
            data: [],
            charttype: 'line',
            defaults: {},
            events: null
        }
    
    });
   ZingChart.ZingChartView = Backbone.View.extend({
      
      initialize: function() {
        this.listenTo(this.model, "change:json", this.updateChartJSON);
        this.listenTo(this.model, "change:data", this.updateChartData);
      },
      
      render: function() {
        var data = this.mergeJSONData();
        zingchart.render({
          id:this.el.id,
          height:this.model.get('height'),
          width:this.model.get('width'),
          data:data,
          defaults:this.model.get('defaults')
        });
        
        return this;
      },
      
      exec: function(apimethod, apioptions){
          return zingchart.exec(this.el.id, apimethod, apioptions);
      },
      
      bind: function(eventname, callback){
        zingchart.bind(this.el.id,eventname,callback);
        return this;
      },
      
      mergeJSONData: function(){
        var json = this.model.get('json');
        var data = this.model.get('data');
        
        if (typeof(json) === 'string'){
          json = JSON.parse(json);
        }
        
        if (json.graphset && json.graphset.length === 1){
          json = json.graphset[0];
        }
        
        if(data && data.length !== 0){
            if (!json.series){
              json.series = [];
            }
            
            for(var i = 0; i < data.length; i++){
              if(json.series[i]){
                json.series[i].values = data[i];
              }
              else{
                json.series.push({'values' : data[i]});
              }
            }
        }
        
        if (!json.type){
          json.type =   this.model.get('charttype');
        }
        
        return json;
      },
      
      updateChartJSON: function(){
        var newjson = this.model.get('json');
        zingchart.exec(this.el.id, 'setdata',{
          data : newjson
        });
      },
      
      updateChartData: function(){
        var newdata = this.model.get('data');
        zingchart.exec(this.el.id, 'setseriesvalues',{
          values : newdata
        });
      }
   });

        ZingChart.SimpleView = ZingChart.ZingChartView;
        ZingChart.ZingChartView = ZingChart.SimpleView.extend({

//Direct API Access ==============================================================
            // DATA MANIPULATION ======================================================
            addNode: function (data) {
                zingchart.exec(this.el.id, "addnode", data);
                return this;
            },
        
            addPlot: function (data) {
                zingchart.exec(this.el.id, "addplot", data);
                return this;
            },
        
            appendSeriesData: function (data) {
                zingchart.exec(this.el.id, "appendseriesdata", data);
                return this;
            },
        
            appendSeriesValues: function (data) {
                zingchart.exec(this.el.id, "appendseriesvalues", data);
                return this;
            },
        
            getSeriesData: function (opts) {
                if (opts) {
                    return zingchart.exec(this.el.id, "getseriesdata", opts);
                }
                else {
                    return zingchart.exec(this.el.id, "getseriesdata", {});
                }
            },
        
            getSeriesValues: function (opts) {
                if (opts) {
                    return zingchart.exec(this.el.id, "getseriesvalues", opts);
                }
                else {
                    return zingchart.exec(this.el.id, "getseriesvalues", {});
                }
            },
        
            modifyPlot: function (data) {
                zingchart.exec(this.el.id, "modifyplot", data);
                return this;
            },
        
            removeNode: function (data) {
                zingchart.exec(this.el.id, "removenode", data);
                return this;
            },
        
            removePlot: function (data) {
                zingchart.exec(this.el.id, "removeplot", data);
                return this;
            },
        
            set3dView: function (data) {
                zingchart.exec(this.el.id, "set3dview", data);
                return this;
            },
        
            setNodeValue: function (data) {
                zingchart.exec(this.el.id, "setnodevalue", data);
                return this;
            },
        
            setSeriesData: function (data) {
                zingchart.exec(this.el.id, "setseriesdata", data);
                return this;
            },
        
            setSeriesValues: function (data) {
                zingchart.exec(this.el.id, "setseriesvalues", data);
                return this;
            },
        
            // EXPORT METHODS =========================================================
            exportData: function () {
                zingchart.exec(this.el.id, "exportdata");
                return this;
            },
        
            getImageData: function (ftype) {
                if (ftype == "png" || ftype == "jpg" || ftype == "bmp") {
                    zingchart.exec(this.el.id, "getimagedata", {
                        filetype: ftype
                    });
                    return this;
                }
                else {
                    throw("Error: Got " + ftype + ", expected 'png' or 'jpg' or 'bmp'");
                }
            },
        
            print: function () {
                zingchart.exec(this.el.id, "print");
                return this;
            },
        
            saveAsImage: function () {
                zingchart.exec(this.el.id, "saveasimage");
                return this;
            },
        
            // FEED METHODS ===========================================================
            clearFeed: function () {
                zingchart.exec(this.el.id, "clearfeed");
                return this;
            },
        
            getInterval: function () {
                return zingchart.exec(this.el.id, "getinterval");
            },
        
            setInterval: function (intr) {
                if (typeof(intr) == "number") {
                    zingchart.exec(this.el.id, "setinterval", {
                        interval: intr
                    });
                    return this;
                }
                else if (typeof(intr) == "object") {
                    zingchart.exec(this.el.id, "setinterval", intr);
                    return this;
                }
                else {
                    throw("Error: Got " + typeof(intr) + ", expected number");
                }
            },
        
            startFeed: function () {
                zingchart.exec(this.el.id, "startfeed");
                return this;
            },
        
            stopFeed: function () {
                zingchart.exec(this.el.id, "stopfeed");
                return this;
            },
        
            // GRAPH INFORMATION METHODS ==============================================
            getChartType: function (opts) {
                if (opts) {
                    return zingchart.exec(this.el.id, "getcharttype", opts);
                }
                else {
                    return zingchart.exec(this.el.id, "getcharttype");
                }
            },
        
            getData: function () {
                return zingchart.exec(this.el.id, "getdata");
            },
        
            getEditMode: function () {
                return zingchart.exec(this.el.id, "geteditmode");
            },
        
            getGraphLength: function () {
                return zingchart.exec(this.el.id, "getgraphlength");
            },
        
            getNodeLength: function (opts) {
                if (opts) {
                    return zingchart.exec(this.el.id, "getnodelength", opts);
                }
                else {
                    return zingchart.exec(this.el.id, "getnodelength");
                }
            },
        
            getNodeValue: function (opts) {
                return zingchart.exec(this.el.id, "getnodevalue", opts);
            },
        
            getObjectInfo: function (opts) {
                return zingchart.exec(this.el.id, "getobjectinfo", opts);
            },
        
            getPlotLength: function (opts) {
                if (opts) {
                    return zingchart.exec(this.el.id, "getplotlength", opts);
                }
                else {
                    return zingchart.exec(this.el.id, "getplotlength");
                }
            },
        
            getPlotValues: function (opts) {
                return zingchart.exec(this.el.id, "getplotvalues", opts);
            },
        
            getRender: function () {
                return zingchart.exec(this.el.id, "getrender");
            },
        
            getRules: function (opts) {
                return zingchart.exec(this.el.id, "getrules", opts);
            },
        
            getScales: function (opts) {
                return zingchart.exec(this.el.id, "getscales", opts);
            },
        
            getVersion: function () {
                return zingchart.exec(this.el.id, "getversion");
            },
        
            getXYInfo: function (opts) {
                return zingchart.exec(this.el.id, "getxyinfo", opts);
            },
        
            // GRAPH MANIPULATION =====================================================
            addScaleValue: function (url) {
                zingchart.exec(this.el.id, "addscalevalue", {
                    dataurl: url
                });
                return this;
            },
        
            destroy: function (opts) {
                if (opts) {
                    if (opts.hasOwnProperty("")) {
        
                    }
                }
                else {
                    zingchart.exec(this.el.id, "destroy");
                }
                return this;
            },
        
            loadNewData: function (opts) {
                zingchart.exec(this.el.id, "load", opts);
                return this;
            },
        
            modify: function (opts) {
                zingchart.exec(this.el.id, "modify", opts);
                return this;
            },
        
            reloadChart: function (opts) {
                if (opts) {
                    zingchart.exec(this.el.id, "reload", opts);
                }
                else {
                    zingchart.exec(this.el.id, "reload");
                }
                return this;
            },
        
            removeScaleValue: function (opts) {
                zingchart.exec(this.el.id, "removescalevalue", opts);
                return this;
            },
        
            resizeChart: function (opts) {
                zingchart.exec(this.el.id, "resize", opts);
                return this;
            },
        
            setData: function (opts) {
                zingchart.exec(this.el.id, "setdata", opts);
                return this;
            },
        
            update: function (opts) {
                zingchart.exec(this.el.id, "update");
                return this;
            },
        
            // HISTORY METHODS ========================================================
            goBack: function () {
                zingchart.exec(this.el.id, "goback");
                return this;
            },
        
            goForward: function () {
                zingchart.exec(this.el.id, "goforward");
                return this;
            },
        
            // INTERACTIVE METHODS ====================================================
            addNodeIA: function (opts) {
                if (opts) {
                    zingchart.exec(this.el.id, "addnodeia", opts);
                }
                else {
                    zingchart.exec(this.el.id, "addnodeia");
                }
                return this;
            },
        
            enterEditMode: function (opts) {
                if (opts) {
                    zingchart.exec(this.el.id, "entereditmode", opts);
                }
                else {
                    zingchart.exec(this.el.id, "entereditmode");
                }
                return this;
            },
        
            exitEditMode: function (opts) {
                if (opts) {
                    zingchart.exec(this.el.id, "exiteditmode", opts);
                }
                else {
                    zingchart.exec(this.el.id, "exiteditmode");
                }
                return this;
            },
        
            removeNodeIA: function (opts) {
                if (opts) {
                    zingchart.exec(this.el.id, "removenodeia", opts);
                }
                else {
                    zingchart.exec(this.el.id, "removenodeia");
                }
                return this;
            },
        
            removePlotIA: function (opts) {
                if (opts) {
                    zingchart.exec(this.el.id, "removeplotia", opts);
                }
                else {
                    zingchart.exec(this.el.id, "removeplotia");
                }
                return this;
            },
        
            // NOTES METHODS ==========================================================
            addNote: function (opts) {
                zingchart.exec(this.el.id, "addnote", opts);
                return this;
            },
        
            removeNote: function (opts) {
                zingchart.exec(this.el.id, "removenote", {
                    "id": opts
                });
                return this;
            },
        
            updateNote: function (opts) {
                zingchart.exec(this.el.id, "updatenote", opts);
                return this;
            },
        
            // OBJECTS METHODS ========================================================
            addObject: function (opts) {
                zingchart.exec(this.el.id, "addobject", opts);
                return this;
            },
        
            removeObject: function (opts) {
                zingchart.exec(this.el.id, "removeobject", opts);
                return this;
            },
        
            repaintObjects: function (opts) {
                if (opts) {
                    zingchart.exec(this.el.id, "repaintobjects", opts);
                }
                else {
                    zingchart.exec(this.el.id, "repaintobjects", {});
                }
                return this;
            },
        
            updateObject: function (opts) {
                zingchart.exec(this.el.id, "updateobject", opts);
                return this;
            },
        
            // LABEL METHODS ==========================================================
            addLabel: function (opts) {
                zingchart.exec(this.el.id, "addobject", {
                    "type":"label",
                    "data":opts
                });
                return this;
            },
        
            removeLabel: function (opts) {
                zingchart.exec(this.el.id, "removeobject", {
                    "type":"label",
                    "id":opts
                });
                return this;
            },
        
            updateLabel: function (opts) {
                zingchart.exec(this.el.id, "updateobject", {
                    "type": "label",
                    "data": opts
                });
                return this;
            },
        
            // RULES METHODS ==========================================================
            addRule: function (opts) {
                zingchart.exec(this.el.id, "addrule", opts);
                return this;
            },
        
            removeRule: function (opts) {
                zingchart.exec(this.el.id, "removerule", opts);
                return this;
            },
        
            updateRule: function (opts) {
                zingchart.exec(this.el.id, "updaterule", opts);
                return this;
            },
        
            // SELECTION METHODS ======================================================
            clearSelection: function (opts) {
                if (opts) {
                    zingchart.exec(this.el.id, "clearselection", opts);
                }
                else {
                    zingchart.exec(this.el.id, "clearselection");
                }
                return this;
            },
        
            chartDeselect: function (opts) {
                zingchart.exec(this.el.id, "deselect", opts);
                return this;
            },
        
            getSelection: function (opts) {
                if (opts) {
                    zingchart.exec(this.el.id, "getselection", opts);
                }
                else {
                    zingchart.exec(this.el.id, "getselection");
                }
                return this;
            },
        
            chartSelect: function (opts) {
                zingchart.exec(this.el.id, "select", opts);
                return this;
            },
        
            setSelection: function (opts) {
                zingchart.exec(this.el.id, "setselection", opts);
                return this;
            },
        
            // TOGGLE METHODS =========================================================
            disable: function (message) {
                if (message) {
                    zingchart.exec(this.el.id, "disable", {text: message});
                }
                else {
                    zingchart.exec(this.el.id, "disable");
                }
                return this;
            },
        
            enable: function () {
                zingchart.exec(this.el.id, "enable");
                return this;
            },
        
            exitFullscreen: function () {
                zingchart.exec(this.el.id, "exitfullscreen");
                return this;
            },
        
            fullscreen: function () {
                zingchart.exec(this.el.id, "fullscreen");
                return this;
            },
        
            hideMenu: function () {
                zingchart.exec(this.el.id, "hidemenu");
                return this;
            },
        
            hidePlot: function (opts) {
                zingchart.exec(this.el.id, "hideplot", opts);
                return this;
            },
        
            hideAllPlots: function (opts) {
                var myId = this.el.id;
                var allPlots = ( opts && opts.hasOwnProperty("graphid") ? zingchart.exec(myId,"getplotlength",opts) : zingchart.exec(myId,"getplotlength"));
                if (opts && opts.hasOwnProperty('graphid')) {
                    for (var i = 0; i < allPlots; i++) {
                        zingchart.exec(myId, "hideplot", {
                            "graphid": opts.graphid,
                            "plotindex": i
                        });
                    }
                }
                else {
                    for (var i = 0; i < allPlots; i++) {
                        zingchart.exec(myId, "hideplot", {
                            "plotindex": i
                        });
                    }
                }
                return this;
            },
        
            hideAllPlotsBut: function (opts) {
                var myId = this.el.id;
                var allPlots = ( opts && opts.hasOwnProperty("graphid") ? zingchart.exec(myId,"getplotlength",opts) : zingchart.exec(myId,"getplotlength"));
                if (opts && opts.hasOwnProperty('graphid') && opts.hasOwnProperty('plotindex')) {
                    for (var i = 0; i < allPlots; i++) {
                        if (i != opts.plotindex) {
                            zingchart.exec(myId, "hideplot", {
                                "graphid": opts.graphid,
                                "plotindex": i
                            });
                        }
                    }
                }
                else {
                    for (var i = 0; i < allPlots; i++) {
                        if (i != opts.plotindex) {
                            zingchart.exec(myId, "hideplot", {
                                "plotindex": i
                            });
                        }
                    }
                }
                return this;
            },
        
            modifyAllPlotsBut: function (opts, data) {
                var myId = this.el.id;
                var allPlots = ( opts && opts.hasOwnProperty("graphid") ? zingchart.exec(myId,"getplotlength",opts) : zingchart.exec(myId,"getplotlength"));
                if (opts && opts.hasOwnProperty('graphid') && opts.hasOwnProperty('plotindex')) {
                    for (var i = 0; i < allPlots; i++) {
                        if (i != opts.plotindex) {
                            zingchart.exec(myId, "modifyplot", {
                                "graphid": opts.graphid,
                                "plotindex": i,
                                "data": data
                            });
                        }
                    }
                }
                else {
                    for (var i = 0; i < allPlots; i++) {
                        if (i != opts.plotindex) {
                            zingchart.exec(myId, "modifyplot", {
                                "plotindex": i,
                                "data": data
                            });
                        }
                    }
                }
                return this;
            },
        
            modifyAllPlots: function (data, opts) {
                var myId = this.el.id;
                var allPlots = ( opts ? zingchart.exec(myId,"getplotlength",opts) : zingchart.exec(myId,"getplotlength"));
                for (var i = 0; i < allPlots; i++) {
                    if (opts && opts.graphid) {
                        zingchart.exec(myId, "modifyplot", {
                            "graphid": opts.graphid,
                            "plotindex": i,
                            "data": data
                        });
                    }
                    else {
                        zingchart.exec(myId, "modifyplot", {
                            "plotindex": i,
                            "data": data
                        });
                    }
                }
                return this;
            },
        
            showAllPlots: function (opts) {
                var myId = this.el.id;
                var allPlots = ( opts && opts.hasOwnProperty("graphid") ? zingchart.exec(myId,"getplotlength",opts) : zingchart.exec(myId,"getplotlength"));
                if (opts && opts.hasOwnProperty('graphid')) {
                    for (var i = 0; i < allPlots; i++) {
                        zingchart.exec(myId, "showplot", {
                            "graphid": opts.graphid,
                            "plotindex": i
                        });
                    }
                }
                else {
                    for (var i = 0; i < allPlots; i++) {
                        zingchart.exec(myId, "showplot", {
                            "plotindex": i
                        });
                    }
                }
                return this;
            },
        
            showAllPlotsBut: function (opts) {
                var myId = this.el.id;
                var allPlots = ( opts && opts.hasOwnProperty("graphid") ? zingchart.exec(myId,"getplotlength",opts) : zingchart.exec(myId,"getplotlength"));
                if (opts && opts.hasOwnProperty('graphid') && opts.hasOwnProperty('plotindex')) {
                    for (var i = 0; i < allPlots; i++) {
                        if (i != opts.plotindex) {
                            zingchart.exec(myId, "showplot", {
                                "graphid": opts.graphid,
                                "plotindex": i
                            });
                        }
                    }
                }
                else {
                    for (var i = 0; i < allPlots; i++) {
                        if (i != opts.plotindex) {
                            zingchart.exec(myId, "showplot", {
                                "plotindex": i
                            });
                        }
                    }
                }
                return this;
            },
        
            legendMaximize: function (opts) {
                if (opts) {
                    zingchart.exec(this.el.id, "legendmaximize", opts);
                }
                else {
                    zingchart.exec(this.el.id, "legendmaximize");
                }
                return this;
            },
        
            legendMinimize: function (opts) {
                if (opts) {
                    zingchart.exec(this.el.id, "legendminimize", opts);
                }
                else {
                    zingchart.exec(this.el.id, "legendminimize");
                }
                return this;
            },
        
            showMenu: function () {
                zingchart.exec(this.el.id, "showmenu");
                return this;
            },
        
            showPlot: function (opts) {
                zingchart.exec(this.el.id, "showplot", opts);
                return this;
            },
        
            toggleAbout: function () {
                zingchart.exec(this.el.id, "toggleabout");
                return this;
            },
        
            toggleBugReport: function () {
                zingchart.exec(this.el.id, "togglebugreport");
                return this;
            },
        
            toggleDimension: function () {
                zingchart.exec(this.el.id, "toggledimension");
                return this;
            },
        
            toggleLegend: function () {
                zingchart.exec(this.el.id, "togglelegend");
                return this;
            },
        
            toggleLens: function () {
                zingchart.exec(this.el.id, "togglelens");
                return this;
            },
        
            toggleSource: function () {
                zingchart.exec(this.el.id, "togglesource");
                return this;
            },
        
            // ZOOM METHODS ===========================================================
            viewAll: function () {
                zingchart.exec(this.el.id, "viewall");
                return this;
            },
        
            zoomIn: function (opts) {
                if (opts) {
                    zingchart.exec(this.el.id, "zoomin", opts);
                }
                else {
                    zingchart.exec(this.el.id, "zoomin");
                }
                return this;
            },
        
            zoomOut: function (opts) {
                if (opts) {
                    zingchart.exec(this.el.id, "zoomout", opts);
                }
                else {
                    zingchart.exec(this.el.id, "zoomout");
                }
                return this;
            },
        
            zoomTo: function (opts) {
                zingchart.exec(this.el.id, "zoomto", opts);
                return this;
            },
        
            zoomToValues: function (opts) {
                zingchart.exec(this.el.id, "zoomtovalues", opts);
                return this;
            },
            
            
            /*********************************************************************
              ****************************** EVENTS *******************************
              *********************************************************************/
         
             // ANIMATION EVENTS ====================================================
             animationEnd: function (callback) {
                 var jq = this;
                 zingchart.bind(this.el.id, "animationEnd", function(p){
                     $.extend(jq,{event:p});
                     callback.call(jq)
                 });
                 return this;
             },
         
             animationStart: function (callback) {
                 var jq = this;
                 zingchart.bind(this.el.id, "animation_start", function(p){
                     $.extend(jq,{event:p});
                     callback.call(jq)
                 });
                 return this;
             },
         
             animationStep: function (callback) {
                 var jq = this;
                 zingchart.bind(this.el.id, "animation_step", function(p){
                     $.extend(jq,{event:p});
                     callback.call(jq)
                 });
                 return this;
             },
         
             // DATA MANIPULATION EVENTS ===============================================
             chartModify: function (callback) {
                 var jq = this;
                 zingchart.bind(this.el.id, "modify", function(p){
                     $.extend(jq,{event:p});
                     callback.call(jq)
                 });
                 return this;
             },
         
             nodeAdd: function (callback) {
                 var jq = this;
                 zingchart.bind(this.el.id, "node_add", function(p){
                     $.extend(jq,{event:p});
                     callback.call(jq)
                 });
                 return this;
             },
         
             nodeRemove: function (callback) {
                 var jq = this;
                 zingchart.bind(this.el.id, "node_remove", function(p){
                     $.extend(jq,{event:p});
                     callback.call(jq)
                 });
                 return this;
             },
         
             plotAdd: function (callback) {
                 var jq = this;
                 zingchart.bind(this.el.id, "plot_add", function(p){
                     $.extend(jq,{event:p});
                     callback.call(jq)
                 });
                 return this;
             },
         
             plotModify: function (callback) {
                 var jq = this;
                 zingchart.bind(this.el.id, "plot_modify", function(p){
                     $.extend(jq,{event:p});
                     callback.call(jq)
                 });
                 return this;
             },
         
             plotRemove: function (callback) {
                 var jq = this;
                 zingchart.bind(this.el.id, "plot_remove", function(p){
                     $.extend(jq,{event:p});
                     callback.call(jq)
                 });
                 return this;
             },
         
             chartReload: function (callback) {
                 var jq = this;
                 zingchart.bind(this.el.id, "reload", function(p){
                     $.extend(jq,{event:p});
                     callback.call(jq)
                 });
                 return this;
             },
         
             dataSet: function (callback) {
                 var jq = this;
                 zingchart.bind(this.el.id, "setdata", function(p){
                     $.extend(jq,{event:p});
                     callback.call(jq)
                 });
                 return this;
             },
         
             // EXPORT EVENTS ==========================================================
             dataExport: function (callback) {
                 var jq = this;
                 zingchart.bind(this.el.id, "data_export", function(p){
                     $.extend(jq,{event:p});
                     callback.call(jq)
                 });
                 return this;
             },
         
             imageSave: function (callback) {
                 var jq = this;
                 zingchart.bind(this.el.id, "image_save", function(p){
                     $.extend(jq,{event:p});
                     callback.call(jq)
                 });
                 return this;
             },
         
             chartPrint: function (callback) {
                 var jq = this;
                 zingchart.bind(this.el.id, "print", function(p){
                     $.extend(jq,{event:p});
                     callback.call(jq)
                 });
                 return this;
             },
         
             // FEED EVENTS ============================================================
             feedClear: function (callback) {
                 var jq = this;
                 zingchart.bind(this.el.id, "feed_clear", function(p){
                     $.extend(jq,{event:p});
                     callback.call(jq)
                 });
                 return this;
             },
         
             feedIntervalModify: function (callback) {
                 var jq = this;
                 zingchart.bind(this.el.id, "feed_interval_modify", function(p){
                     $.extend(jq,{event:p});
                     callback.call(jq)
                 });
                 return this;
             },
         
             feedStart: function (callback) {
                 var jq = this;
                 zingchart.bind(this.el.id, "feed_start", function(p){
                     $.extend(jq,{event:p});
                     callback.call(jq)
                 });
                 return this;
             },
         
             feedStop: function (callback) {
                 var jq = this;
                 zingchart.bind(this.el.id, "feed_stop", function(p){
                     $.extend(jq,{event:p});
                     callback.call(jq)
                 });
                 return this;
             },
         
             // GLOBAL EVENTS
             graphClick: function (callback) {
                 var jq = this;
                 zingchart.bind(this.el.id, "click", function(p){
                     $.extend(jq,{event:p});
                     callback.call(jq)
                 });
                 return this;
             },
         
             graphComplete: function (callback) {
                 var jq = this;
                 zingchart.bind(this.el.id, "complete", function(p){
                     $.extend(jq,{event:p});
                     callback.call(jq)
                 });
                 return this;
             },
         
             graphDataParse: function (callback) {
                 var jq = this;
                 zingchart.bind(this.el.id, "dataparse", function(p){
                     $.extend(jq,{event:p});
                     callback.call(jq)
                 });
                 return this;
             },
         
             graphDataReady: function (callback) {
                 var jq = this;
                 zingchart.bind(this.el.id, "dataready", function(p){
                     $.extend(jq,{event:p});
                     callback.call(jq)
                 });
                 return this;
             },
         
             graphGuideMouseMove: function (callback) {
                 var jq = this;
                 zingchart.bind(this.el.id, "guide_mousemove", function(p){
                     $.extend(jq,{event:p});
                     callback.call(jq)
                 });
                 return this;
             },
         
             graphLoad: function (callback) {
                 var jq = this;
                 zingchart.bind(this.el.id, "load", function(p){
                     $.extend(jq,{event:p});
                     callback.call(jq)
                 });
                 return this;
             },
         
             graphMenuItemClick: function (callback) {
                 var jq = this;
                 zingchart.bind(this.el.id, "menu_item_click", function(p){
                     $.extend(jq,{event:p});
                     callback.call(jq)
                 });
                 return this;
             },
         
             graphResize: function (callback) {
                 var jq = this;
                 zingchart.bind(this.el.id, "resize", function(p){
                     $.extend(jq,{event:p});
                     callback.call(jq)
                 });
                 return this;
             },
         
             // HISTORY EVENTS =========================================================
             historyForward: function (callback) {
                 var jq = this;
                 zingchart.bind(this.el.id, "history_forward", function(p){
                     $.extend(jq,{event:p});
                     callback.call(jq)
                 });
                 return this;
             },
         
             historyBack: function (callback) {
                 var jq = this;
                 zingchart.bind(this.el.id, "history_back", function(p){
                     $.extend(jq,{event:p});
                     callback.call(jq)
                 });
                 return this;
             },
         
             // INTERACTIVE EVENTS =====================================================
             nodeSelect: function (callback) {
                 var jq = this;
                 zingchart.bind(this.el.id, "node_select", function(p){
                     $.extend(jq,{event:p});
                     callback.call(jq)
                 });
                 return this;
             },
         
             nodeDeselect: function (callback) {
                 var jq = this;
                 zingchart.bind(this.el.id, "node_deselect", function(p){
                     $.extend(jq,{event:p});
                     callback.call(jq)
                 });
                 return this;
             },
         
             plotSelect: function (callback) {
                 var jq = this;
                 zingchart.bind(this.el.id, "plot_select", function(p){
                     $.extend(jq,{event:p});
                     callback.call(jq)
                 });
                 return this;
             },
         
             plotDeselect: function (callback) {
                 var jq = this;
                 zingchart.bind(this.el.id, "plot_deselect", function(p){
                     $.extend(jq,{event:p});
                     callback.call(jq)
                 });
                 return this;
             },
         
             // LEGEND EVENTS ==========================================================
             legendItemClick: function (callback) {
                 zingchart.bind(this.el.id, "legend_item_click", callback);
                 /*var jq = this;
                 zingchart.bind(this.el.id, "legend_item_click", function(p){
                     $.extend(jq,{event:p});
                     callback.call(jq)
                 });*/
                 return this;
             },
         
             legendMarkerClick: function (callback) {
                 var jq = this;
                 zingchart.bind(this.el.id, "legend_marker_click", function(p){
                     $.extend(jq,{event:p});
                     callback.call(jq)
                 });
                 return this;
             },
         
             // NODE EVENTS ============================================================
             nodeClick: function (callback) {
                 var jq = this;
                 zingchart.bind(this.el.id, "node_click", function(p){
                     $.extend(jq,{event:p});
                     callback.call(jq)
                 });
                 return this;
             },
         
             nodeDoubleClick: function (callback) {
                 var jq = this;
                 zingchart.bind(this.el.id, "node_doubleclick", function(p){
                     $.extend(jq,{event:p});
                     callback.call(jq)
                 });
                 return this;
             },
             
             nodeMouseOver: function (callback) {
                 var jq = this;
                 var NODEMOUSEOVER = false;
                 zingchart.bind(this.el.id, "node_mouseover", function(p){
                     if (!NODEMOUSEOVER) {
                         $.extend(jq,{event:p});
                         NODEMOUSEOVER = true;
                         callback.call(jq);
                     }
                 });
                 zingchart.bind(jq[0].id, "node_mouseout", function(){
                     NODEMOUSEOVER = false;
                 });
                 return this;
             },
         
             nodeMouseOut: function (callback) {
                 var jq = this;
                 zingchart.bind(this.el.id, "node_mouseout", function(p){
                     $.extend(jq,{event:p});
                     callback.call(jq);
                 });
                 return this;
             },
         
             nodeHover: function (mouseover, mouseout) {
                 var jq = this;
                 var NODEMOUSEOVER = false;
                 zingchart.bind(this.el.id, "node_mouseover", function(p){
                     if (!NODEMOUSEOVER) {
                         $.extend(jq,{event:p});
                         NODEMOUSEOVER = true;
                         mouseover.call(jq);
                     }
                 });
                 zingchart.bind(jq[0].id, "node_mouseout", function(){
                     NODEMOUSEOVER = false;
                     mouseout.call(jq);
                 });
                 return this;
             },
         
             // LABEL EVENTS ============================================================
             labelClick: function (callback) {
                 var jq = this;
                 zingchart.bind(this.el.id, "label_click", function(p){
                     $.extend(jq,{event:p});
                     callback.call(jq)
                 });
                 return this;
             },
         
             labelMouseOver: function (callback) {
                 var jq = this;
                 var LABELMOUSEOVER = false;
                 zingchart.bind(this.el.id, "label_mouseover", function(p){
                     if (!LABELMOUSEOVER) {
                         $.extend(jq,{event:p});
                         LABELMOUSEOVER = true;
                         callback.call(jq);
                     }
                 });
                 zingchart.bind(jq[0].id, "label_mouseout", function(){
                     LABELMOUSEOVER = false;
                 });
                 return this;
             },
         
             labelMouseOut: function (callback) {
                 var jq = this;
                 zingchart.bind(this.el.id, "label_mouseout", function(p){
                     $.extend(jq,{event:p});
                     callback.call(jq)
                 });
                 return this;
             },
         
             labelHover: function (mouseover, mouseout) {
                 $(this).labelMouseOver(mouseover).labelMouseOut(mouseout);
                 return this;
             },
         
             // SHAPE EVENTS ============================================================
             shapeClick: function (callback) {
                 var jq = this;
                 zingchart.bind(this.el.id, "shape_click", function(p){
                     $.extend(jq,{event:p});
                     callback.call(jq)
                 });
                 return this;
             },
         
             shapeMouseOver: function (callback) {
                 var jq = this;
                 var SHAPEMOUSEOVER = false;
                 zingchart.bind(this.el.id, "shape_mouseover", function(p){
                     if (!SHAPEMOUSEOVER) {
                         $.extend(jq,{event:p});
                         SHAPEMOUSEOVER = true;
                         callback.call(jq);
                     }
                 });
                 zingchart.bind(jq[0].id, "shape_mouseout", function(){
                     SHAPEMOUSEOVER = false;
                 });
                 return this;
             },
         
             shapeMouseOut: function (callback) {
                 var jq = this;
                 zingchart.bind(this.el.id, "shape_mouseout", function(p){
                     $.extend(jq,{event:p});
                     callback.call(jq)
                 });
                 return this;
             },
         
             shapeHover: function (mouseover, mouseout) {
                 $(this).shapeMouseOver(mouseover).shapeMouseOut(mouseout);
                 return this;
             },
         
             // PLOT EVENTS ============================================================
             plotClick: function (callback) {
                 var jq = this;
                 zingchart.bind(this.el.id, "plot_click", function(p){
                     $.extend(jq,{event:p});
                     callback.call(jq)
                 });
                 return this;
             },
         
             plotDoubleClick: function (callback) {
                 var jq = this;
                 zingchart.bind(this.el.id, "plot_doubleclick", function(p){
                     $.extend(jq,{event:p});
                     callback.call(jq)
                 });
                 return this;
             },
         
             plotMouseOver: function (callback) {
                 var jq = this;
                 var PLOTMOUSEOVER = false;
                 zingchart.bind(this.el.id, "plot_mouseover", function(p){
                     if (!PLOTMOUSEOVER) {
                         $.extend(jq,{event:p});
                         PLOTMOUSEOVER = true;
                         callback.call(jq);
                     }
                 });
                 zingchart.bind(jq[0].id, "plot_mouseout", function(){
                     PLOTMOUSEOVER = false;
                 });
                 return this;
             },
         
             plotMouseOut: function (callback) {
                 var jq = this;
                 zingchart.bind(this.el.id, "plot_mouseout", function(p){
                     $.extend(jq,{event:p});
                     callback.call(jq)
                 });
                 return this;
             },
         
             plotHover: function (mouseover, mouseout) {
                 $(this).plotMouseOver(mouseover).plotMouseOut(mouseout);
                 return this;
             },
         
             plotShow: function (callback) {
                 var jq = this;
                 zingchart.bind(this.el.id, "plot_show", function(p){
                     $.extend(jq,{event:p});
                     callback.call(jq)
                 });
                 return this;
             },
         
             plotHide: function (callback) {
                 var jq = this;
                 zingchart.bind(this.el.id, "plot_hide", function(p){
                     $.extend(jq,{event:p});
                     callback.call(jq)
                 });
                 return this;
             },
         
             // TOGGLE EVENTS ==========================================================
             aboutShow: function (callback) {
                 var jq = this;
                 zingchart.bind(this.el.id, "about_show", function(p){
                     $.extend(jq,{event:p});
                     callback.call(jq)
                 });
                 return this;
             },
         
             aboutHide: function (callback) {
                 var jq = this;
                 zingchart.bind(this.el.id, "about_hide", function(p){
                     $.extend(jq,{event:p});
                     callback.call(jq)
                 });
                 return this;
             },
         
             bugReportShow: function (callback) {
                 var jq = this;
                 zingchart.bind(this.el.id, "bugreport_show", function(p){
                     $.extend(jq,{event:p});
                     callback.call(jq)
                 });
                 return this;
             },
         
             bugReportHide: function (callback) {
                 var jq = this;
                 zingchart.bind(this.el.id, "bugreport_hide", function(p){
                     $.extend(jq,{event:p});
                     callback.call(jq)
                 });
                 return this;
             },
         
             dimensionChange: function (callback) {
                 var jq = this;
                 zingchart.bind(this.el.id, "dimension_change", function(p){
                     $.extend(jq,{event:p});
                     callback.call(jq)
                 });
                 return this;
             },
         
             lensShow: function (callback) {
                 var jq = this;
                 zingchart.bind(this.el.id, "lens_show", function(p){
                     $.extend(jq,{event:p});
                     callback.call(jq)
                 });
                 return this;
             },
         
             lensHide: function (callback) {
                 var jq = this;
                 zingchart.bind(this.el.id, "lens_hide", function(p){
                     $.extend(jq,{event:p});
                     callback.call(jq)
                 });
                 return this;
             },
         
             sourceShow: function (callback) {
                 var jq = this;
                 zingchart.bind(this.el.id, "source_show", function(p){
                     $.extend(jq,{event:p});
                     callback.call(jq)
                 });
                 return this;
             },
         
             sourceHide: function (callback) {
                 var jq = this;
                 zingchart.bind(this.el.id, "source_hide", function(p){
                     $.extend(jq,{event:p});
                     callback.call(jq)
                 });
                 return this;
             },
         
             legendShow: function (callback) {
                 var jq = this;
                 zingchart.bind(this.el.id, "legend_show", function(p){
                     $.extend(jq,{event:p});
                     callback.call(jq)
                 });
                 return this;
             },
         
             legendHide: function (callback) {
                 var jq = this;
                 zingchart.bind(this.el.id, "legend_hide", function(p){
                     $.extend(jq,{event:p});
                     callback.call(jq)
                 });
                 return this;
             },
         
             legendMaximize: function (callback) {
                 var jq = this;
                 zingchart.bind(this.el.id, "legend_maximize", function(p){
                     $.extend(jq,{event:p});
                     callback.call(jq)
                 });
                 return this;
             },
         
             legendMinimize: function (callback) {
                 var jq = this;
                 zingchart.bind(this.el.id, "legend_minimize", function(p){
                     $.extend(jq,{event:p});
                     callback.call(jq)
                 });
                 return this;
             },
         
             zoomEvent: function (callback) {
                 var jq = this;
                 zingchart.bind(this.el.id, "zoom", function(p){
                     $.extend(jq,{event:p});
                     callback.call(jq)
                 });
                 return this;
             },
    
            
            /*********************************************************************
         ********************** HELPER METHODS *******************************
         *********************************************************************/
    
            setTitle: function (newtitle) {
                if (typeof(newtitle) == 'object') {
                    zingchart.exec(this.el.id, "modify", {
                        data: {
                            title: newtitle
                        }
                    });
                }
                else {
                    zingchart.exec(this.el.id, "modify", {
                        data: {
                            title: {
                                text: newtitle
                            }
                        }
                    });
                }
                return this;
            },
        
            setSubtitle: function (newtitle) {
                if (typeof(newtitle) == 'object') {
                    zingchart.exec(this.el.id, "modify", {
                        data: {
                            subtitle: newtitle
                        }
                    });
                }
                else {
                    zingchart.exec(this.el.id, "modify", {
                        data: {
                            subtitle: {
                                text: newtitle
                            }
                        }
                    });
                }
                return this;
            },
        
            setType: function (type) {
                zingchart.exec(this.el.id, "modify", {
                    "data": {
                        "type": type
                    }
                });
                zingchart.exec(this.el.id,"update");
                return this;
            },
        
            drawTrendline: function (opts) {
                var myId = this.el.id;
                calculate.call(this,0);
                function calculate(pindex) {
                    var nodes = $(this).getSeriesValues({
                        plotindex:pindex
                    });
                    var sxy = 0, sx = 0, sy = 0, sx2 = 0, l = 0;
                    var oScaleInfo = $(this).getObjectInfo({
                        object : 'scale',
                        name : 'scale-x'
                    });
                    var aScaleValues = oScaleInfo.values;
                    for (var i=0;i<nodes.length;i++) {
                        if (nodes[i][1] != undefined && typeof(nodes[i][1]) == 'number') {
                            sxy += nodes[i][0]*nodes[i][1];
                            sx += nodes[i][0];
                            sy += nodes[i][1];
                            sx2 += nodes[i][0]*nodes[i][0];
                            l++;
                        }
                        else {
                            sxy += nodes[i]*aScaleValues[i];
                            sx += aScaleValues[i];
                            sy += nodes[i];
                            sx2 += Math.pow(aScaleValues[i],2);
                            l++;
                        }
                    }
                    var b = (l * sxy - sx * sy) / (l * sx2 - sx * sx);
                    var a = (sy - b * sx) / l;
                    var oScaleInfo = $(this).getObjectInfo({
                        object : 'scale',
                        name : 'scale-x'
                    });
                    var aScaleValues = oScaleInfo.values, fScaleMin = aScaleValues[0], fScaleMax = aScaleValues[aScaleValues.length-1];
                    var aRange = [a + b*fScaleMin, a + b*fScaleMax];
                    var trendline = {
                        type : 'line',
                        lineColor : '#c00',
                        lineWidth : 2,
                        alpha : 0.75,
                        lineStyle : 'dashed',
                        label : {
                            text : ''
                        }
                    };
                    if (opts) {
                        $.extend(trendline,opts);
                    }
                    trendline.range = aRange;
                    var scaleY = $(this).getObjectInfo({
                        object:'scale',
                        name: 'scale-y'
                    });
                    var markers = scaleY.markers;
                    if (markers) {
                        markers.push(trendline);
                    }
                    else {
                        markers = [trendline];
                    }
                    $(this).modify({
                        "data": {
                            "scale-y": {
                                "markers": markers
                            }
                        }
                    });
                }
                return this;
            }
    
        });
  return ZingChart;

}));