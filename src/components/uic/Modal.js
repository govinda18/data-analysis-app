import React from 'react';
import { MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter } from 'mdbreact';

const Modal = ({isOpen, content, header, toggle}) => {
	return (
		<MDBContainer>
			<MDBModal isOpen={isOpen} toggle={toggle}>
				<MDBModalHeader toggle={toggle}>{header}</MDBModalHeader>
				<MDBModalBody>
					{content}
				</MDBModalBody>
		        <MDBModalFooter>
		          <MDBBtn color="secondary" onClick={toggle}>Close</MDBBtn>
		        </MDBModalFooter>
			</MDBModal>
		</MDBContainer>
	);
}

export default Modal;