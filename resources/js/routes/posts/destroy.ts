import { queryParams, type QueryParams } from './../../wayfinder'

/**
 * @see \App\Http\Controllers\PostController::destroy
 * @see app\Http\Controllers\PostController.php:0
 * @route /posts/{id}
 */
export const destroy = (args: { id: string | number } | [id: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'delete',
} => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ['delete'],
    url: '\/posts\/{id}',
}

/**
 * @see \App\Http\Controllers\PostController::destroy
 * @see app\Http\Controllers\PostController.php:0
 * @route /posts/{id}
 */
destroy.url = (args: { id: string | number } | [id: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { id: args }
    }

    if (Array.isArray(args)) {
        args = {
            id: args[0],
        }
    }

    const parsedArgs = {
        id: args.id,
    }

    return destroy.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
 * @see \App\Http\Controllers\PostController::destroy
 * @see app\Http\Controllers\PostController.php:0
 * @route /posts/{id}
 */
destroy.delete = (args: { id: string | number } | [id: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'delete',
} => ({
    url: destroy.url(args, options),
    method: 'delete',
})


export default destroy