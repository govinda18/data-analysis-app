import React from 'react';

const FilterForm = ({data}) => {
	const columns = data.columns;
	const categories = _.filter(
		columns, 
		(col) => 
		(data[col].nunique() * 100) / data[col].count() < 5
		&& data[col]
	)

	// console.log(data[data['House'] = "9"])

	return <h1>asd</h1>;
}

export default FilterForm;