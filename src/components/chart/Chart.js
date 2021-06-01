import React, {useRef, useEffect, useState} from 'react';
import _ from 'lodash';
import Highcharts from 'highcharts/highstock';
import noData from 'highcharts/modules/no-data-to-display';
import exporting from 'highcharts/modules/exporting';
import indicators from 'highcharts/indicators/indicators.src';
import HighchartsReact from 'highcharts-react-official';
import Modal from '../uic/Modal';

noData(Highcharts);
exporting(Highcharts);
indicators(Highcharts);

console.log(Highcharts.seriesTypes)

const DEFAULT_OPTIONS = {
	title: {
		text: 'Data Analysis Chart'
	},
	chart: {
		zoomType: 'x'
	},
	plotOptions: {
		series: {
			dataGrouping: {
				enabled: false
			}
		}
	},
	exporting: {
		buttons: {
			contextButtons: {
				enabled: true
			}
		}
	},
	series: []
}

const Chart = (props) => {
	const chartRef = useRef();
	const [modelProps, setModalProps] = useState({
		isOpen: false
	});

	useEffect(() => {
		if (_.get(chartRef, 'current.chart')) {
			const chart = chartRef.current.chart;
			if (chart.container.getAttribute('contextMenuEventAdded') || !props.pointData) {
				return;
			}

			chart.container.setAttribute('contextMenuEventAdded', true);
			chart.container.addEventListener('dblclick', evt => {
				evt.preventDefault();
				if (chart.hoverPoint) {
					const content = props.pointData(chart.hoverPoint);
					setModalProps({isOpen: true, content, header: new Date(chart.hoverPoint.x).toString().slice(0, 15)});					
				}
			})			
		}
	})

	const _toggle = () => setModalProps({isOpen: false});

	return (
		<>
			<Modal {...modelProps} toggle={_toggle}/>
			<HighchartsReact 
				ref={chartRef}
				options={_.merge({}, props.config, DEFAULT_OPTIONS)} 
				highcharts={Highcharts} 
				constructorType={'stockChart'}
			/>
		</>
	);
}

export default Chart;		