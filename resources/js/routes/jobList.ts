import { queryParams, type QueryParams } from './../wayfinder'

/**
 * @see \App\Http\Controllers\FrontendController::jobList
 * @see app\Http\Controllers\FrontendController.php:27
 * @route /employeeJobsList
 */
export const jobList = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: jobList.url(options),
    method: 'get',
})

jobList.definition = {
    methods: ['get','head'],
    url: '\/employeeJobsList',
}

/**
 * @see \App\Http\Controllers\FrontendController::jobList
 * @see app\Http\Controllers\FrontendController.php:27
 * @route /employeeJobsList
 */
jobList.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return jobList.definition.url + queryParams(options)
}

/**
 * @see \App\Http\Controllers\FrontendController::jobList
 * @see app\Http\Controllers\FrontendController.php:27
 * @route /employeeJobsList
 */
jobList.get = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: jobList.url(options),
    method: 'get',
})

/**
 * @see \App\Http\Controllers\FrontendController::jobList
 * @see app\Http\Controllers\FrontendController.php:27
 * @route /employeeJobsList
 */
jobList.head = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: jobList.url(options),
    method: 'head',
})


export default jobList