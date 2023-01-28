import React from 'react'
import styled from 'styled-components'

// Components
import Card from './Card'

const Grid = ({ items }) => {
	return (
		<GridWrapper>
			{items.folder && items.folder.map(item => {
				const generateId = `table__row__menu${Math.random()}`
				return <Card key={generateId} item={item} generatedId={generateId}/>})
			}
			{items.file && items.file.map(item => {
				const generateId = `table__row__menu${Math.random()}`
				return <Card key={generateId} item={item} generatedId={generateId}/>})
			}
		</GridWrapper>
	)
}

export default Grid

const GridWrapper = styled.div`
	display: grid;
	grid-template-rows: 150px;
	grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
`
