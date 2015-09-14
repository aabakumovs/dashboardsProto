import React, { Component } from 'react';
import Chart from '../Chart/Chart';
import $ from 'jquery';

class ChartContainer extends React.Component {
	constructor() {
		super();
		this.state = { data: [] }
	}
	componentDidMount() {
		$.ajax({
			url: `../JSON-files/${this.props.dbname}.json`,
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

export default ChartContainer;
