import { queryParams, type QueryParams } from './../../wayfinder'

/**
 * @see \App\Http\Controllers\EmployeerController::edit
 * @see app\Http\Controllers\EmployeerController.php:58
 * @route /employers/{employer}/edit
 */
export const edit = (args: { employer: string | number } | [employer: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ['get','head'],
    url: '\/employers\/{employer}\/edit',
}

/**
 * @see \App\Http\Controllers\EmployeerController::edit
 * @see app\Http\Controllers\EmployeerController.php:58
 * @route /employers/{employer}/edit
 */
edit.url = (args: { employer: string | number } | [employer: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
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

    return edit.definition.url
            .replace('{employer}', parsedArgs.employer.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
 * @see \App\Http\Controllers\EmployeerController::edit
 * @see app\Http\Controllers\EmployeerController.php:58
 * @route /employers/{employer}/edit
 */
edit.get = (args: { employer: string | number } | [employer: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: edit.url(args, options),
    method: 'get',
})

/**
 * @see \App\Http\Controllers\EmployeerController::edit
 * @see app\Http\Controllers\EmployeerController.php:58
 * @route /employers/{employer}/edit
 */
edit.head = (args: { employer: string | number } | [employer: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: edit.url(args, options),
    method: 'head',
})


export default edit