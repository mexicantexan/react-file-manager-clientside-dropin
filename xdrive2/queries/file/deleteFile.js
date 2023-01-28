import cleanPathSegments from "../general/cleanPathSegments";
import removeDataFromSubFolder from "../general/removeDataFromSubFolder";

const DELETE_FILE = (curr_state, file_to_delete, specified_path) => {
    let path_segments
    if (specified_path) {
        specified_path = specified_path.split('/')
        path_segments = specified_path

    } else {
        // grab path segments from current state
        path_segments = curr_state.currentFolder.split('/')
    }

    // clean path segments of leading spaces
    path_segments = cleanPathSegments(path_segments)

    let curr_files = curr_state.folderData

    // remove folder from state and return
    return removeDataFromSubFolder(curr_files, path_segments, file_to_delete)
}

export default DELETE_FILE
