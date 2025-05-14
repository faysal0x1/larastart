import { queryParams, type QueryParams } from './../../wayfinder'

/**
 * @see \App\Http\Controllers\Auth\SocialAuthController::callback
 * @see app\Http\Controllers\Auth\SocialAuthController.php:28
 * @route /auth/{provider}/callback
 */
export const callback = (args: { provider: string | number } | [provider: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: callback.url(args, options),
    method: 'get',
})

callback.definition = {
    methods: ['get','head'],
    url: '\/auth\/{provider}\/callback',
}

/**
 * @see \App\Http\Controllers\Auth\SocialAuthController::callback
 * @see app\Http\Controllers\Auth\SocialAuthController.php:28
 * @route /auth/{provider}/callback
 */
callback.url = (args: { provider: string | number } | [provider: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { provider: args }
    }

    if (Array.isArray(args)) {
        args = {
            provider: args[0],
        }
    }

    const parsedArgs = {
        provider: args.provider,
    }

    return callback.definition.url
            .replace('{provider}', parsedArgs.provider.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
 * @see \App\Http\Controllers\Auth\SocialAuthController::callback
 * @see app\Http\Controllers\Auth\SocialAuthController.php:28
 * @route /auth/{provider}/callback
 */
callback.get = (args: { provider: string | number } | [provider: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: callback.url(args, options),
    method: 'get',
})

/**
 * @see \App\Http\Controllers\Auth\SocialAuthController::callback
 * @see app\Http\Controllers\Auth\SocialAuthController.php:28
 * @route /auth/{provider}/callback
 */
callback.head = (args: { provider: string | number } | [provider: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: callback.url(args, options),
    method: 'head',
})


export default callback