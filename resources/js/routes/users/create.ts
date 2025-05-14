import { queryParams, type QueryParams } from './../../wayfinder'

/**
 * @see \App\Http\Controllers\UserController::create
 * @see app\Http\Controllers\UserController.php:36
 * @route /users/create
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
    url: '\/users\/create',
}

/**
 * @see \App\Http\Controllers\UserController::create
 * @see app\Http\Controllers\UserController.php:36
 * @route /users/create
 */
create.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return create.definition.url + queryParams(options)
}

/**
 * @see \App\Http\Controllers\UserController::create
 * @see app\Http\Controllers\UserController.php:36
 * @route /users/create
 */
create.get = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: create.url(options),
    method: 'get',
})

/**
 * @see \App\Http\Controllers\UserController::create
 * @see app\Http\Controllers\UserController.php:36
 * @route /users/create
 */
create.head = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: create.url(options),
    method: 'head',
})


export default create