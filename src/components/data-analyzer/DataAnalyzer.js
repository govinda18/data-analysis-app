import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import _ from 'lodash';
import Analyzer from './Analyzer';
import FileUpload from '../uic/FileUpload';
import styled from 'styled-components';

const DataAnalyzerDiv = styled.div`
	display: flex;
	flex-direction: column;
	gap: 20px;
	align-items: center;
	padding: 20px;
`

const FileUploadDiv = styled.div`
	width: 400px;
`

const DataAnalyzer = () => {
	const [fileData, setFileData] = useState(false);

	const _handleFileUpload = (evt) => {
		const file = evt.target.files[0];
		const reader = new FileReader();
		reader.readAsBinaryString(file);
		reader.onload = (evt) => {
			const csvData = evt.target.result;
			setFileData(csvData);
		}
	}

	return (
		<>
			<DataAnalyzerDiv>
				{!fileData && <h1>Upload Data</h1>}
				<FileUploadDiv>
					<FileUpload 
					  	accept=".csv, .xlxs"
					    type="file"
					    hidden
					    onChange={_handleFileUpload}
					/>				
				</FileUploadDiv>
			</DataAnalyzerDiv>
			{fileData && <Analyzer data={fileData} />}
		</>
	)
}

export default DataAnalyzer;