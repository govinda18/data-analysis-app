import React from 'react';
import ReactDOM from 'react-dom';
import DataAnalyzer from './components/data-analyzer/DataAnalyzer';
import '@fortawesome/fontawesome-free/css/all.min.css'; 
import 'bootstrap-css-only/css/bootstrap.min.css'; 
import 'mdbreact/dist/css/mdb.css';
import './index.css';
import FixedNavbarExample from './components/uic/NavBar';

const Main = () => {
	return (
		<>
			<FixedNavbarExample />
			<DataAnalyzer />
		</>
	)
}

ReactDOM.render(
	<Main />,
	document.getElementById('root')
);
