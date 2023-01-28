export default function cleanPathSegments(inputPathSegments) {
    // clean path segments of leading spaces
    for (let i=0; i<inputPathSegments.length;i+=1) {
        if (inputPathSegments[0] === '') {
            inputPathSegments.shift()
            continue
        }
        break
    }
    return inputPathSegments
}