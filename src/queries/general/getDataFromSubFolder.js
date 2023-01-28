import getChildIndex from "./getChildIndex";

export default function getDataFromSubFolder(obj, curr_path) {
    if (curr_path.length > 0) {
        const curr_path_segment = curr_path[0]
        curr_path.shift()
        const childIndex = getChildIndex(obj.children, curr_path_segment, 'name')
        if (childIndex === null) {
            return {
                error: 'Could not resolve path for new folder!',
                errorCode: 501,
            }
        }
        const temp_res = getDataFromSubFolder(obj.children[childIndex], curr_path);
        //  catch error from recursive search
        if (temp_res.error && temp_res.errorCode === 501) {
            return temp_res
        }
    }
    return obj
}