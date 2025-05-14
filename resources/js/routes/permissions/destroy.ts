import { queryParams, type QueryParams } from './../../wayfinder'

/**
 * @see \App\Http\Controllers\Admin\PermissionController::destroy
 * @see app\Http\Controllers\Admin\PermissionController.php:89
 * @route /permissions/{permission}
 */
export const destroy = (args: { permission: string | number } | [permission: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'delete',
} => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ['delete'],
    url: '\/permissions\/{permission}',
}

/**
 * @see \App\Http\Controllers\Admin\PermissionController::destroy
 * @see app\Http\Controllers\Admin\PermissionController.php:89
 * @route /permissions/{permission}
 */
destroy.url = (args: { permission: string | number } | [permission: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
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

    return destroy.definition.url
            .replace('{permission}', parsedArgs.permission.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
 * @see \App\Http\Controllers\Admin\PermissionController::destroy
 * @see app\Http\Controllers\Admin\PermissionController.php:89
 * @route /permissions/{permission}
 */
destroy.delete = (args: { permission: string | number } | [permission: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'delete',
} => ({
    url: destroy.url(args, options),
    method: 'delete',
})


export default destroy