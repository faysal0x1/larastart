import { queryParams, type QueryParams } from './../../wayfinder'

/**
 * @see \App\Http\Controllers\Settings\PasswordController::update
 * @see app\Http\Controllers\Settings\PasswordController.php:30
 * @route /settings/password
 */
export const update = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'put',
} => ({
    url: update.url(options),
    method: 'put',
})

update.definition = {
    methods: ['put'],
    url: '\/settings\/password',
}

/**
 * @see \App\Http\Controllers\Settings\PasswordController::update
 * @see app\Http\Controllers\Settings\PasswordController.php:30
 * @route /settings/password
 */
update.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return update.definition.url + queryParams(options)
}

/**
 * @see \App\Http\Controllers\Settings\PasswordController::update
 * @see app\Http\Controllers\Settings\PasswordController.php:30
 * @route /settings/password
 */
update.put = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'put',
} => ({
    url: update.url(options),
    method: 'put',
})


export default update