import { queryParams, type QueryParams } from './../wayfinder'

/**
 * @see routes\web.php:40
 * @route /dashboard
 */
export const dashboard = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: dashboard.url(options),
    method: 'get',
})

dashboard.definition = {
    methods: ['get','head'],
    url: '\/dashboard',
}

/**
 * @see routes\web.php:40
 * @route /dashboard
 */
dashboard.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return dashboard.definition.url + queryParams(options)
}

/**
 * @see routes\web.php:40
 * @route /dashboard
 */
dashboard.get = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: dashboard.url(options),
    method: 'get',
})

/**
 * @see routes\web.php:40
 * @route /dashboard
 */
dashboard.head = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: dashboard.url(options),
    method: 'head',
})


export default dashboard