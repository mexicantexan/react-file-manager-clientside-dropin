import React from 'react'
import PropTypes from 'prop-types'
import {ContextMenu, MenuItem, ContextMenuTrigger} from 'react-contextmenu'
import {useToasts} from 'react-toast-notifications'

// Context
import {Context} from '../../../state/context'

// Components
import Modal from '../../Modal'

// Styles
import {Row, RowCell} from './styles'

// Queries
import {
    GET_FOLDER,
    DELETE_FOLDER,
    DELETE_FILE,
    RENAME_FILE,
    RENAME_FOLDER,
} from '../../../queries'

// Helpers
import convertFileSize from '../../../utils/convertFileSize'
import useClick from '../../../utils/useClick'

// Assets
import {TrashIcon, InfoIcon} from '../../../assets/Icon'

const TableRow = ({name, type, size, path, createdAt}) => {
    const {addToast} = useToasts()
    const {state, dispatch} = React.useContext(Context)
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
        console.log('newState', newState)
        dispatch({
            type: 'SET_FOLDER_DATA',
            payload: newState,
        })
        updateFolderState(state)
    }

    // addToast('Opened file in editor!', {
    // 				appearance: 'success',
    // 				autoDismiss: true,
    // 			})

    function renameFolder() {
        const newState = RENAME_FOLDER(state, folderName, path)
        updateState(newState)
    }

    function renameFile() {
        const newState = RENAME_FILE(state, fileName, path)
        updateState(newState)
    }

    function deleteFile() {
        const newState = DELETE_FILE(state, name, path)
        updateState(newState)
    }

    function deleteFolder() {
        const newState = DELETE_FOLDER(state, name, path)
        updateState(newState)
    }

    function openFolder() {
        dispatch({
            type: 'SET_CURRENT_FOLDER',
            payload: path,
        })
    }

    function openFile() {
        showPreview()
    }

    const showPreview = () => {
        dispatch({
            type: 'SET_PREVIEW_DATA',
            payload: {
                name,
                type,
                size,
            },
        })
        dispatch({type: 'TOGGLE_PREVIEW', payload: true})
    }
    const closePreview = () => {
        dispatch({
            type: 'SET_PREVIEW_DATA',
            payload: {
                name: '',
                type: '',
                size: 0,
            },
        })
        dispatch({type: 'TOGGLE_PREVIEW', payload: false})
    }

    const updateFileName = (input_event) => {
        try {input_event.preventDefault()} catch (e) {}
        let input_data = input_event.target.value
        input_data = input_data.replace('/', '')
        setFileName(input_data)
        setFolderName(input_data)
    }

    const doubleClick = () => (type === 'file' ? showPreview() : openFolder())

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
    const generateId = `table__row__menu${Math.random()}`

    return (
        <React.Fragment>
            <ContextMenuTrigger id={generateId}>
                {CreatePopup}
                <Row>
                    <RowCell
                        onClick={() => callSingleClick(showPreview)}
                        onDoubleClick={() => callDoubleClick(doubleClick)}
                        title={name}
                    >
                        {name.length > 20 ? name.slice(0, 20) + '...' : name}
                    </RowCell>
                    <RowCell>
                        {new Intl.DateTimeFormat('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                            hour: 'numeric',
                            minute: 'numeric',
                        }).format(createdAt)}
                    </RowCell>
                    <RowCell>{type}</RowCell>
                    <RowCell>{size && `${convertFileSize(size)}`}</RowCell>
                    <RowCell withOptions className="item__options">
                        <button onClick={() => showPreview()}>
                            <InfoIcon color="#fff"/>
                        </button>
                        <button
                            onClick={() => {
                                return type === 'folder'
                                    ? deleteFolder()
                                    : deleteFile()
                            }}
                        >
                            <TrashIcon color="#fff"/>
                        </button>
                    </RowCell>
                </Row>
            </ContextMenuTrigger>
            <ContextMenu id={generateId}>
                {type === 'file' ? (
                    <MenuItem onClick={() => openFile()}>Open File</MenuItem>
                ) : (
                    <MenuItem onClick={() => openFolder()}>
                        Open Folder
                    </MenuItem>
                )}
                <MenuItem
                    onClick={() => {
                        if (type === 'file') {
                            setCreateModalVisibility({
                                file: !isCreateModalVisible.file,
                            })
                            console.log('setting modal visibility to: file', isCreateModalVisible.file)
                            return
                        }
                        setCreateModalVisibility({
                            folder: !isCreateModalVisible.folder,
                        })
                        console.log('setting modal visibility to: folder', isCreateModalVisible.folder)
                    }}
                >
                    Rename {type === 'file' ? 'file' : 'folder'}
                </MenuItem>

                <MenuItem
                    onClick={() => {
                        const args = {
                            variables: {
                                path,
                            },
                        }
                        return type === 'file'
                            ? deleteFile(args)
                            : deleteFolder(args)
                    }}
                >
                    Delete {type === 'file' ? 'file' : 'folder'}
                </MenuItem>
            </ContextMenu>
        </React.Fragment>
    )
}

TableRow.propTypes = {
    name: PropTypes.string,
    size: PropTypes.number,
    type: PropTypes.string,
    path: PropTypes.string,
}

export default TableRow
