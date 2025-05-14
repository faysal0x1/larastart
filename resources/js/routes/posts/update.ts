import { queryParams, type QueryParams } from './../../wayfinder'

/**
 * @see \App\Http\Controllers\PostController::update
 * @see app\Http\Controllers\PostController.php:0
 * @route /posts/{id}
 */
export const update = (args: { id: string | number } | [id: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'post',
} => ({
    url: update.url(args, options),
    method: 'post',
})

update.definition = {
    methods: ['post'],
    url: '\/posts\/{id}',
}

/**
 * @see \App\Http\Controllers\PostController::update
 * @see app\Http\Controllers\PostController.php:0
 * @route /posts/{id}
 */
update.url = (args: { id: string | number } | [id: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
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

    return update.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
 * @see \App\Http\Controllers\PostController::update
 * @see app\Http\Controllers\PostController.php:0
 * @route /posts/{id}
 */
update.post = (args: { id: string | number } | [id: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'post',
} => ({
    url: update.url(args, options),
    method: 'post',
})


export default update