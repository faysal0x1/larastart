import { queryParams, type QueryParams } from './../wayfinder'

/**
 * @see \App\Http\Controllers\FrontendController::ForgotPassword
 * @see app\Http\Controllers\FrontendController.php:47
 * @route /ForgotPassword
 */
export const ForgotPassword = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: ForgotPassword.url(options),
    method: 'get',
})

ForgotPassword.definition = {
    methods: ['get','head'],
    url: '\/ForgotPassword',
}

/**
 * @see \App\Http\Controllers\FrontendController::ForgotPassword
 * @see app\Http\Controllers\FrontendController.php:47
 * @route /ForgotPassword
 */
ForgotPassword.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return ForgotPassword.definition.url + queryParams(options)
}

/**
 * @see \App\Http\Controllers\FrontendController::ForgotPassword
 * @see app\Http\Controllers\FrontendController.php:47
 * @route /ForgotPassword
 */
ForgotPassword.get = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: ForgotPassword.url(options),
    method: 'get',
})

/**
 * @see \App\Http\Controllers\FrontendController::ForgotPassword
 * @see app\Http\Controllers\FrontendController.php:47
 * @route /ForgotPassword
 */
ForgotPassword.head = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: ForgotPassword.url(options),
    method: 'head',
})


export default ForgotPassword