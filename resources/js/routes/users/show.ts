import { queryParams, type QueryParams } from './../../wayfinder'

/**
 * @see \App\Http\Controllers\UserController::show
 * @see app\Http\Controllers\UserController.php:50
 * @route /users/{user}
 */
export const show = (args: { user: string | number } | [user: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ['get','head'],
    url: '\/users\/{user}',
}

/**
 * @see \App\Http\Controllers\UserController::show
 * @see app\Http\Controllers\UserController.php:50
 * @route /users/{user}
 */
show.url = (args: { user: string | number } | [user: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { user: args }
    }

    if (Array.isArray(args)) {
        args = {
            user: args[0],
        }
    }

    const parsedArgs = {
        user: args.user,
    }

    return show.definition.url
            .replace('{user}', parsedArgs.user.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
 * @see \App\Http\Controllers\UserController::show
 * @see app\Http\Controllers\UserController.php:50
 * @route /users/{user}
 */
show.get = (args: { user: string | number } | [user: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: show.url(args, options),
    method: 'get',
})

/**
 * @see \App\Http\Controllers\UserController::show
 * @see app\Http\Controllers\UserController.php:50
 * @route /users/{user}
 */
show.head = (args: { user: string | number } | [user: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: show.url(args, options),
    method: 'head',
})


export default show