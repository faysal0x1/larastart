import { queryParams, type QueryParams } from './../../wayfinder'

/**
 * @see \App\Http\Controllers\JobController::show
 * @see app\Http\Controllers\JobController.php:36
 * @route /jobs/{job}
 */
export const show = (args: { job: string | number } | [job: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ['get','head'],
    url: '\/jobs\/{job}',
}

/**
 * @see \App\Http\Controllers\JobController::show
 * @see app\Http\Controllers\JobController.php:36
 * @route /jobs/{job}
 */
show.url = (args: { job: string | number } | [job: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
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

    return show.definition.url
            .replace('{job}', parsedArgs.job.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
 * @see \App\Http\Controllers\JobController::show
 * @see app\Http\Controllers\JobController.php:36
 * @route /jobs/{job}
 */
show.get = (args: { job: string | number } | [job: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: show.url(args, options),
    method: 'get',
})

/**
 * @see \App\Http\Controllers\JobController::show
 * @see app\Http\Controllers\JobController.php:36
 * @route /jobs/{job}
 */
show.head = (args: { job: string | number } | [job: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: show.url(args, options),
    method: 'head',
})


export default show