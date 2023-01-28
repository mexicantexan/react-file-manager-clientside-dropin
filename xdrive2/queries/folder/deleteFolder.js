import removeDataFromSubFolder from "../general/removeDataFromSubFolder";
import cleanPathSegments from "../general/cleanPathSegments";


const DELETE_FOLDER = (curr_state, folder_to_delete, specified_path) => {
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
    return removeDataFromSubFolder(curr_files, path_segments, folder_to_delete)
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
// console.log(JSON.stringify(DELETE_FOLDER(testState, 'qwer'), null, 4))


export default DELETE_FOLDER
