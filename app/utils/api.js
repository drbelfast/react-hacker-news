import Firebase from 'firebase/app'
import 'firebase/database'

const config = {
    databaseURL: 'https://hacker-news.firebaseio.com'
}
const version = '/v0'

Firebase.initializeApp(config)
const api = Firebase.database().ref(version)

export function fetch (child) {
    return new Promise((resolve, reject) => {
        api.child(child).once('value', snapshot => {
            const val = snapshot.val()
            resolve(val)
        }, reject)
    })
}

export function fetchItem (id) {
    return fetch(`item/${id}`)
}

export function fetchItems (ids) {
    return Promise.all(ids.map(id => fetchItem(id)))
}
// https://github.com/HackerNews/API#new-top-and-best-stories
export function fetchIdsByType (type) {
    return fetch(`${type}stories`)
}
export default api