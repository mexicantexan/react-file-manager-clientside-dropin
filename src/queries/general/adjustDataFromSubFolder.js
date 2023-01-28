import getChildIndex from "./getChildIndex";
import adjustSubPaths from "./adjustSubPaths";

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
            let old_path = curr_path.split('/')
            old_path = old_path.join('/')

            curr_path = curr_path.split('/')
            curr_path.pop()
            curr_path.push(val)
            curr_path = curr_path.join('/')
            obj.path = curr_path
            console.log(obj.path)
            // rename all sub paths
            obj.children = adjustSubPaths(obj.children, old_path, curr_path, 'path')
        }
        obj.lastModified = Date.now()
    }
    return obj
}