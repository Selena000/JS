// 选择排序
console.log('selectionSort::', selectionSort([4, 1, 3, 9, 8, 5]))
function selectionSort(arr) {
  if (arr == null || arr.length < 2) {
    return
  }
  for (let i = 0; i < arr.length - 1; i++) {
    let minIndex = i
    for (let j = i + 1; j < arr.length; j++) {
      minIndex = arr[minIndex] > arr[j] ? j : minIndex
    }
    swap(arr, i, minIndex)
  } 
  return arr
}

function swap(arr, i, j) {
  let temp = arr[i]
  arr[i] = arr[j]
  arr[j] = temp
}