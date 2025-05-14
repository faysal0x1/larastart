import { queryParams, type QueryParams } from './../wayfinder'

/**
 * @see \App\Http\Controllers\FrontendController::SignUp
 * @see app\Http\Controllers\FrontendController.php:42
 * @route /SignUp
 */
export const SignUp = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: SignUp.url(options),
    method: 'get',
})

SignUp.definition = {
    methods: ['get','head'],
    url: '\/SignUp',
}

/**
 * @see \App\Http\Controllers\FrontendController::SignUp
 * @see app\Http\Controllers\FrontendController.php:42
 * @route /SignUp
 */
SignUp.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return SignUp.definition.url + queryParams(options)
}

/**
 * @see \App\Http\Controllers\FrontendController::SignUp
 * @see app\Http\Controllers\FrontendController.php:42
 * @route /SignUp
 */
SignUp.get = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: SignUp.url(options),
    method: 'get',
})

/**
 * @see \App\Http\Controllers\FrontendController::SignUp
 * @see app\Http\Controllers\FrontendController.php:42
 * @route /SignUp
 */
SignUp.head = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: SignUp.url(options),
    method: 'head',
})


export default SignUp