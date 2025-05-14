import { queryParams, type QueryParams } from './../../wayfinder'

/**
 * @see \App\Http\Controllers\Admin\RoleController::edit
 * @see app\Http\Controllers\Admin\RoleController.php:61
 * @route /roles/{role}/edit
 */
export const edit = (args: { role: number | { id: number } } | [role: number | { id: number }] | number | { id: number }, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ['get','head'],
    url: '\/roles\/{role}\/edit',
}

/**
 * @see \App\Http\Controllers\Admin\RoleController::edit
 * @see app\Http\Controllers\Admin\RoleController.php:61
 * @route /roles/{role}/edit
 */
edit.url = (args: { role: number | { id: number } } | [role: number | { id: number }] | number | { id: number }, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { role: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { role: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            role: args[0],
        }
    }

    const parsedArgs = {
        role: typeof args.role === 'object'
            ? args.role.id
            : args.role,
    }

    return edit.definition.url
            .replace('{role}', parsedArgs.role.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
 * @see \App\Http\Controllers\Admin\RoleController::edit
 * @see app\Http\Controllers\Admin\RoleController.php:61
 * @route /roles/{role}/edit
 */
edit.get = (args: { role: number | { id: number } } | [role: number | { id: number }] | number | { id: number }, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: edit.url(args, options),
    method: 'get',
})

/**
 * @see \App\Http\Controllers\Admin\RoleController::edit
 * @see app\Http\Controllers\Admin\RoleController.php:61
 * @route /roles/{role}/edit
 */
edit.head = (args: { role: number | { id: number } } | [role: number | { id: number }] | number | { id: number }, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: edit.url(args, options),
    method: 'head',
})


export default edit