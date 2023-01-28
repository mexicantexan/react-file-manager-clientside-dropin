import {newXdriveFileTemplate} from "./newFileTemplate";

export const newXdriveFolderTemplate = {
    ...newXdriveFileTemplate,
    type: 'folder',
    children: [],
}