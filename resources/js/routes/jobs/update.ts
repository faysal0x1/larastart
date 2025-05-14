import { queryParams, type QueryParams } from './../../wayfinder'

/**
 * @see \App\Http\Controllers\JobController::update
 * @see app\Http\Controllers\JobController.php:52
 * @route /jobs/{job}
 */
export const update = (args: { job: string | number } | [job: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'put',
} => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ['put','patch'],
    url: '\/jobs\/{job}',
}

/**
 * @see \App\Http\Controllers\JobController::update
 * @see app\Http\Controllers\JobController.php:52
 * @route /jobs/{job}
 */
update.url = (args: { job: string | number } | [job: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
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

    return update.definition.url
            .replace('{job}', parsedArgs.job.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
 * @see \App\Http\Controllers\JobController::update
 * @see app\Http\Controllers\JobController.php:52
 * @route /jobs/{job}
 */
update.put = (args: { job: string | number } | [job: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'put',
} => ({
    url: update.url(args, options),
    method: 'put',
})

/**
 * @see \App\Http\Controllers\JobController::update
 * @see app\Http\Controllers\JobController.php:52
 * @route /jobs/{job}
 */
update.patch = (args: { job: string | number } | [job: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'patch',
} => ({
    url: update.url(args, options),
    method: 'patch',
})


export default update