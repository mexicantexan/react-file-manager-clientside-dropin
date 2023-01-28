import addDataToSubFolder from "../general/addDataToSubFolder";
import {newXdriveFileTemplate} from "../general/newFileTemplate";
import cleanPathSegments from "../general/cleanPathSegments";

const CREATE_FILE = (curr_state, new_file_name, specified_path) => {
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

    // create new folder entry
    let new_file = newXdriveFileTemplate
    new_file.name = new_file_name
    new_file.createdAt = Date.now()
    new_file.lastModified = Date.now()
    new_file.path = path_segments.join('/') + `/${new_file_name}`

    let curr_files = curr_state.folderData

    // add the new folder to state
    curr_files = addDataToSubFolder(curr_files, path_segments, new_file)

    // return new state
    return curr_files
}

export default CREATE_FILE
