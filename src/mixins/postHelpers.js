
function addKeysToArray(array){ // add key id to each post
  let updatedArray = []
  for (let idx in array) {
    const item = array[idx]
    const dbkey = item['.key']
    item.id = dbkey
    updatedArray[idx] = item
  }
  return updatedArray
}

function sortDesc(a, b){ // by date published
  if (a.date > b.date)
      return -1
  if (a.date < b.date)
      return 1;
  return 0
}

export { addKeysToArray, sortDesc }