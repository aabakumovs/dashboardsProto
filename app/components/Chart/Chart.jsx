import React, { Component } from 'react';

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

export default Chart;
