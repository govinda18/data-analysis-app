import React from 'react';
import _ from 'lodash';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';


const DataTable = ({df}) => {
	const attrs = [" CLOSE_PRICE", " TTL_TRD_QNTY", " DELIV_QTY"];
	
	const _getMean = (col, days) => {
		return _.round(df[col].tail(days).mean(), 2);
	}

	return (
    	<TableContainer component={Paper}>
      		<Table>
        		<TableHead>
          			<TableRow>
            			<TableCell>Attribute</TableCell>
            			<TableCell align="right">Last 1 day</TableCell>
            			<TableCell align="right">Last 10 days</TableCell>
            			<TableCell align="right">Last 30 days</TableCell>
            			<TableCell align="right">Last 100 days</TableCell>
            			<TableCell align="right">Last 300 days</TableCell>
          			</TableRow>
        		</TableHead>
			<TableBody>
          {_.map(attrs, (col) => (
            	<TableRow key={col}>
              		<TableCell component="th" scope="row">
                		{col}
              		</TableCell>
              		<TableCell align="right">{_getMean(col, 1)}</TableCell>
					<TableCell align="right">{_getMean(col, 10)}</TableCell>
					<TableCell align="right">{_getMean(col, 30)}</TableCell>
					<TableCell align="right">{_getMean(col, 100)}</TableCell>
					<TableCell align="right">{_getMean(col, 300)}</TableCell>
            	</TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default DataTable;