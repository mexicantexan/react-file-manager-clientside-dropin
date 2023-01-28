import React from 'react'

// State
import { Context } from '../../state/context'

// Components
import TreeView from '../TreeView'

// Styles
import { FileExplorerWrapper } from './styles'

// Helpers
import toggleNode from '../../utils/toggleNode'
import usePrevious from "../../../utils/usePrevious";

const FileExplorer = () => {
	const { state, dispatch } = React.useContext(Context)
	const [error, setError] = React.useState(false)
	const [loading, setLoading] = React.useState(true)
	const [data, setData] = React.useState([])
	const [currentFolder, _] = React.useState(state.currentFolder || '')
	const prevCurrentFolder = usePrevious({currentFolder});

	React.useEffect(() => {
		if (state && state.errorCode) {
			setLoading(false)
			setError(false)
		} else if (loading === true || state.currentFolder !== prevCurrentFolder) {
			setData(state.folderData.children)
			setLoading(false)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [state.currentFolder])

	const onToggle = node => {
		const mutated = toggleNode(data, node)
		setData(mutated)
	}

	const onSelection = node => {
		if (node.type === 'folder') onToggle(node.name)
		dispatch({
			type: 'SET_CURRENT_FOLDER',
			payload: node.path.replace(process.env.REACT_APP_ROOT_FOLDER, ''),
		})
	}

	if (loading) {
		return <div>Loading...</div>
	}
	if (error) {
		return <div>Error</div>
	}

	return (
		<FileExplorerWrapper isSidebarVisible={state.isSidebarVisible}>
			<TreeView
				data={data}
				onSelection={onSelection}
				onToggle={onToggle}
			/>
		</FileExplorerWrapper>
	)
}

export default FileExplorer
