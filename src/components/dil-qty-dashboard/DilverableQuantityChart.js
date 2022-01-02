import React, {useState, useEffect, useRef} from 'react';
import LoadingIndicator from '../uic/LoadingIndicator';
import * as dfd from "danfojs/src/index";
import Table from '../uic/Table';
import DataTable from './DataTable';
import styled from 'styled-components';
import Chart from '../chart/Chart';
import Select from 'react-select';
import _ from 'lodash';

const Container = styled.div`
	display: flex;
	flex-direction: column;
	gap: 10px;
	align-items: center;
`;

const _getXAxis = (xAxis) => {
	return _.map(xAxis.data, date => {
		const date_str = _.toString(date);
		const _date = `${date_str.substring(0, 4)}-${date_str.substring(4, 6)}-${date_str.substring(6, 8)}`;
		return new Date(_date).getTime()
	});
}

const _getChartProps = (df, stock, customMA) => {
	if (!df) {
		return;
	}

	let xAxis = _getXAxis(df['Date'])
	
	const ohlc_data = _.zip(
		xAxis,
		df["Open Price"].data,
		df["High Price"].data,
		df["Low Price"].data,
		df["Close Price"].data,
	);

	const chartProps = {
		config: {
			yAxis: [{
				title: {text: 'OHLC'},
				opposite: false
			}],
			legend: {
				enabled: true
			},
			title: {
				text: stock
			},
			series: [{
				id: 'ohlc',
				data: ohlc_data,
				type: 'candlestick',
				name: 'OHLC Series'
			}]
		}
	}

	return chartProps
}

const DilverableQuantityChart = ({stock}) => {
	const [df, setDf] = useState(false);
	const [customMA, setCustomMA] = useState(false);

	const consideredColumns = _.slice(df.columns, 14) 
	consideredColumns.push('Deliverable Qty');

	const url = `https://raw.githubusercontent.com/govinda18/Dilverable-Quantity-Database/master/processed-data/${stock}.csv`;
	const dashboard_url = `https://github.com/govinda18/Dilverable-Quantity-Database/blob/master/dashboard-stocks/stock-wise/${stock}.csv`

	useEffect(() => {
		const _setDf = async () => {
			const _df = await dfd.read_csv(url);
			setDf(_df);
		}
		_setDf();
	}, [stock])

	const chartObj = useRef();

	const chartProps = _.merge(
		_getChartProps(df, stock, customMA),
		{
			config: {
				chart: {
					events: {
						load: function(chart) {
							chartObj.current = this;
						}
					}
				}
			}
		}
	);

	const options = _.map(consideredColumns, (col) => ({
		label: col,
		value: col
	}))

	const _plotSeries = (selection, changeEvt) => {
		if (changeEvt.action == 'select-option') {
			chartObj.current.addAxis({
				id: `${changeEvt.option.value}-axis`,
				title:  {text: changeEvt.option.value}
			})
			chartObj.current.addSeries({
				data: _.zip(_getXAxis(df['Date']), df[changeEvt.option.value].data),
				name: changeEvt.option.value,
				yAxis: `${changeEvt.option.value}-axis`,
				id: changeEvt.option.value
			})
		} else {
			chartObj.current.get(changeEvt.removedValue.value).remove();
			chartObj.current.get(`${changeEvt.removedValue.value}-axis`).remove();
		}
	}

	return (
		<>
		{
			!df 
			? <LoadingIndicator text="Fetching data, Please wait" />
			: (
				<Container>
					<h5><a target="_blank" href={url}>Link to Full Data</a></h5>
					<h5><a target="_blank" href={dashboard_url}>Stock Dashboard Link</a></h5>
					<DataTable df={df} />
				</Container>
			)
		}
		<div 
			style={{
				display: 'flex', 
				gap: '20px', 
				alignItems: 'center'
			}}
		>
			<Select options={options} isMulti onChange={_plotSeries} width={200}/>		
		</div>
		<Chart {...chartProps} />
		</>
	)
}

export default DilverableQuantityChart;