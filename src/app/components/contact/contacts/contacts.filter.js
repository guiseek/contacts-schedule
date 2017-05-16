function contactsFilter() {
  return (collection, params) => {
    return collection.filter(item => {
      return item.tag.state === (
        params.filter === 'none' ? item.tag.state : params.filter
      )
    })
  }
}

angular
  .module('components.contact')
  .filter('contactsFilter', contactsFilter)
