import { queryParams, type QueryParams } from './../../wayfinder'

/**
 * @see \App\Http\Controllers\UserController::store
 * @see app\Http\Controllers\UserController.php:43
 * @route /users
 */
export const store = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'post',
} => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ['post'],
    url: '\/users',
}

/**
 * @see \App\Http\Controllers\UserController::store
 * @see app\Http\Controllers\UserController.php:43
 * @route /users
 */
store.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return store.definition.url + queryParams(options)
}

/**
 * @see \App\Http\Controllers\UserController::store
 * @see app\Http\Controllers\UserController.php:43
 * @route /users
 */
store.post = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'post',
} => ({
    url: store.url(options),
    method: 'post',
})


export default store