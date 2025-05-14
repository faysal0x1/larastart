import { queryParams, type QueryParams } from './../../wayfinder'

/**
 * @see \App\Http\Controllers\EmployeerController::store
 * @see app\Http\Controllers\EmployeerController.php:44
 * @route /employers
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
    url: '\/employers',
}

/**
 * @see \App\Http\Controllers\EmployeerController::store
 * @see app\Http\Controllers\EmployeerController.php:44
 * @route /employers
 */
store.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return store.definition.url + queryParams(options)
}

/**
 * @see \App\Http\Controllers\EmployeerController::store
 * @see app\Http\Controllers\EmployeerController.php:44
 * @route /employers
 */
store.post = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'post',
} => ({
    url: store.url(options),
    method: 'post',
})


export default store