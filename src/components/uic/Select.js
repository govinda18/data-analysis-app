import React, { Component } from 'react';
import _ from 'lodash';

const Select = ({
	options,
	label,
	...props
}) => {
	return(
		<div>
			<select {...props} className="browser-default custom-select">
				{label && <option value={false}>{label}</option>}
				{_.map(options, ({val, label}) => <option value={val}>{label}</option>)}
			</select>
		</div>
	);
}

export default Select;