
function addKeysToArray(array){
  let updatedArray = []
  for (let idx in array) { // add key id to each post
    const item = array[idx]
    const dbkey = array['.key']
    // post.id = dbkey
    updatedArray[idx] = item
  }
  return updatedArray
}

function sortDesc(a, b){
  if (a.date > b.date)
      return -1
  if (a.date < b.date)
      return 1;
  return 0
}

export { addKeysToArray, sortDesc }