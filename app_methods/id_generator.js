function generateId(object, idType) {
  return object.length ? object[object.length - 1][idType] + 1 : 1;
}

module.exports = generateId;