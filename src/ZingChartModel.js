    if (typeof ZingChart === 'undefined'){ZingChart = {}};
    ZingChart.ZingChartModel = Backbone.Model.extend({
    
        defaults:{
            width: 640,
            height: 480,
            json: {},
            data: [],
            charttype: 'line',
            events: null
        }
    
    });