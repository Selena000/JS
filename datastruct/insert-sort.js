console.log('insertSort::', insertSort([4, 1, 3, 9, 8, 5]))
// 算法复杂度：O(N^2)
// 最好情况 最差情况 平均情况
// 最好情况：O(N)
// 最差情况：O(N^2)
// 算法复杂度按最差情况
function insertSort(arr) {
  if (arr == null || arr.length < 2) {
    return arr
  }
  for (let i = 1; i < arr.length; i++) {
    for (let j = i - 1; j >= 0 && arr[j] > arr[j +1]; j--) {
      swap(arr, j, j + 1)
    }
  }
  return arr
}

function swap(arr, i, j) {
  let temp = arr[i]
  arr[i] = arr[j]
  arr[j] = temp
}