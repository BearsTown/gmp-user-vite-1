export default {
  getObject: function (array, key, value) {
    let o
    array.some(function iter(a) {
      if (a[key] === value) {
        o = a
        return true
      }
      return Array.isArray(a.children) && a.children.some(iter)
    })
    return o
  },
}
