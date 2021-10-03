import React, {useState, useEffect} from 'react';
import _ from 'lodash';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import styled from 'styled-components';
import DilverableQuantityChart from './DilverableQuantityChart';
import LoadingIndicator from '../uic/LoadingIndicator';

const VisualizerContainer = styled.div`
	display: flex;
	flex-direction: column;
	gap: 20px;
`

const Visualizer = () => {
	const [metadata, setMetadata] = useState(false);
	const [stock, setStock] = useState(false);

	useEffect(() => {
		if (metadata) {
			return;
		}

		fetch("https://raw.githubusercontent.com/govinda18/Dilverable-Quantity-Database/master/metadata.json")
		.then(async res => {
			const fetched_metadata = await res.json();
			setMetadata(fetched_metadata);
		})
	}, [])

	return metadata
	? (
		<VisualizerContainer>
			<Autocomplete
				style={{ width: 300 }}
				options={metadata["stocks"]}
				autoHighlight
				getOptionLabel={(option) => option}
				renderOption={(option) => option}
				renderInput={(params) => (
					<TextField
						{...params}
						label="Choose a stock"
						variant="outlined"
						inputProps={{
						...params.inputProps,
						autoComplete: 'new-password', // disable autocomplete and autofill
						}}
					/>
				)}
				onChange={(evt, value) => setStock(value)}
			/>
			{stock && <DilverableQuantityChart stock={stock} />}
		</VisualizerContainer>
	)
	: (
		<LoadingIndicator text="Fetching Stock Symbols, Please wait."/>
	);
}

export default Visualizer;