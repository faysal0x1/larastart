import { queryParams, type QueryParams } from './../../wayfinder'

/**
 * @see \App\Http\Controllers\Admin\PermissionController::store
 * @see app\Http\Controllers\Admin\PermissionController.php:40
 * @route /permissions
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
    url: '\/permissions',
}

/**
 * @see \App\Http\Controllers\Admin\PermissionController::store
 * @see app\Http\Controllers\Admin\PermissionController.php:40
 * @route /permissions
 */
store.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return store.definition.url + queryParams(options)
}

/**
 * @see \App\Http\Controllers\Admin\PermissionController::store
 * @see app\Http\Controllers\Admin\PermissionController.php:40
 * @route /permissions
 */
store.post = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'post',
} => ({
    url: store.url(options),
    method: 'post',
})


export default store