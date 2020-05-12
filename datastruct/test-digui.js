function getMax(arr, l, r) {
  if (l === r) {
    return arr[l]
  }
  let mid = parseInt((l + r) / 2)
  let maxL = getMax(arr, l, mid)
  let maxR = getMax(arr, mid + 1, r)

  return Math.max(maxL, maxR)
}
let arr = [4, 3, 5, 1]
let result = getMax(arr, 0, arr.length - 1)
console.log('result::', result)