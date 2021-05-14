import React, {useState} from 'react';
import _ from 'lodash';
import styled from 'styled-components';
import Select from '../uic/Select';
import { MDBBtn } from "mdbreact";

const FilterFormContainer = styled.div`
	padding: 20px;

	header {
		margin-bottom: 20px;
	}

	.filters {
		display: flex;
		gap: 20px;
		flex-wrap: wrap;
		justify-content: center;
	}

	div {
		flex-basis: 15%;
	}

	.buttons {
		margin: 20px;
		display: flex;
		justify-content: center;
	}
`

const FilterForm = ({categories, onSubmit}) => {
	const [filterState, setFilterState] = useState({});


	const _renderSelector = ({col, values}) => {
		return (
			<Select
				label={`Select ${col}`}
				options={_.map(values, val => ({val, label: val}))}
				value={_.get(filterState, col, '')}
				onChange={(evt) => {
					evt.persist();

					if (evt.target.value === "false") {
						return;
					}

					setFilterState(state => ({
						...state,
						[col]: evt.target.value
					}))
				}}
			/>
		);
	}

	return (
		<FilterFormContainer>
			<header>Apply Filters</header>
			<div className="filters">
				{_.map(categories, _renderSelector)}
			</div>
			<div className="buttons">
				<MDBBtn onClick={() => onSubmit(filterState)}>Submit</MDBBtn>
				<MDBBtn color="info" onClick={() => setFilterState({})}>Reset</MDBBtn>
			</div>
		</FilterFormContainer>
	);
}

export default FilterForm;