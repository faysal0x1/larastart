import { queryParams, type QueryParams } from './../../wayfinder'

/**
 * @see \App\Http\Controllers\EmployeerController::show
 * @see app\Http\Controllers\EmployeerController.php:51
 * @route /employers/{employer}
 */
export const show = (args: { employer: string | number } | [employer: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ['get','head'],
    url: '\/employers\/{employer}',
}

/**
 * @see \App\Http\Controllers\EmployeerController::show
 * @see app\Http\Controllers\EmployeerController.php:51
 * @route /employers/{employer}
 */
show.url = (args: { employer: string | number } | [employer: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
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

    return show.definition.url
            .replace('{employer}', parsedArgs.employer.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
 * @see \App\Http\Controllers\EmployeerController::show
 * @see app\Http\Controllers\EmployeerController.php:51
 * @route /employers/{employer}
 */
show.get = (args: { employer: string | number } | [employer: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: show.url(args, options),
    method: 'get',
})

/**
 * @see \App\Http\Controllers\EmployeerController::show
 * @see app\Http\Controllers\EmployeerController.php:51
 * @route /employers/{employer}
 */
show.head = (args: { employer: string | number } | [employer: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: show.url(args, options),
    method: 'head',
})


export default show