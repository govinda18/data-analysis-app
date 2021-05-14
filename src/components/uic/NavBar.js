import React from 'react';
import { MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavbarToggler, MDBCollapse, MDBNavItem, MDBNavLink, MDBIcon } from 'mdbreact';
import { BrowserRouter as Router } from 'react-router-dom';

class FixedNavbarExample extends React.Component {
	constructor(props) {
			super(props);
			this.state = {
					collapse: false,
			};
			this.onClick = this.onClick.bind(this);
	}

	onClick() {
		this.setState({
				collapse: !this.state.collapse,
			});
	}

	render() {
		const bgPink = {backgroundColor: 'black'}
		return(
			<div>
				<Router>
					<header>
						<MDBNavbar style={bgPink} dark expand="md" >
							<MDBNavbarBrand href="/">
									<strong>Data Analyzer</strong>
							</MDBNavbarBrand>
{/*							<MDBNavbarToggler onClick={ this.onClick } />
							<MDBCollapse isOpen = { this.state.collapse } navbar>
								<MDBNavbarNav left>
									<MDBNavItem active>
											<MDBNavLink to="#">Home</MDBNavLink>
									</MDBNavItem>
									<MDBNavItem>
											<MDBNavLink to="#">Features</MDBNavLink>
									</MDBNavItem>
									<MDBNavItem>
											<MDBNavLink to="#">Pricing</MDBNavLink>
									</MDBNavItem>
									<MDBNavItem>
										<MDBNavLink to="#">Options</MDBNavLink>
									</MDBNavItem>
								</MDBNavbarNav>
								<MDBNavbarNav right>
									<MDBNavItem>
										<MDBNavLink to="#"><MDBIcon fab icon="facebook-f" /></MDBNavLink>
									</MDBNavItem>
									<MDBNavItem>
										<MDBNavLink to="#"><MDBIcon fab icon="twitter" /></MDBNavLink>
									</MDBNavItem>
									<MDBNavItem>
										<MDBNavLink to="#"><MDBIcon fab icon="instagram" /></MDBNavLink>
									</MDBNavItem>
								</MDBNavbarNav>
							</MDBCollapse>*/}
						</MDBNavbar>
					</header>
				</Router>
			</div>
		);
	}
}

export default FixedNavbarExample;