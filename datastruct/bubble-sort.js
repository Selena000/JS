console.log('bubbleSort::', bubbleSort([4, 1, 3, 9, 8, 5]))
// 算法复杂度：O(N^2)
function bubbleSort(arr) {
  if (arr == null || arr.length < 2) {
    return arr
  }
  for (let end = arr.length - 1; end > 0; end--) {
    for (let i = 0; i < end - 2; i++) {
      if (arr[i] > arr[i + 1]) {
        swap(arr, i, i + 1)
      }
    }
  }
  return arr
}

function swap(arr, i, j) {
  let temp = arr[i]
  arr[i] = arr[j]
  arr[j] = temp
}