function TagService(AuthService, $firebaseRef, $firebaseArray, $firebaseObject) {
  let ref = $firebaseRef.tags
  let uid = AuthService.getUser().uid
  return {
    createNewTag: function (tag) {
      return $firebaseArray(ref.child(uid)).$add(tag)
    },
    getTagById: function (id) {
      return $firebaseObject(ref.child(uid).child(id))
    },
    getTagList: function () {
      return $firebaseArray(ref.child(uid))
    },
    updateTag: function (tag) {
      return tag.$save()
    },
    deleteTag: function (tag) {
      return tag.$remove()
    }
  }
}

angular
  .module('components.contact')
  .factory('TagService', TagService)
