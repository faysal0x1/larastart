import { queryParams, type QueryParams } from './../../wayfinder'

/**
 * @see \App\Http\Controllers\Auth\SocialAuthController::login
 * @see app\Http\Controllers\Auth\SocialAuthController.php:17
 * @route /auth/{provider}/redirect
 */
export const login = (args: { provider: string | number } | [provider: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: login.url(args, options),
    method: 'get',
})

login.definition = {
    methods: ['get','head'],
    url: '\/auth\/{provider}\/redirect',
}

/**
 * @see \App\Http\Controllers\Auth\SocialAuthController::login
 * @see app\Http\Controllers\Auth\SocialAuthController.php:17
 * @route /auth/{provider}/redirect
 */
login.url = (args: { provider: string | number } | [provider: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
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

    return login.definition.url
            .replace('{provider}', parsedArgs.provider.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
 * @see \App\Http\Controllers\Auth\SocialAuthController::login
 * @see app\Http\Controllers\Auth\SocialAuthController.php:17
 * @route /auth/{provider}/redirect
 */
login.get = (args: { provider: string | number } | [provider: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: login.url(args, options),
    method: 'get',
})

/**
 * @see \App\Http\Controllers\Auth\SocialAuthController::login
 * @see app\Http\Controllers\Auth\SocialAuthController.php:17
 * @route /auth/{provider}/redirect
 */
login.head = (args: { provider: string | number } | [provider: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: login.url(args, options),
    method: 'head',
})


export default login