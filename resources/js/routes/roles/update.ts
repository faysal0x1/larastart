import { queryParams, type QueryParams } from './../../wayfinder'

/**
 * @see \App\Http\Controllers\Admin\RoleController::update
 * @see app\Http\Controllers\Admin\RoleController.php:72
 * @route /roles/{role}
 */
export const update = (args: { role: number | { id: number } } | [role: number | { id: number }] | number | { id: number }, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'put',
} => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ['put','patch'],
    url: '\/roles\/{role}',
}

/**
 * @see \App\Http\Controllers\Admin\RoleController::update
 * @see app\Http\Controllers\Admin\RoleController.php:72
 * @route /roles/{role}
 */
update.url = (args: { role: number | { id: number } } | [role: number | { id: number }] | number | { id: number }, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
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

    return update.definition.url
            .replace('{role}', parsedArgs.role.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
 * @see \App\Http\Controllers\Admin\RoleController::update
 * @see app\Http\Controllers\Admin\RoleController.php:72
 * @route /roles/{role}
 */
update.put = (args: { role: number | { id: number } } | [role: number | { id: number }] | number | { id: number }, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'put',
} => ({
    url: update.url(args, options),
    method: 'put',
})

/**
 * @see \App\Http\Controllers\Admin\RoleController::update
 * @see app\Http\Controllers\Admin\RoleController.php:72
 * @route /roles/{role}
 */
update.patch = (args: { role: number | { id: number } } | [role: number | { id: number }] | number | { id: number }, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'patch',
} => ({
    url: update.url(args, options),
    method: 'patch',
})


export default update