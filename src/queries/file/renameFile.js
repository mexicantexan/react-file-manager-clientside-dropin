import cleanPathSegments from "../general/cleanPathSegments";
import adjustDataFromSubFolder from "../general/adjustDataFromSubFolder";

const RENAME_FILE = (curr_state, new_file_name, specified_path) => {
    specified_path = specified_path.split('/')
    let path_segments = specified_path

    // clean path segments of leading spaces
    path_segments = cleanPathSegments(path_segments)

    let curr_files = curr_state.folderData

    // rename file in state, then return result
    return adjustDataFromSubFolder(curr_files, path_segments, new_file_name, 'name')
}

export default RENAME_FILE
