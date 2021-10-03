import React, {useState, useEffect} from 'react';
import LoadingIndicator from '../uic/LoadingIndicator';
import * as dfd from "danfojs/src/index";
import Table from '../uic/Table';
import DataTable from './DataTable';
import styled from 'styled-components';
import Chart from '../chart/Chart';

const Container = styled.div`
	display: flex;
	flex-direction: column;
	gap: 10px;
	align-items: center;
`;

const _getChartProps = (df, stock, customMA) => {
	if (!df) {
		return;
	}

	let xAxis = df["Date"];
	xAxis = _.map(xAxis.data, date => {
		const date_str = _.toString(date);
		const _date = `${date_str.substring(0, 4)}-${date_str.substring(4, 6)}-${date_str.substring(6, 8)}`;
		return new Date(_date).getTime()
	})
	
	const ohlc_data = _.zip(
		xAxis,
		df["Open Price"].data,
		df["High Price"].data,
		df["Low Price"].data,
		df["Close Price"].data,
	);

	const dilQty = _.zip(
		xAxis,
		df["Deliverable Qty"].data
	);

	const chartProps = {
		config: {
			yAxis: [{
				title: {text: 'OHLC'},
				opposite: false
			}, {
				title: {text: 'Dil Qty'}
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
			}, {
				id: 'dilqty',
				data: dilQty,
				name: 'Daily Dil Qty',
				yAxis: 1
			}]
		}
	}
	customMA = _.toNumber(customMA);
	if (customMA) {
		chartProps.config.series.push({
				type: 'sma',
				linkedTo: 'dilqty',
				name: `Dil Qty ${customMA} days MA`,
				visible: true,
				showInLegend: true,
				params: {
					period: customMA
				},
				yAxis: 1			
		})
	}

	return chartProps;
}

const DilverableQuantityChart = ({stock}) => {
	const [df, setDf] = useState(false);
	const [customMA, setCustomMA] = useState(false);

	const url = `https://raw.githubusercontent.com/govinda18/Dilverable-Quantity-Database/master/processed-data/${stock}.csv`;

	useEffect(() => {
		const _setDf = async () => {
			const _df = await dfd.read_csv(url);
			setDf(_df);
		}
		_setDf();
	}, [stock])

	return (
		<>
		{
			!df 
			? <LoadingIndicator text="Fetching data, Please wait" />
			: (
				<Container>
					<h5><a target="_blank" href={url}>Link to Data</a></h5>
					<DataTable df={df} />
				</Container>
			)
		}
		<div style={{display: 'flex', gap: '20px', alignItems: 'center'}}>
			<div> Custom Moving Average </div>
			<input 
				style={{padding: '4px'}} 
				placeholder="Enter Period" 
				type="number"
				onBlur={(evt) => setCustomMA(evt.target.value)} 
			/>
		</div>
		<Chart {..._getChartProps(df, stock, customMA)} />
		</>
	)
}

export default DilverableQuantityChart;