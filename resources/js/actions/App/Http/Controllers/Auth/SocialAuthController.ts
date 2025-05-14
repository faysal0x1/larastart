import { queryParams, type QueryParams } from './../../../../../wayfinder'

/**
 * @see \App\Http\Controllers\Auth\SocialAuthController::redirectToProvider
 * @see app\Http\Controllers\Auth\SocialAuthController.php:17
 * @route /auth/{provider}/redirect
 */
export const redirectToProvider = (args: { provider: string | number } | [provider: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: redirectToProvider.url(args, options),
    method: 'get',
})

redirectToProvider.definition = {
    methods: ['get','head'],
    url: '\/auth\/{provider}\/redirect',
}

/**
 * @see \App\Http\Controllers\Auth\SocialAuthController::redirectToProvider
 * @see app\Http\Controllers\Auth\SocialAuthController.php:17
 * @route /auth/{provider}/redirect
 */
redirectToProvider.url = (args: { provider: string | number } | [provider: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
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

    return redirectToProvider.definition.url
            .replace('{provider}', parsedArgs.provider.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
 * @see \App\Http\Controllers\Auth\SocialAuthController::redirectToProvider
 * @see app\Http\Controllers\Auth\SocialAuthController.php:17
 * @route /auth/{provider}/redirect
 */
redirectToProvider.get = (args: { provider: string | number } | [provider: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: redirectToProvider.url(args, options),
    method: 'get',
})

/**
 * @see \App\Http\Controllers\Auth\SocialAuthController::redirectToProvider
 * @see app\Http\Controllers\Auth\SocialAuthController.php:17
 * @route /auth/{provider}/redirect
 */
redirectToProvider.head = (args: { provider: string | number } | [provider: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: redirectToProvider.url(args, options),
    method: 'head',
})


/**
 * @see \App\Http\Controllers\Auth\SocialAuthController::handleProviderCallback
 * @see app\Http\Controllers\Auth\SocialAuthController.php:28
 * @route /auth/{provider}/callback
 */
export const handleProviderCallback = (args: { provider: string | number } | [provider: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: handleProviderCallback.url(args, options),
    method: 'get',
})

handleProviderCallback.definition = {
    methods: ['get','head'],
    url: '\/auth\/{provider}\/callback',
}

/**
 * @see \App\Http\Controllers\Auth\SocialAuthController::handleProviderCallback
 * @see app\Http\Controllers\Auth\SocialAuthController.php:28
 * @route /auth/{provider}/callback
 */
handleProviderCallback.url = (args: { provider: string | number } | [provider: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
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

    return handleProviderCallback.definition.url
            .replace('{provider}', parsedArgs.provider.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
 * @see \App\Http\Controllers\Auth\SocialAuthController::handleProviderCallback
 * @see app\Http\Controllers\Auth\SocialAuthController.php:28
 * @route /auth/{provider}/callback
 */
handleProviderCallback.get = (args: { provider: string | number } | [provider: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: handleProviderCallback.url(args, options),
    method: 'get',
})

/**
 * @see \App\Http\Controllers\Auth\SocialAuthController::handleProviderCallback
 * @see app\Http\Controllers\Auth\SocialAuthController.php:28
 * @route /auth/{provider}/callback
 */
handleProviderCallback.head = (args: { provider: string | number } | [provider: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: handleProviderCallback.url(args, options),
    method: 'head',
})


const SocialAuthController = { redirectToProvider, handleProviderCallback }

export default SocialAuthController