import React, {useRef} from 'react';
import _ from 'lodash';
import Highcharts from 'highcharts/highstock';
import noData from 'highcharts/modules/no-data-to-display';
import HighchartsReact from 'highcharts-react-official';

noData(Highcharts);

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
	series: []
}

const Chart = (props) => {
	return (
		<HighchartsReact 
			options={_.merge({}, props.config, DEFAULT_OPTIONS)} 
			highcharts={Highcharts} 
			constructorType={'stockChart'}
		/>
	);
}

export default Chart;		