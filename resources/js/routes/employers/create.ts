import { queryParams, type QueryParams } from './../../wayfinder'

/**
 * @see \App\Http\Controllers\EmployeerController::create
 * @see app\Http\Controllers\EmployeerController.php:37
 * @route /employers/create
 */
export const create = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ['get','head'],
    url: '\/employers\/create',
}

/**
 * @see \App\Http\Controllers\EmployeerController::create
 * @see app\Http\Controllers\EmployeerController.php:37
 * @route /employers/create
 */
create.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return create.definition.url + queryParams(options)
}

/**
 * @see \App\Http\Controllers\EmployeerController::create
 * @see app\Http\Controllers\EmployeerController.php:37
 * @route /employers/create
 */
create.get = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: create.url(options),
    method: 'get',
})

/**
 * @see \App\Http\Controllers\EmployeerController::create
 * @see app\Http\Controllers\EmployeerController.php:37
 * @route /employers/create
 */
create.head = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: create.url(options),
    method: 'head',
})


export default create