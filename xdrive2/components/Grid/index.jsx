import React from 'react'
import styled from 'styled-components'

// Components
import Card from './Card'

const Grid = ({ items }) => {
	return (
		<GridWrapper>
			{items && items.map(item => <Card item={item} />)}
		</GridWrapper>
	)
}

export default Grid

const GridWrapper = styled.div`
	display: grid;
	grid-template-rows: 150px;
	grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
`
