import { queryParams, type QueryParams } from './../../wayfinder'

/**
 * @see \App\Http\Controllers\UserController::destroy
 * @see app\Http\Controllers\UserController.php:71
 * @route /users/{user}
 */
export const destroy = (args: { user: string | number } | [user: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'delete',
} => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ['delete'],
    url: '\/users\/{user}',
}

/**
 * @see \App\Http\Controllers\UserController::destroy
 * @see app\Http\Controllers\UserController.php:71
 * @route /users/{user}
 */
destroy.url = (args: { user: string | number } | [user: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
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

    return destroy.definition.url
            .replace('{user}', parsedArgs.user.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
 * @see \App\Http\Controllers\UserController::destroy
 * @see app\Http\Controllers\UserController.php:71
 * @route /users/{user}
 */
destroy.delete = (args: { user: string | number } | [user: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'delete',
} => ({
    url: destroy.url(args, options),
    method: 'delete',
})


export default destroy