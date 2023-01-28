import getDataFromSubFolder from "../general/getDataFromSubFolder";
import cleanPathSegments from "../general/cleanPathSegments";

const GET_FOLDER = (curr_state, specified_path) => {
    //  establish path
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

    let curr_files = {...curr_state.folderData}

    // add the new folder to state
    return getDataFromSubFolder(curr_files, path_segments)
}

export default GET_FOLDER
