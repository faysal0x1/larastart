import { queryParams, type QueryParams } from './../../../../wayfinder'

/**
 * @see \App\Http\Controllers\AdminController::update
 * @see app\Http\Controllers\AdminController.php:87
 * @route /{model}/{id}
 */
export const update = (args: { model: string | number, id: string | number } | [model: string | number, id: string | number], options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'patch',
} => ({
    url: update.url(args, options),
    method: 'patch',
})

update.definition = {
    methods: ['patch'],
    url: '\/{model}\/{id}',
}

/**
 * @see \App\Http\Controllers\AdminController::update
 * @see app\Http\Controllers\AdminController.php:87
 * @route /{model}/{id}
 */
update.url = (args: { model: string | number, id: string | number } | [model: string | number, id: string | number], options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    if (Array.isArray(args)) {
        args = {
            model: args[0],
            id: args[1],
        }
    }

    const parsedArgs = {
        model: args.model,
        id: args.id,
    }

    return update.definition.url
            .replace('{model}', parsedArgs.model.toString())
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
 * @see \App\Http\Controllers\AdminController::update
 * @see app\Http\Controllers\AdminController.php:87
 * @route /{model}/{id}
 */
update.patch = (args: { model: string | number, id: string | number } | [model: string | number, id: string | number], options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'patch',
} => ({
    url: update.url(args, options),
    method: 'patch',
})


const AdminController = { update }

export default AdminController