import getChildIndex from "./getChildIndex";

export default function adjustDataFromSubFolder(obj, curr_path, val, dataType) {
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
        const temp_res = adjustDataFromSubFolder(obj.children[childIndex], curr_path, val, dataType);
        //  catch error from recursive search
        if (temp_res.error && temp_res.errorCode === 501) {
            return temp_res
        }
        obj.children[childIndex] = temp_res
    } else {
        obj[dataType] = val;
        obj.lastModified = Date.now()
        if (dataType === 'name') {
            // adjust path as well since we are editing the name
            let curr_path = obj.path
            curr_path = curr_path.split('/')
            curr_path.pop()
            curr_path.push(val)
            curr_path.join('/')
        }
        obj.lastModified = Date.now()
    }
    return obj
}