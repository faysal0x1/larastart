import { queryParams, type QueryParams } from './../wayfinder'

/**
 * @see \App\Http\Controllers\FrontendController::employeeDashoard
 * @see app\Http\Controllers\FrontendController.php:22
 * @route /employeeDashboard
 */
export const employeeDashoard = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: employeeDashoard.url(options),
    method: 'get',
})

employeeDashoard.definition = {
    methods: ['get','head'],
    url: '\/employeeDashboard',
}

/**
 * @see \App\Http\Controllers\FrontendController::employeeDashoard
 * @see app\Http\Controllers\FrontendController.php:22
 * @route /employeeDashboard
 */
employeeDashoard.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return employeeDashoard.definition.url + queryParams(options)
}

/**
 * @see \App\Http\Controllers\FrontendController::employeeDashoard
 * @see app\Http\Controllers\FrontendController.php:22
 * @route /employeeDashboard
 */
employeeDashoard.get = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: employeeDashoard.url(options),
    method: 'get',
})

/**
 * @see \App\Http\Controllers\FrontendController::employeeDashoard
 * @see app\Http\Controllers\FrontendController.php:22
 * @route /employeeDashboard
 */
employeeDashoard.head = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: employeeDashoard.url(options),
    method: 'head',
})


export default employeeDashoard