import getChildIndex from "./getChildIndex";

export default function removeDataFromSubFolder(obj, curr_path, val) {
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
        const temp_res = removeDataFromSubFolder(obj.children[childIndex], curr_path, val);
        //  catch error from recursive search
        if (temp_res.error && temp_res.errorCode === 501) {
            return temp_res
        }
        obj.children[childIndex] = temp_res
    } else {
        const childIndex = getChildIndex(obj.children, val, 'name')
        if (childIndex !== null) {
            obj.children.splice(childIndex, 1);
        }
    }
    return obj
}