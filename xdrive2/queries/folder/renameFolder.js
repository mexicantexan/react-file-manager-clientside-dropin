import adjustDataFromSubFolder from "../general/adjustDataFromSubFolder";
import cleanPathSegments from "../general/cleanPathSegments";

const RENAME_FOLDER = (curr_state, new_folder_name, specified_path) => {
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

    // remove folder from state
    curr_files = adjustDataFromSubFolder(curr_files, path_segments, new_folder_name, 'name')

    // return new proposed state
    return curr_files
}

export default RENAME_FOLDER
