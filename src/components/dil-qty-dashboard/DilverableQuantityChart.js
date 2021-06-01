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

const _getChartProps = (df) => {
	if (!df) {
		return;
	}

	let xAxis = df[" DATE1"];
	xAxis = _.map(xAxis.data, date => new Date(date).getTime())
	
	const ohlc_data = _.zip(
		xAxis,
		df[" OPEN_PRICE"].data,
		df[" HIGH_PRICE"].data,
		df[" LOW_PRICE"].data,
		df[" CLOSE_PRICE"].data,
	);

	const dilQty = _.zip(
		xAxis,
		df[" DELIV_QTY"].data
	);

	return {
		config: {
			yAxis: [{
				title: 'OHLC',
				opposite: false
			}, {
				title: 'Dil Qty'
			}],
			legend: {
				enabled: true
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
			}, {
				type: 'sma',
				linkedTo: 'dilqty',
				name: 'Dil Qty 7 days MA',
				visible: false,
				showInLegend: true,
				params: {
					period: 7
				},
				yAxis: 1
			}, {
				type: 'sma',
				linkedTo: 'dilqty',
				name: 'Dil Qty 10 days MA',
				visible: false,
				showInLegend: true,
				params: {
					period: 10
				},
				yAxis: 1
			}, {
				type: 'sma',
				linkedTo: 'dilqty',
				name: 'Dil Qty 30 days MA',
				visible: false,
				showInLegend: true,
				params: {
					period: 30
				},
				yAxis: 1
			}]
		}
	}
}

const DilverableQuantityChart = ({stock}) => {
	const [df, setDf] = useState(false);

	const url = `https://raw.githubusercontent.com/govinda18/Dilverable-Quantity-Database/master/eq-data/${stock}.csv`;

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
		<Chart {..._getChartProps(df)} />
		</>
	)
}

export default DilverableQuantityChart;