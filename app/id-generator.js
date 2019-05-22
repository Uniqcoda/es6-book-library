function generateId(arrayOfObjects, idType) {
  // generate new id by icreasing the id of the most recent item
  return arrayOfObjects.length ? arrayOfObjects[arrayOfObjects.length - 1][idType] + 1 : 1;
}

module.exports = generateId;
