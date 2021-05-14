import React, {useState} from 'react';
import _ from 'lodash';
import Select from '../uic/Select';
import styled from 'styled-components';
import Chart from '../chart/Chart';
import * as dfd from "danfojs/src/index";
import FilterForm from './FilterForm';

const SelectContainer = styled.div`
	display: flex;
	gap: 20px;
	align-items: center;
	margin: 20px;
`

const TopContainer = styled.div`
	padding: 20px;
`

const csvToDf = (csvData) => {
	let data = _.split(csvData, '\n');
	data = _.map(data, (d) => _.split(d, ','));

	data = _.map(
		data, 
		(d) => _.map(d, (x) => x.replace(/[\u0000-\u001F\u007F-\u009F]/g, ""))
	)

	const columns = data[0];
	data.splice(0, 1);

	const df = new dfd.DataFrame(data, {columns});
	return df;
}

const getChartProps = (df, {chartType, xAxis, yAxis}) => {
	if (!chartType || !xAxis || !yAxis || !df[yAxis]) {
		return;
	}

	const chartProps = {};

	let xData = df[xAxis].data;
	let yData = df[yAxis].data;

	xData = dfd.to_datetime(df[xAxis]);	
	xData = _.map(xData.date_list, (date) => date.getTime());	

	yData = _.map(yData, (y) => _.toNumber(y))

	const data = _.zip(xData, yData);

	_.set(chartProps, 'config.series.0.data', data);
	_.set(chartProps, 'config.chart.type', chartType);
	return chartProps;
}

const Analyzer = ({data}) => {
	const [chartSelectState, setChartSelectState] = useState({
		chartType: 'line',
		yAxis: null
	})

	const df = csvToDf(data);
	const xAxis = _.find(df.columns, (col) => _.includes(_.lowerCase(col), 'date'));

	if (!xAxis) {
		return <center>No Date Column Found. Only Timeseries Data is currently supported</center>;
	}

	const chartProps = getChartProps(df, {
		...chartSelectState,
		xAxis
	});

	return (
		<TopContainer>
			<SelectContainer>
				<div>Select Chart Options: </div>
				<Select 
					options={[{
						label: 'Line',
						val: 'line'
					}, {
						label: 'Column',
						val: 'column'
					}, {
						label: 'Area',
						val: 'area'
					}, {
						label: 'AreaSpline',
						val: 'areaspline'
					}, {
						label: 'OHLC',
						val: 'OHLC'
					}]}
					defaultValue={'line'}
					onChange={(evt) => {
						evt.persist();
						setChartSelectState(state => ({
							...state,
							chartType: evt.target.value
						}))						
					}}
				/>
				<Select 
					label="Select Y Axis: "
					options={_.map(_.sortBy(df.columns), (val) => ({val, label: val}))}
					onChange={(evt) => {
						evt.persist();
						setChartSelectState(state => ({
							...state,
							yAxis: evt.target.value
						}))						
					}}
				/>
			</SelectContainer>
			<FilterForm data={df} />
			<Chart {...chartProps}/>
		</TopContainer>
	);
}

export default Analyzer;