import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import styled from 'styled-components';
import * as dfd from "danfojs/src/index";
import Visualizer from './Visualizer';
import Highlights from './Highlights';

const DashBoardContainer = styled.div`
	padding: 20px;
	display: flex;
	gap: 20px;

	.visualizer {
		width: 70%;
	}

	.highlights {
		width: 30%;
	}
`

export default function Dashboard() {
	return (
		<DashBoardContainer>
			<div className="visualizer">
				<Visualizer />
			</div>
			<div className="highlights">
				<Highlights />				
			</div>
		</DashBoardContainer>
	)
}
