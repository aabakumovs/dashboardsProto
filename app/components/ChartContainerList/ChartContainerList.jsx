import React, { Component } from 'react';
import $ from 'jquery';
import Utils from '../../util/Util';
import ChartContainer from '../ChartContainer/ChartContainer';

class ChartContainerList extends React.Component {
	constructor() {
		super();
		this.state = { charts: [] }
	}
	componentDidMount() {
		$.ajax({
			url: "../JSON-files/charts.json",
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
				return <ChartContainer key={Utils.getUniqueId()} type={chartValue.type} dbname={chartValue.dbname} />;
			})}
			</div>
			);
	}
}

export default ChartContainerList;
