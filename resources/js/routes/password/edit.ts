import { queryParams, type QueryParams } from './../../wayfinder'

/**
 * @see \App\Http\Controllers\Settings\PasswordController::edit
 * @see app\Http\Controllers\Settings\PasswordController.php:19
 * @route /settings/password
 */
export const edit = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: edit.url(options),
    method: 'get',
})

edit.definition = {
    methods: ['get','head'],
    url: '\/settings\/password',
}

/**
 * @see \App\Http\Controllers\Settings\PasswordController::edit
 * @see app\Http\Controllers\Settings\PasswordController.php:19
 * @route /settings/password
 */
edit.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return edit.definition.url + queryParams(options)
}

/**
 * @see \App\Http\Controllers\Settings\PasswordController::edit
 * @see app\Http\Controllers\Settings\PasswordController.php:19
 * @route /settings/password
 */
edit.get = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: edit.url(options),
    method: 'get',
})

/**
 * @see \App\Http\Controllers\Settings\PasswordController::edit
 * @see app\Http\Controllers\Settings\PasswordController.php:19
 * @route /settings/password
 */
edit.head = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: edit.url(options),
    method: 'head',
})


export default edit