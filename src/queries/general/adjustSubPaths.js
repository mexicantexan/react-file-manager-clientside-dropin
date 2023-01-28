export default function adjustSubPaths(obj, old_data, new_data, data_type='path') {
    for (let i=0;i<obj.length;i+=1) {
        if (data_type === "path") {
            // string update
            let temp_data = obj[i][data_type]
            temp_data = temp_data.replace(old_data, new_data)
            obj[i][data_type] = temp_data
        } else {
            obj[i][data_type] = new_data
        }
        if (obj[i].children) {
            obj[i].children = adjustSubPaths(obj[i].children, old_data, new_data, data_type)
        }
    }
    return obj
}