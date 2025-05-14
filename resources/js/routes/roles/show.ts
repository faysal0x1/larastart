import { queryParams, type QueryParams } from './../../wayfinder'

/**
 * @see \App\Http\Controllers\Admin\RoleController::show
 * @see app\Http\Controllers\Admin\RoleController.php:0
 * @route /roles/{role}
 */
export const show = (args: { role: string | number } | [role: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ['get','head'],
    url: '\/roles\/{role}',
}

/**
 * @see \App\Http\Controllers\Admin\RoleController::show
 * @see app\Http\Controllers\Admin\RoleController.php:0
 * @route /roles/{role}
 */
show.url = (args: { role: string | number } | [role: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { role: args }
    }

    if (Array.isArray(args)) {
        args = {
            role: args[0],
        }
    }

    const parsedArgs = {
        role: args.role,
    }

    return show.definition.url
            .replace('{role}', parsedArgs.role.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
 * @see \App\Http\Controllers\Admin\RoleController::show
 * @see app\Http\Controllers\Admin\RoleController.php:0
 * @route /roles/{role}
 */
show.get = (args: { role: string | number } | [role: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: show.url(args, options),
    method: 'get',
})

/**
 * @see \App\Http\Controllers\Admin\RoleController::show
 * @see app\Http\Controllers\Admin\RoleController.php:0
 * @route /roles/{role}
 */
show.head = (args: { role: string | number } | [role: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: show.url(args, options),
    method: 'head',
})


export default show