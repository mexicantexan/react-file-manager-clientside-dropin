import React from 'react'

// State
import { Context } from '../../state/context'

// Components
import { FileExplorer } from '../../components'

// Styles
import { SidebarWrapper, SidebarActions } from './styles'

// Assets
import { ExpandIcon, CollapseIcon } from '../../assets/Icon'

const Sidebar = () => {
	const { state, dispatch } = React.useContext(Context)
	const [collapseHover, setHover] = React.useState(false)

	return (
		<SidebarWrapper isSidebarVisible={state.isSidebarVisible}>
			<SidebarActions>
				<button onClick={() => dispatch({ type: 'TOGGLE_SIDEBAR' })}
						onMouseEnter={() => setHover(true)}
						onMouseLeave={() => setHover(false)}
						onMouseDown={e => e.preventDefault()}
				>
					{state.isSidebarVisible ? (
						<ExpandIcon color={collapseHover === true ? "#ffffff" : "rgba(0,0,0,.35)"}/>
					) : (
						<CollapseIcon color={collapseHover === true ? "#ffffff" : "rgba(0,0,0,.35)"} />
					)}
				</button>
			</SidebarActions>
			<FileExplorer />
		</SidebarWrapper>
	)
}

export default Sidebar
