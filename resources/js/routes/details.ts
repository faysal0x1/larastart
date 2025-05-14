import { queryParams, type QueryParams } from './../wayfinder'

/**
 * @see \App\Http\Controllers\FrontendController::details
 * @see app\Http\Controllers\FrontendController.php:32
 * @route /JobDetails
 */
export const details = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: details.url(options),
    method: 'get',
})

details.definition = {
    methods: ['get','head'],
    url: '\/JobDetails',
}

/**
 * @see \App\Http\Controllers\FrontendController::details
 * @see app\Http\Controllers\FrontendController.php:32
 * @route /JobDetails
 */
details.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return details.definition.url + queryParams(options)
}

/**
 * @see \App\Http\Controllers\FrontendController::details
 * @see app\Http\Controllers\FrontendController.php:32
 * @route /JobDetails
 */
details.get = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: details.url(options),
    method: 'get',
})

/**
 * @see \App\Http\Controllers\FrontendController::details
 * @see app\Http\Controllers\FrontendController.php:32
 * @route /JobDetails
 */
details.head = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: details.url(options),
    method: 'head',
})


export default details