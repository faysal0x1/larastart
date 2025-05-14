import { queryParams, type QueryParams } from './../wayfinder'

/**
 * @see \App\Http\Controllers\FrontendController::loginEx
 * @see app\Http\Controllers\FrontendController.php:38
 * @route /loginEx
 */
export const loginEx = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: loginEx.url(options),
    method: 'get',
})

loginEx.definition = {
    methods: ['get','head'],
    url: '\/loginEx',
}

/**
 * @see \App\Http\Controllers\FrontendController::loginEx
 * @see app\Http\Controllers\FrontendController.php:38
 * @route /loginEx
 */
loginEx.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return loginEx.definition.url + queryParams(options)
}

/**
 * @see \App\Http\Controllers\FrontendController::loginEx
 * @see app\Http\Controllers\FrontendController.php:38
 * @route /loginEx
 */
loginEx.get = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: loginEx.url(options),
    method: 'get',
})

/**
 * @see \App\Http\Controllers\FrontendController::loginEx
 * @see app\Http\Controllers\FrontendController.php:38
 * @route /loginEx
 */
loginEx.head = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: loginEx.url(options),
    method: 'head',
})


export default loginEx