import { queryParams, type QueryParams } from './../wayfinder'

/**
 * @see \App\Http\Controllers\FrontendController::pricing
 * @see app\Http\Controllers\FrontendController.php:0
 * @route /pricing
 */
export const pricing = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: pricing.url(options),
    method: 'get',
})

pricing.definition = {
    methods: ['get','head'],
    url: '\/pricing',
}

/**
 * @see \App\Http\Controllers\FrontendController::pricing
 * @see app\Http\Controllers\FrontendController.php:0
 * @route /pricing
 */
pricing.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return pricing.definition.url + queryParams(options)
}

/**
 * @see \App\Http\Controllers\FrontendController::pricing
 * @see app\Http\Controllers\FrontendController.php:0
 * @route /pricing
 */
pricing.get = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: pricing.url(options),
    method: 'get',
})

/**
 * @see \App\Http\Controllers\FrontendController::pricing
 * @see app\Http\Controllers\FrontendController.php:0
 * @route /pricing
 */
pricing.head = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: pricing.url(options),
    method: 'head',
})


export default pricing