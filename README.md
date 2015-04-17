Backbone.ZingChart
===================

A Backbone JS extension for interacting with ZingChart

## About backbone.zingchart

Backbone.ZingChart is a Backbone JS extension for simplified interactions with ZingChart.

## Example

View the files in the example directory for working samples.

You much have the ZingChart library loaded. We suggest you use our [new, fandangled CDN](http://cdn.zingchart.com/) to keep up to date with the latest build.

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
                width: 500,
                height: 400
            });


// Render the Chart
// Note that the el must already be added to the DOM
var zingChartView = new ZingChart.ZingChartView({model: this.zc, el: $('#chartDiv')});
zingChartView.render();
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
		<td>Binds the ZingChart event to the given callback.  [View ZingChart Events](http://www.zingchart.com/docs/api/api-events/)View all eventname options at: </td>
	</tr>
	<tr>
		<td>exec</td>
		<td>apimethod, apioptions</td>
		<td>The results of the API call</td>
		<td>Calls a ZingChart API method and passes it the given options.  [View ZingChart Methods](http://www.zingchart.com/docs/api/api-methods/) </td>
	</tr>
	
</table>
