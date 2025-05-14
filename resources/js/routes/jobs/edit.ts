import { queryParams, type QueryParams } from './../../wayfinder'

/**
 * @see \App\Http\Controllers\JobController::edit
 * @see app\Http\Controllers\JobController.php:44
 * @route /jobs/{job}/edit
 */
export const edit = (args: { job: string | number } | [job: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ['get','head'],
    url: '\/jobs\/{job}\/edit',
}

/**
 * @see \App\Http\Controllers\JobController::edit
 * @see app\Http\Controllers\JobController.php:44
 * @route /jobs/{job}/edit
 */
edit.url = (args: { job: string | number } | [job: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { job: args }
    }

    if (Array.isArray(args)) {
        args = {
            job: args[0],
        }
    }

    const parsedArgs = {
        job: args.job,
    }

    return edit.definition.url
            .replace('{job}', parsedArgs.job.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
 * @see \App\Http\Controllers\JobController::edit
 * @see app\Http\Controllers\JobController.php:44
 * @route /jobs/{job}/edit
 */
edit.get = (args: { job: string | number } | [job: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: edit.url(args, options),
    method: 'get',
})

/**
 * @see \App\Http\Controllers\JobController::edit
 * @see app\Http\Controllers\JobController.php:44
 * @route /jobs/{job}/edit
 */
edit.head = (args: { job: string | number } | [job: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: edit.url(args, options),
    method: 'head',
})


export default edit