import { queryParams, type QueryParams } from './../../wayfinder'

/**
 * @see \App\Http\Controllers\EmployeerController::update
 * @see app\Http\Controllers\EmployeerController.php:65
 * @route /employers/{employer}
 */
export const update = (args: { employer: string | number } | [employer: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'put',
} => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ['put','patch'],
    url: '\/employers\/{employer}',
}

/**
 * @see \App\Http\Controllers\EmployeerController::update
 * @see app\Http\Controllers\EmployeerController.php:65
 * @route /employers/{employer}
 */
update.url = (args: { employer: string | number } | [employer: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
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

    return update.definition.url
            .replace('{employer}', parsedArgs.employer.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
 * @see \App\Http\Controllers\EmployeerController::update
 * @see app\Http\Controllers\EmployeerController.php:65
 * @route /employers/{employer}
 */
update.put = (args: { employer: string | number } | [employer: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'put',
} => ({
    url: update.url(args, options),
    method: 'put',
})

/**
 * @see \App\Http\Controllers\EmployeerController::update
 * @see app\Http\Controllers\EmployeerController.php:65
 * @route /employers/{employer}
 */
update.patch = (args: { employer: string | number } | [employer: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'patch',
} => ({
    url: update.url(args, options),
    method: 'patch',
})


export default update