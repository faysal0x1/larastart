import { queryParams, type QueryParams } from './../../wayfinder'

/**
 * @see \App\Http\Controllers\UserController::edit
 * @see app\Http\Controllers\UserController.php:57
 * @route /users/{user}/edit
 */
export const edit = (args: { user: string | number } | [user: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ['get','head'],
    url: '\/users\/{user}\/edit',
}

/**
 * @see \App\Http\Controllers\UserController::edit
 * @see app\Http\Controllers\UserController.php:57
 * @route /users/{user}/edit
 */
edit.url = (args: { user: string | number } | [user: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
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

    return edit.definition.url
            .replace('{user}', parsedArgs.user.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
 * @see \App\Http\Controllers\UserController::edit
 * @see app\Http\Controllers\UserController.php:57
 * @route /users/{user}/edit
 */
edit.get = (args: { user: string | number } | [user: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: edit.url(args, options),
    method: 'get',
})

/**
 * @see \App\Http\Controllers\UserController::edit
 * @see app\Http\Controllers\UserController.php:57
 * @route /users/{user}/edit
 */
edit.head = (args: { user: string | number } | [user: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: edit.url(args, options),
    method: 'head',
})


export default edit