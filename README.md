Backbone.ZingChart
===================

A Backbone JS extension for interacting with ZingChart

## About backbone.zingchart

Backbone.ZingChart is a Backbone JS extension for simplified interactions with ZingChart.  

## Example

View the files in the example directory for working samples.

You must have the ZingChart library loaded. We suggest you use our [new, fandangled CDN](http://cdn.zingchart.com/) to keep up to date with the latest build.

In addition, you must include this library.  We support inclusion through require.js and you can view an example in the examples directory.  For now, we will do a simple script include.

```
<script src="cdn.zingchart.com/zingchart-html5-min.js"></script>
<script src="cdn.zingchart.com/backbone-zingchart-min.js"></script>
```

A simple example:

```javascript
// Create ZingChart Model Passing in Data to Plot
var chartData = new ZingChart.ZingChartModel(
            {
                data: [[3,2,3,3,9] , [1,2,3,4,5]],
                charttype: 'bar',
                width: 500,
                height: 400
            });


// Render the Chart
// Note that the el must already be added to the DOM
var chartView = new ZingChart.ZingChartView({model: chartData, el: $('#chartDiv')});
zingChartView.render();
```
Passing in a full JSON structure:

```javascript
var json = {    
            "type":"pie",
            "series":[
                {
                    "text":"Apples",
                    "values":[5]
                },
                {
                    "text":"Oranges",
                    "values":[8]
                },
                {
                    "text":"Bananas",
                    "values":[22]
                }
            ]
        };
        
var chartData = new ZingChart.ZingChartModel(
            {
                json: json
            });


// Render the Chart
// Note that the el must already be added to the DOM
var chartView = new ZingChart.ZingChartView({model: chartData, el: $('#chartDiv')});
zingChartView.render();


```

After the chart is rendered, it is possible to change the json or data simply by updating the ZingChartModel.json or ZingChartModel.data property respectively.

Change the Chart Data:

```javascript
var newData = [
					[50,32,36,8,10],
					[34,64,23,54,41],
					[12,43,51,39,29]
				]
chartData.set('data', newData);

```

Change the entire Chart JSON:

```javascript
var newJSON = {
		"type":"area",
    	"series":[
        	{
            	"values":[11,36,7,44,11,28,42,26,13,32,12,24,16,11,43,39]
        	},
        	{
            	"values":[21,29,14,16,28,35,21,18,11,7,4,9,25,15,33,13]
        	}
    	]
};  
chartData.set('json', newJSON);

```

The Extension includes full access to the ZingChart API method and events.  

You can access the API methods by calling the view's exec method.  

```javascript
var values = [39,26,54,28,51,44];

chartView.exec('addplot', {
	data : {
   		values : values
   }
 });
  
```

If you include the extended javascript file, there is individual access to every API method.

```javascript
var values = [39,26,54,28,51,44];

chartView.addPlot({
	data:{
   		values: values
   }
});

```

You can access the API events by using the view's bind method to bind to the ZingChart events.

```javascript
chartView.bind('legend_item_click', myClickCallback);

```


If you include the extended javascript file, there is individual access to all of the events.

```javascript
chartView.legendItemClick(myClickCallback);
```

### ZingChart.ZingChartModel
Represents ZingChart object. Extends Backbone.Model.
                
#### Properties
<table>
	<tr>
		<td>Property</td><td>Default Value</td><td>Description</td>
	</tr>
	<tr>
		<td>charttype</td>
		<td>line</td>
		<td>The chart type.  Only used if rendering from data and not from full JSON</td>
	</tr>
	<tr>
		<td>data</td>
		<td>[]</td>
		<td>Array of chart data.  A chart can be automatically generated based soley on the data.</td>
	</tr>
	<tr>
		<td>height</td>
		<td>480</td>
		<td>The height of the rendered chart.</td>
	</tr>
	<tr>
		<td>json</td>
		<td>{}</td>
		<td>A complete ZingChart JSON packet.</td>
	</tr>
    <tr>
		<td>width</td>
		<td>640</td>
		<td>The width of the rendered chart.</td>
	</tr>
</table>

### ZingChart.ZingChartView

View controller for a ZingChart.ZingChartView. Extends Backbone.View.

#### Properties

<table>
	<tr>
		<td>Property</td>
		<td>Default Value</td>
		<td>Description</td>
	</tr>
	<tr>
		<td>el</td>
		<td></td>
		<td>The el where the chart should be rendered.  The el must already be included in the DOM.</td>
	</tr>
    <tr>
		<td>model</td>
		<td>ZingChart.ZingChartView</td>
		<td>The model that is used to generate the ZingChart.</td>
	</tr>
	
</table>


#### Methods
<table>
	<tr>
		<td>Method</td>
		<td>Parameters</td>
		<td>Return Value</td>
		<td>Description</td>
	</tr>
	<tr>
		<td>render</td>
		<td></td>
		<td></td>
		<td>Renders the ZingChart in the given el based on the ZingChartModel data.</td>
	</tr>
	<tr>
		<td>bind</td>
		<td>eventname, callback</td>
		<td>this</td>
		<td>Binds the ZingChart event to the given callback.  <a href="http://www.zingchart.com/docs/api/api-events/">View ZingChart Events</a> </td>
	</tr>
	<tr>
		<td>exec</td>
		<td>apimethod, apioptions</td>
		<td>The results of the API call</td>
		<td>Calls a ZingChart API method and passes it the given options.  <a href="http://www.zingchart.com/docs/api/api-methods/">View ZingChart Methods</a> </td>
	</tr>
	
</table>
