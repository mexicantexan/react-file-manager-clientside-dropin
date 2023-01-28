export default function getChild(currFolder, childName, childType) {
    for (let i = 0; i < currFolder.length; i++) {
        if (currFolder[i][childType] === childName) {
            return currFolder[i];
        }
    }
    return null
}