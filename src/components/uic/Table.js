import React from 'react';
import styled from 'styled-components';

const TableContainer = styled.div`
	padding: 10px;
	display: table;
`

const Table = ({df}) => {
	return(
		<TableContainer>
			<table>
				<tr>
					{_.map(df.columns, (col) => <th>{col}</th>)}
				</tr>
				{_.map(df.values, (row, idx) => (
					<tr>
						<td>{df.index[idx]}</td>
						{_.map(row, cell => <td>{cell}</td>)}
					</tr>
				))}
			</table>
		</TableContainer>
	)
}

export default Table;