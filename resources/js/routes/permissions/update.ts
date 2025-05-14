import { queryParams, type QueryParams } from './../../wayfinder'

/**
 * @see \App\Http\Controllers\Admin\PermissionController::update
 * @see app\Http\Controllers\Admin\PermissionController.php:71
 * @route /permissions/{permission}
 */
export const update = (args: { permission: string | number } | [permission: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'put',
} => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ['put','patch'],
    url: '\/permissions\/{permission}',
}

/**
 * @see \App\Http\Controllers\Admin\PermissionController::update
 * @see app\Http\Controllers\Admin\PermissionController.php:71
 * @route /permissions/{permission}
 */
update.url = (args: { permission: string | number } | [permission: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
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

    return update.definition.url
            .replace('{permission}', parsedArgs.permission.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
 * @see \App\Http\Controllers\Admin\PermissionController::update
 * @see app\Http\Controllers\Admin\PermissionController.php:71
 * @route /permissions/{permission}
 */
update.put = (args: { permission: string | number } | [permission: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'put',
} => ({
    url: update.url(args, options),
    method: 'put',
})

/**
 * @see \App\Http\Controllers\Admin\PermissionController::update
 * @see app\Http\Controllers\Admin\PermissionController.php:71
 * @route /permissions/{permission}
 */
update.patch = (args: { permission: string | number } | [permission: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'patch',
} => ({
    url: update.url(args, options),
    method: 'patch',
})


export default update