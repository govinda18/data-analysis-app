import React, {useState, useMemo} from 'react';
import _ from 'lodash';
import Select from '../uic/Select';
import styled from 'styled-components';
import Chart from '../chart/Chart';
import * as dfd from "danfojs/src/index";
import FilterForm from './FilterForm';
import Table from '../uic/Table';

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
	df.set_index({key: xData, inplace: true});

	yData = _.map(yData, (y) => _.toNumber(y))

	const data = _.filter(_.zip(xData, yData), ([x, y]) => y > 0);

	_.set(chartProps, 'config.series.0.data', data);
	_.set(chartProps, 'config.chart.type', chartType);
	return chartProps;
}

const _filterDf = (df, filters) => {
	let filteredDf = df;
	_.forEach(filters, (val, col) => {
		try {
			filteredDf = filteredDf.query({
				column: col,
				is: '==',
				to: val
			})			
		} catch {}
	})
	return filteredDf;
}

const _getXAxis = (df) => {
	return _.find(df.columns, (col) => _.includes(_.lowerCase(col), 'date'));
}

const _getPointData = (df, point) => {
	return <Table df={df.loc({rows: [point.x]}).T}  />
}

const Analyzer = ({data}) => {
	const [chartSelectState, setChartSelectState] = useState({
		chartType: 'line',
		yAxis: null
	})
	const [filters, setFilters] = useState({});

	const df = useMemo(() => csvToDf(data), [data]);
	const xAxis = _getXAxis(df);

	if (!xAxis) {
		return <center>No Date Column Found. Only Timeseries Data is currently supported</center>;
	}

	const chartProps = getChartProps(_filterDf(df, filters), {
		...chartSelectState,
		xAxis
	});

	const _getCategoryData = () => {
		const categories = _.filter(
			df.columns, 
			(col) => 
			(df[col].nunique() * 100) / df[col].count() < 5
		)

		return _.map(categories, (cat) => ({
			col: cat,
			values: _.sortBy(df[cat].unique().data)
		}));	
	}

	return (
		<TopContainer>
			<FilterForm categories={_getCategoryData()} onSubmit={setFilters}/>
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
			<Chart {...chartProps} pointData={(point) => _getPointData(df, point)}/>
		</TopContainer>
	);
}

export default Analyzer;