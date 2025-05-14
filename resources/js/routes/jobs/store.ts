import { queryParams, type QueryParams } from './../../wayfinder'

/**
 * @see \App\Http\Controllers\JobController::store
 * @see app\Http\Controllers\JobController.php:28
 * @route /jobs
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
    url: '\/jobs',
}

/**
 * @see \App\Http\Controllers\JobController::store
 * @see app\Http\Controllers\JobController.php:28
 * @route /jobs
 */
store.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return store.definition.url + queryParams(options)
}

/**
 * @see \App\Http\Controllers\JobController::store
 * @see app\Http\Controllers\JobController.php:28
 * @route /jobs
 */
store.post = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'post',
} => ({
    url: store.url(options),
    method: 'post',
})


export default store