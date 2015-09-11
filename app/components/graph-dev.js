'use strict';
function GetUniqueId() {
	let uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
		let r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
		return v.toString(16);
	});
	return uuid;
}
class ChartsList extends React.Component {
	constructor() {
		super();
		this.state = { charts: [] }
	}
	componentDidMount() {
		$.ajax({
			url: "http://localhost:8080/JSON-files/charts.json",
			dataType: 'json',
			success: function(data) {
				this.setState({charts: data});
			}.bind(this)
		});
	}
	render() {
		return(
			<div>
			{this.state.charts.map(function(chartValue){
				return <ChartContainer key={GetUniqueId()} type={chartValue.type} dbname={chartValue.dbname} />;
			})}
			</div>
			);
	}
}
class ChartContainer extends React.Component {
	constructor() {
		super();
		this.state = { data: [] }
	}
	componentDidMount() {
		$.ajax({
			url: `http://localhost:8080/JSON-files/${this.props.dbname}.json`,
			dataType: 'json',
			success: function(data) {
				this.setState({data: data});
			}.bind(this)
		});
	}
	render() {
		return <Chart data={this.state.data} type={this.props.type} />;
	}
}
class Chart extends React.Component {
	constructor(props) {
		super(props);
		this.state = {chart: null}
	}
	componentDidUpdate() {
		this.renderChart({chartType: this.props.type, chartData: this.props.data});
	}
	render() { 
		return <div>
				<div ref="chartContainer"></div>
				<button onClick={this.changeChartType.bind(this,'pie')}>Change chart to pie</button>
				<button onClick={this.changeChartType.bind(this, 'bar')}>Change chart to bar </button>
				<button onClick={this.changeChartType.bind(this, 'donut')}>Change chart to donut</button>
			   </div>
	}
	renderChart({ chartType, chartData }) {
		let modifiedData = {};
		let chartKeys = [];

		this.props.data.forEach(elem => {
			chartKeys.push(elem.label);
			modifiedData[elem.label] = elem.value;
		});

		let chart = c3.generate({
			bindto: React.findDOMNode(this.refs.chartContainer),
			data: {
				json: [ modifiedData ],
				keys: {
					value: chartKeys
				},
				type: chartType
			}
		});
		this.state.chart = chart;
	}
	changeChartType(chartType) {
		console.log('aaaa');
		console.log(chartType);
		if(this.state.chart) {
			this.state.chart.transform(chartType);
		}
	}
}

React.render(
	<ChartsList />,
	document.querySelector('#container')
	);
