import addDataToSubFolder from "../general/addDataToSubFolder";
import {newXdriveFolderTemplate} from "../general/newFolderTemplate";
import cleanPathSegments from "../general/cleanPathSegments";

const CREATE_FOLDER = (curr_state, new_folder_name, specified_path) => {
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
    let new_folder = newXdriveFolderTemplate
    new_folder.name = new_folder_name
    new_folder.createdAt = Date.now()
    new_folder.lastModified = Date.now()
    new_folder.path = path_segments.join('/')

    let curr_files = curr_state.folderData

    // add the new folder to state
    curr_files = addDataToSubFolder(curr_files, path_segments, new_folder)

    // return new state
    return curr_files
}

// // FOR TESTING
// const testState = {
//     currentFolder: '/asdf/zxcv',
//     folderData: {
//         name: '',
//         path: '',
//         children: [{
//             name: 'asdf',
//             path: 'asdf',
//             children: [{
//                 name: 'zxcv',
//                 path: 'asdf/zxcv',
//                 children: [{
//                     name: 'qwer',
//                     path: 'asdf/zxcv/qwer',
//                     children: [
//                         {
//                             name: 'c.zip',
//                             path: 'asdf/zxcv/qwer/c.zip',
//                             children: [],
//                         },
//                         {
//                             name: 'b-345234/.zip',
//                             path: 'asdf/zxcv/qwer/c.zip',
//                             children: [],
//                         },
//                     ],
//                 }],
//             }],
//         }],
//     }
// }
//
// console.log(JSON.stringify(CREATE_FOLDER(testState, 'hamlet'), null, 4))

export default CREATE_FOLDER
