import { queryParams, type QueryParams } from './../../wayfinder'

/**
 * @see \App\Http\Controllers\FreelancerController::store
 * @see app\Http\Controllers\FreelancerController.php:44
 * @route /freelancers
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
    url: '\/freelancers',
}

/**
 * @see \App\Http\Controllers\FreelancerController::store
 * @see app\Http\Controllers\FreelancerController.php:44
 * @route /freelancers
 */
store.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return store.definition.url + queryParams(options)
}

/**
 * @see \App\Http\Controllers\FreelancerController::store
 * @see app\Http\Controllers\FreelancerController.php:44
 * @route /freelancers
 */
store.post = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'post',
} => ({
    url: store.url(options),
    method: 'post',
})


export default store