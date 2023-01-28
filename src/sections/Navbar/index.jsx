import React from 'react'

// State
import {Context} from '../../state/context'

// Styles
import {NavbarWrapper, Breadcrumbs, Search, SwitchView} from './styles'

// Assets
import {ChevronRightIcon, ListIcon, GridIcon} from '../../assets/Icon'

const Navbar = () => {
    const {state, dispatch} = React.useContext(Context)
    const [search, setSearch] = React.useState('')
    const [gridHover, setGridHover] = React.useState(false)
    const [listHover, setListHover] = React.useState(false)
    const [route, setRoute] = React.useState('')

    React.useEffect(() => {
        if (state.currentFolder) {
            setRoute(state.currentFolder)
        }
    }, [state.currentFolder])
    const goToFolder = async index => {
        const path = await route.split('/')
        const fullPath = await path.slice(0, index + 1).join('/')
        dispatch({
            type: 'SET_CURRENT_FOLDER',
            payload: fullPath,
        })
    }

    const hoverButton = (input_button_id, value) => {
        if (input_button_id === 'grid') {
            setGridHover(value)
        } else {
            setListHover(value)
        }
    }

    const searchFolder = e => {
        setSearch(e.target.value)
        dispatch({
            type: 'SET_SEARCH_TEXT',
            payload: e.target.value.toLowerCase(),
        })
    }

    return (
        <NavbarWrapper isSidebarVisible={state.isSidebarVisible}>
            <Breadcrumbs>
                {route &&
                    route.split('/').map((breadcrumb, index) => (
                        <React.Fragment key={index}>
                            <li onClick={() => goToFolder(index)}>
                                {breadcrumb}
                            </li>
                            {index === route.split('/').length - 1 ? null : (
                                <span>
									<ChevronRightIcon color="#CECECE"/>
								</span>
                            )}
                        </React.Fragment>
                    ))}
            </Breadcrumbs>
            <Search>
                <input
                    type="text"
                    placeholder="Search files or folders..."
                    value={search}
                    onChange={e => searchFolder(e)}
                />
            </Search>
            <SwitchView>
                <button
                    onClick={() =>
                        dispatch({type: 'TOGGLE_VIEW', payload: 'list'}) ||
                        dispatch({type: 'TOGGLE_PREVIEW', payload: false})
                    }
                    onMouseEnter={() => hoverButton('list', true)}
                    onMouseLeave={() => hoverButton('list', false)}
                    onMouseDown={e => e.preventDefault()}
                >
                    <ListIcon color={listHover ? "#ffffff" : state.folderView === 'list' ? "#3eb2ff" : "rgba(0,0,0,.35)"}
                    />
                </button>
                <button
                    onClick={() =>
                        dispatch({type: 'TOGGLE_VIEW', payload: 'grid'}) ||
                        dispatch({type: 'TOGGLE_PREVIEW', payload: false})
                    }
                    onMouseEnter={() => hoverButton('grid', true)}
                    onMouseLeave={() => hoverButton('grid', false)}
                    onMouseDown={e => e.preventDefault()}
                >
                    <GridIcon
                        color={gridHover === true ? "#ffffff" : state.folderView === 'grid' ? "#3eb2ff" : "rgba(0,0,0,.35)"}
                    />
                </button>
            </SwitchView>
        </NavbarWrapper>
    )
}

export default Navbar
