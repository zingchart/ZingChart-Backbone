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