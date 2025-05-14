import { queryParams, type QueryParams } from './../../wayfinder'

/**
 * @see \App\Http\Controllers\Admin\PermissionController::show
 * @see app\Http\Controllers\Admin\PermissionController.php:53
 * @route /permissions/{permission}
 */
export const show = (args: { permission: string | number } | [permission: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ['get','head'],
    url: '\/permissions\/{permission}',
}

/**
 * @see \App\Http\Controllers\Admin\PermissionController::show
 * @see app\Http\Controllers\Admin\PermissionController.php:53
 * @route /permissions/{permission}
 */
show.url = (args: { permission: string | number } | [permission: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { permission: args }
    }

    if (Array.isArray(args)) {
        args = {
            permission: args[0],
        }
    }

    const parsedArgs = {
        permission: args.permission,
    }

    return show.definition.url
            .replace('{permission}', parsedArgs.permission.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
 * @see \App\Http\Controllers\Admin\PermissionController::show
 * @see app\Http\Controllers\Admin\PermissionController.php:53
 * @route /permissions/{permission}
 */
show.get = (args: { permission: string | number } | [permission: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: show.url(args, options),
    method: 'get',
})

/**
 * @see \App\Http\Controllers\Admin\PermissionController::show
 * @see app\Http\Controllers\Admin\PermissionController.php:53
 * @route /permissions/{permission}
 */
show.head = (args: { permission: string | number } | [permission: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: show.url(args, options),
    method: 'head',
})


export default show