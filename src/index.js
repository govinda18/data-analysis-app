import React from 'react';
import ReactDOM from 'react-dom';
import DataAnalyzer from './components/data-analyzer/DataAnalyzer';
import DilQtyDashboard from './components/dil-qty-dashboard/Dashboard';
import '@fortawesome/fontawesome-free/css/all.min.css'; 
import 'bootstrap-css-only/css/bootstrap.min.css'; 
import 'mdbreact/dist/css/mdb.css';
import './index.css';
import NavBar from './components/uic/NavBar';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

const Main = () => {
	return (
		<Router>	
			<NavBar />
			<Switch>
				<Route path="/dil-qty-dashboard">
					<DilQtyDashboard />
				</Route>
				<Route path="/">
					<DataAnalyzer />
				</Route>
			</Switch>
		</Router>
	)
}

ReactDOM.render(
	<Main />,
	document.getElementById('root')
);
