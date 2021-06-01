import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

const LoadingIndicator = ({text}) => {
	return (
		<div style={{display: 'flex', gap: '20px'}}>
			<CircularProgress />
			<div>{text}</div>
		</div>
	)
}

export default LoadingIndicator;