import { queryParams, type QueryParams } from './../../wayfinder'

/**
 * @see \App\Http\Controllers\PostController::edit
 * @see app\Http\Controllers\PostController.php:0
 * @route /posts/{id}/edit
 */
export const edit = (args: { id: string | number } | [id: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ['get','head'],
    url: '\/posts\/{id}\/edit',
}

/**
 * @see \App\Http\Controllers\PostController::edit
 * @see app\Http\Controllers\PostController.php:0
 * @route /posts/{id}/edit
 */
edit.url = (args: { id: string | number } | [id: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
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

    return edit.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
 * @see \App\Http\Controllers\PostController::edit
 * @see app\Http\Controllers\PostController.php:0
 * @route /posts/{id}/edit
 */
edit.get = (args: { id: string | number } | [id: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: edit.url(args, options),
    method: 'get',
})

/**
 * @see \App\Http\Controllers\PostController::edit
 * @see app\Http\Controllers\PostController.php:0
 * @route /posts/{id}/edit
 */
edit.head = (args: { id: string | number } | [id: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: edit.url(args, options),
    method: 'head',
})


export default edit