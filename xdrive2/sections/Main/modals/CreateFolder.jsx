import React from 'react'
import { useToasts } from 'react-toast-notifications'

// Components
import { Modal } from '../../../components'

// Styles
import { Wrapper } from './styled'
import {CREATE_FOLDER} from "../../../queries";
import {Context} from "../../../state/context";

const CreateModal = ({ folderPath, onModalClose }) => {
	const { addToast } = useToasts()
	const { state, dispatch } = React.useContext(Context)
	const [name, setName] = React.useState(null)

	const updateState = (new_state) => {
		dispatch({
			type: 'SET_FOLDER_DATA',
			payload: new_state,
		})
	}

	function createFolder() {
		const new_state = CREATE_FOLDER(state, name, folderPath)
		updateState(new_state)
	}

	return (
		<Modal>
			<Modal.Header>Create Folder</Modal.Header>
			<Modal.Body>
				<Wrapper>
					<label htmlFor="modal__input">Folder Name</label>
					<input
						type="text"
						name="createFolder"
						id="modal__input"
						value={name || ''}
						placeholder="Enter a folder name"
						onChange={e => setName(e.target.value)}
					/>
				</Wrapper>
			</Modal.Body>
			<Modal.Footer>
				<button
					onClick={() => {
						createFolder({
							variables: {
								path: `${folderPath}/${name}`,
								content: '',
							},
						})
						onModalClose('folder')
					}}
				>
					Submit
				</button>
				<button onClick={() => onModalClose('folder')}>Cancel</button>
			</Modal.Footer>
		</Modal>
	)
}

export default CreateModal
