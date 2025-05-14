import { queryParams, type QueryParams } from './../../wayfinder'

/**
 * @see \App\Http\Controllers\JobController::destroy
 * @see app\Http\Controllers\JobController.php:60
 * @route /jobs/{job}
 */
export const destroy = (args: { job: string | number } | [job: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'delete',
} => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ['delete'],
    url: '\/jobs\/{job}',
}

/**
 * @see \App\Http\Controllers\JobController::destroy
 * @see app\Http\Controllers\JobController.php:60
 * @route /jobs/{job}
 */
destroy.url = (args: { job: string | number } | [job: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
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

    return destroy.definition.url
            .replace('{job}', parsedArgs.job.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
 * @see \App\Http\Controllers\JobController::destroy
 * @see app\Http\Controllers\JobController.php:60
 * @route /jobs/{job}
 */
destroy.delete = (args: { job: string | number } | [job: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'delete',
} => ({
    url: destroy.url(args, options),
    method: 'delete',
})


export default destroy