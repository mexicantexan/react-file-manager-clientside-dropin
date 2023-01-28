import React from 'react'

const initialState = {
    isSidebarVisible: true,
    currentFolder: '',
    folderView: 'list',
    isPreviewVisible: false,
    searchText: '',
    previewData: {},
    folderViewData: {},
    updateRequired: false,
    folderData: {
        name: '',
        path: '',
        children: [{
            name: 'asdf',
            path: 'asdf',
            type: 'folder',
            children: [{
                name: 'zxcv',
                path: 'asdf/zxcv',
                type: 'folder',
                children: [{
                    name: 'qwer',
                    path: 'asdf/zxcv/qwer',
                    type: 'folder',
                    children: [
                        {
                            name: 'c.zip',
                            path: 'asdf/zxcv/qwer/c.zip',
                            children: [],
                            type: 'file',
                        },
                        {
                            name: 'b-345234/.zip',
                            path: 'asdf/zxcv/qwer/c.zip',
                            children: [],
                            type: 'file',
                        },
                    ],
                }],
            }],
        }],
    },
    sortBy: {
        column: 'name',
        order: 'asc',
    },
}

const reducers = (state, action) => {
    switch (action.type) {
        case 'GET_STATE':
            return state
        case 'SET_CURRENT_FOLDER':
            return {
                ...state,
                currentFolder: action.payload,
            }
        case 'SET_FOLDER_DATA':
            return {
                ...state,
                updateRequired: true,
                folderData: {
                    name: action.payload.name,
                    path: action.payload.path,
                    children: action.payload.children,
                },
            }
        case 'SET_FOLDER_VIEW_DATA':
            return {
                ...state,
                updateRequired: action.payload.updateRequired,
                folderViewData: {
                    name: action.payload.name,
                    path: action.payload.path,
                    children: action.payload.children,
                },
            }
        case 'TOGGLE_SIDEBAR':
            return {
                ...state,
                isSidebarVisible: !state.isSidebarVisible,
            }
        case 'TOGGLE_VIEW':
            return {
                ...state,
                folderView: action.payload,
            }
        case 'TOGGLE_PREVIEW':
            return {
                ...state,
                isPreviewVisible: action.payload,
            }
        case 'SET_PREVIEW_DATA':
            return {
                ...state,
                previewData: action.payload,
            }
        case 'SET_SEARCH_TEXT':
            return {
                ...state,
                searchText: action.payload,
            }
        case 'SORT_BY':
            return {
                ...state,
                sortBy: {
                    column: action.payload.column,
                    order: action.payload.order,
                },
            }
        case 'TOGGLE_MODAL':
            return {
                ...state,
                isModalVisible: !state.isModalVisible,
            }
        case 'SET_FOLDER_NAME':
            return {
                ...state,
                folderName: action.payload,
            }
        case 'SET_FILE_NAME':
            return {
                ...state,
                fileName: action.payload,
            }
        case 'SET_UPDATE_REQUIRED':
            return {
                ...state,
                updateRequired: action.payload,
            }
        default:
            return state
    }
}

const Context = React.createContext('xdrive')

export {Context, initialState, reducers}
