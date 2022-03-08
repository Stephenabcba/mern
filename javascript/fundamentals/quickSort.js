const numArr = [2,30,5,50,4,-1,6,10,3,7,1,8,9,20]

function quickSort (numArr, start=0, end=numArr.length-1) {
    if (end<= start) {
        return numArr
    }
    let i = start
    let j = end
    console.log(i);
    console.log(j);
    const pivot = numArr[Math.floor(i + j / 2)]
    while (i != j) {
        if (numArr[i] >= pivot) {
            if (numArr[j] <= pivot) {
                let temp = numArr[i]
                numArr[i] = numArr[j]
                numArr[j] = temp
            } else {
                j--
            }
        } else {
            i++
        }
    }
    console.log(numArr)
    quickSort(numArr,start,j-1)
    quickSort(numArr,j+1, end)
    return numArr
}
quickSort(numArr)

// Big O: list already sorted, O(N^2)
// Big Omega: pivot always at center, Omega(Nlog(N))