import { queryParams, type QueryParams } from './../../wayfinder'

/**
 * @see \App\Http\Controllers\Admin\RoleController::store
 * @see app\Http\Controllers\Admin\RoleController.php:48
 * @route /roles
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
    url: '\/roles',
}

/**
 * @see \App\Http\Controllers\Admin\RoleController::store
 * @see app\Http\Controllers\Admin\RoleController.php:48
 * @route /roles
 */
store.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return store.definition.url + queryParams(options)
}

/**
 * @see \App\Http\Controllers\Admin\RoleController::store
 * @see app\Http\Controllers\Admin\RoleController.php:48
 * @route /roles
 */
store.post = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'post',
} => ({
    url: store.url(options),
    method: 'post',
})


export default store