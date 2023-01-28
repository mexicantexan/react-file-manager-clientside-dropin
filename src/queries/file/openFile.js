import cleanPathSegments from "../general/cleanPathSegments";
import getDataFromSubFolder from "../general/getDataFromSubFolder";

const OPEN_FILE = (curr_state, specified_path) => {
    //  establish path
    specified_path = specified_path.split('/')
    let path_segments = specified_path


    // clean path segments of leading spaces
    path_segments = cleanPathSegments(path_segments)

    let curr_files = {...curr_state.folderData}

    // add the new folder to state
    return getDataFromSubFolder(curr_files, path_segments)
}

export default OPEN_FILE
