

// 归并排序
// 算法复杂度：O(N*logN)
// master : T(N) = aT(n/b) + O(n^d)
function mergeSort(arr) {
  if (arr === null || arr.length < 2) {
    return arr
  }
  let mid = Math.floor(arr.length / 2)
  let left = arr.slice(0, mid)
  let right = arr.slice(mid) 
  return merge(mergeSort(left), mergeSort(right))// T(N/2) O(N)
}
let res = 0
function merge(arrL, arrR) {
  let helpArr = []
  let p1 = 0
  let p2 = 0
  let l = arrL.length
  let r = arrR.length
  while (p1 < l && p2 < r) {
    let count = arrL[p1] < arrR[p2] ? arrR[p2] * (l - p1) : arrL[p1] * (r - p2)
    console.log(count)
    res += count
    helpArr.push(arrL[p1] < arrR[p2] ? arrL[p1++] : arrR[p2++])
  }
  console.log('res', res)
  while(p1 < l) {
    helpArr.push(arrL[p1 ++])
  }
  while(p2 < r) {
    helpArr.push(arrR[p2 ++])
  }
  return helpArr
}
console.log(mergeSort([1,3,4,2,5]), res)