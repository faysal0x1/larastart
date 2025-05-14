import { queryParams, type QueryParams } from './../../wayfinder'

/**
 * @see \App\Http\Controllers\EmployeerController::destroy
 * @see app\Http\Controllers\EmployeerController.php:72
 * @route /employers/{employer}
 */
export const destroy = (args: { employer: string | number } | [employer: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'delete',
} => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ['delete'],
    url: '\/employers\/{employer}',
}

/**
 * @see \App\Http\Controllers\EmployeerController::destroy
 * @see app\Http\Controllers\EmployeerController.php:72
 * @route /employers/{employer}
 */
destroy.url = (args: { employer: string | number } | [employer: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { employer: args }
    }

    if (Array.isArray(args)) {
        args = {
            employer: args[0],
        }
    }

    const parsedArgs = {
        employer: args.employer,
    }

    return destroy.definition.url
            .replace('{employer}', parsedArgs.employer.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
 * @see \App\Http\Controllers\EmployeerController::destroy
 * @see app\Http\Controllers\EmployeerController.php:72
 * @route /employers/{employer}
 */
destroy.delete = (args: { employer: string | number } | [employer: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'delete',
} => ({
    url: destroy.url(args, options),
    method: 'delete',
})


export default destroy