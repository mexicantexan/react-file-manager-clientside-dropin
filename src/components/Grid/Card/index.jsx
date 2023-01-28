import React from 'react'
import { ContextMenu, MenuItem, ContextMenuTrigger } from 'react-contextmenu'
import PropTypes from 'prop-types'
import { useToasts } from 'react-toast-notifications'

// State
import { Context } from '../../../state/context'

// Components
import Modal from '../../Modal'

// Queries
import {
	GET_FOLDER,
	DELETE_FOLDER,
	DELETE_FILE,
	RENAME_FILE,
	RENAME_FOLDER,
} from '../../../queries'

// Helpers
import useClick from '../../../utils/useClick'

// Assets
import { FolderCloseIcon, FileText } from '../../../assets/Icon'

// Styles
import { CardWrapper, Thumb } from './styles'

const Card = ({ item, generatedId }) => {
	const { addToast } = useToasts()
	const { state, dispatch } = React.useContext(Context)
	const [folderName, setFolderName] = React.useState('')
	const [fileName, setFileName] = React.useState('')
	const [callSingleClick, callDoubleClick] = useClick()
	const [isCreateModalVisible, setCreateModalVisibility] = React.useState({
		folder: false,
		file: false,
	})

	const updateFolderState = (newState) => {
		const newFolderState = GET_FOLDER(newState)
		dispatch({
			type: 'SET_FOLDER_VIEW_DATA',
			payload: {
				updateRequired: true,
				name: newFolderState.name,
				path: newFolderState.path,
				children: newFolderState.children
			},
		})
	}

	const updateState = (newState) => {
		dispatch({
			type: 'SET_FOLDER_DATA',
			payload: newState,
		})
		updateFolderState(state)
	}

	function renameFolder() {
		const new_state = RENAME_FOLDER(state, folderName, item.path)
		updateState(new_state)
	}

	function renameFile() {
		const new_state = RENAME_FILE(state, fileName, item.path)
		updateState(new_state)
	}

	function deleteFile() {
		const new_state = DELETE_FILE(state, item.name, item.path)
		updateState(new_state)
	}

	function deleteFolder() {
		const new_state = DELETE_FOLDER(state, item.name, item.path)
		updateState(new_state)
	}

	function openFolder() {
		dispatch({
			type: 'SET_CURRENT_FOLDER',
			payload: item.path,
		})
	}

	function openFile() {
		singleClick()
	}

	const singleClick = () => {
		dispatch({
			type: 'SET_PREVIEW_DATA',
			payload: {
				name: item.name,
				type: item.type,
				size: item.size,
			},
		})
		dispatch({ type: 'TOGGLE_PREVIEW', payload: true })
	}

	const updateFileName = (input_event) => {
		try {input_event.preventDefault()} catch (e) {}
		let input_data = input_event.target.value
		input_data = input_data.replace('/', '')
		setFileName(input_data)
		setFolderName(input_data)
	}

	const doubleClick = () => (item.type === 'file' ? openFile() : openFolder())

	const CreatePopup = isCreateModalVisible.file || isCreateModalVisible.folder ? (
		<Modal>
			<Modal.Header>
				{isCreateModalVisible.file ? 'Rename File' : 'Rename Folder'}
			</Modal.Header>
			<Modal.Body>
				<label htmlFor="rename__folder__input">
					{isCreateModalVisible.file ? 'File Name' : 'Folder Name'}
				</label>
				{isCreateModalVisible.folder && (
					<input
						type="text"
						name="renameFolder"
						id="rename__folder__input"
						value={folderName}
						placeholder="Enter a folder name"
						onChange={updateFileName}
					/>
				)}
				{isCreateModalVisible.file && (
					<input
						type="text"
						name="createFolder"
						id="rename__folder__input"
						value={fileName}
						placeholder="Enter a file name"
						onChange={updateFileName}
					/>
				)}
			</Modal.Body>
			<Modal.Footer>
				<button
					onClick={() => {
						if (isCreateModalVisible.folder) {
							renameFolder()
						} else {
							renameFile()
						}
						setCreateModalVisibility({
							folder: false,
							file: false,
						})
						updateFileName('')
					}}
				>
					{isCreateModalVisible.file
						? 'Rename File'
						: 'Rename Folder'}
				</button>
				<button
					onClick={() => {
						setCreateModalVisibility({
							folder: false,
							file: false,
						})
						updateFileName('')
					}}
				>
					Cancel
				</button>
			</Modal.Footer>
		</Modal>
	) : <div/>

	const CardMenu = () => (
		<ContextMenu id={generatedId}>
			{item.type === 'file' ? (
				<MenuItem onClick={() => openFile()}>Open File</MenuItem>
			) : (
				<MenuItem onClick={() => openFolder()}>Open Folder</MenuItem>
			)}
			<MenuItem
				onClick={() => {
					if (item.type === 'file') {
						return setCreateModalVisibility({
							file: true,
						})
					}
					setCreateModalVisibility({
						folder: true,
					})
				}}
			>
				Rename {item.type === 'file' ? 'file' : 'folder'}
			</MenuItem>
			<MenuItem
				onClick={() => {
					return item.type === 'file'
						? deleteFile()
						: deleteFolder()
				}}
			>
				Delete {item.type === 'file' ? 'file' : 'folder'}
			</MenuItem>
		</ContextMenu>
	)

	return (
		<React.Fragment>
			<ContextMenuTrigger id={generatedId}>
				{CreatePopup}
				<CardWrapper
					onClick={() => callSingleClick(singleClick)}
					onDoubleClick={() => callDoubleClick(doubleClick)}
					title={item.name}
				>
					<Thumb>
						{item.type === 'folder' ? (
							<FolderCloseIcon />
						) : (
							<FileText size={35} color="#6A91EE" />
						)}
					</Thumb>
					<span>
						{item.name.length > 12
							? item.name.slice(0, 12) + '...'
							: item.name}
					</span>
				</CardWrapper>
			</ContextMenuTrigger>
			<CardMenu />
		</React.Fragment>
	)
}

Card.propTypes = {
	name: PropTypes.string,
	path: PropTypes.string,
	type: PropTypes.string,
}

export default Card
