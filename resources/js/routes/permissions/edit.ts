import { queryParams, type QueryParams } from './../../wayfinder'

/**
 * @see \App\Http\Controllers\Admin\PermissionController::edit
 * @see app\Http\Controllers\Admin\PermissionController.php:60
 * @route /permissions/{permission}/edit
 */
export const edit = (args: { permission: string | number } | [permission: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ['get','head'],
    url: '\/permissions\/{permission}\/edit',
}

/**
 * @see \App\Http\Controllers\Admin\PermissionController::edit
 * @see app\Http\Controllers\Admin\PermissionController.php:60
 * @route /permissions/{permission}/edit
 */
edit.url = (args: { permission: string | number } | [permission: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
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

    return edit.definition.url
            .replace('{permission}', parsedArgs.permission.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
 * @see \App\Http\Controllers\Admin\PermissionController::edit
 * @see app\Http\Controllers\Admin\PermissionController.php:60
 * @route /permissions/{permission}/edit
 */
edit.get = (args: { permission: string | number } | [permission: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: edit.url(args, options),
    method: 'get',
})

/**
 * @see \App\Http\Controllers\Admin\PermissionController::edit
 * @see app\Http\Controllers\Admin\PermissionController.php:60
 * @route /permissions/{permission}/edit
 */
edit.head = (args: { permission: string | number } | [permission: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: edit.url(args, options),
    method: 'head',
})


export default edit