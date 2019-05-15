function generateId(arrayOfObjects, idType) {
  return arrayOfObjects.length ? arrayOfObjects[arrayOfObjects.length - 1][idType] + 1 : 1;
}

module.exports = generateId;