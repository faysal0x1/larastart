import { queryParams, type QueryParams } from './../wayfinder'

/**
 * @see \App\Http\Controllers\FrontendController::howItWorks
 * @see app\Http\Controllers\FrontendController.php:0
 * @route /how-it-works
 */
export const howItWorks = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: howItWorks.url(options),
    method: 'get',
})

howItWorks.definition = {
    methods: ['get','head'],
    url: '\/how-it-works',
}

/**
 * @see \App\Http\Controllers\FrontendController::howItWorks
 * @see app\Http\Controllers\FrontendController.php:0
 * @route /how-it-works
 */
howItWorks.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return howItWorks.definition.url + queryParams(options)
}

/**
 * @see \App\Http\Controllers\FrontendController::howItWorks
 * @see app\Http\Controllers\FrontendController.php:0
 * @route /how-it-works
 */
howItWorks.get = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: howItWorks.url(options),
    method: 'get',
})

/**
 * @see \App\Http\Controllers\FrontendController::howItWorks
 * @see app\Http\Controllers\FrontendController.php:0
 * @route /how-it-works
 */
howItWorks.head = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: howItWorks.url(options),
    method: 'head',
})


export default howItWorks