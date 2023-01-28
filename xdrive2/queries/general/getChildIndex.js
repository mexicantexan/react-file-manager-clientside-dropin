export default function getChildIndex(currFolder, childName, childType) {
    for (let i = 0; i < currFolder.length; i++) {
        if (currFolder[i][childType] === childName) {
            return i;
        }
    }
    return null
}