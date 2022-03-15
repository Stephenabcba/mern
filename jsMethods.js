// filter 
function filter(inputArr, callbackFn) {
    const newArr = []
    for (let idx = 0; idx < inputArr.length; idx++) {
        if (callbackFn(inputArr[idx], idx) === true) {
            newArr.push(inputArr[idx])
        } else {
            // do nothing
        }
    }
    return newArr
}


// map
function map(inputArr, callbackFn) {
    const newArr = []
    for (let idx = 0; idx < inputArr.length; idx++) {
        const value = callbackFn(inputArr[idx], idx)
        newArr.push(value)
    }
    return newArr
}