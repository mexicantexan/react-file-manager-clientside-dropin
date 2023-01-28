export default function isObject(obj) {
    return obj instanceof Object && obj.constructor === Object;
}