import getChildIndex from "./getChildIndex";

export default function getDataFromSubFolder(obj, curr_path) {
    let out
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
        out = temp_res
    } else if (!out) {
        // if out hasn't been found, then this object is very likely our selection because we are at the bottom of
        // the path_segment tree
        out = obj
    } else {
        return {
            error: 'Could not resolve path for new folder!',
            errorCode: 501,
        }
    }

    return out
}