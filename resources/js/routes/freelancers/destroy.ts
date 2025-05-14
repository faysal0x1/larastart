import { queryParams, type QueryParams } from './../../wayfinder'

/**
 * @see \App\Http\Controllers\FreelancerController::destroy
 * @see app\Http\Controllers\FreelancerController.php:82
 * @route /freelancers/{freelancer}
 */
export const destroy = (args: { freelancer: string | number } | [freelancer: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'delete',
} => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ['delete'],
    url: '\/freelancers\/{freelancer}',
}

/**
 * @see \App\Http\Controllers\FreelancerController::destroy
 * @see app\Http\Controllers\FreelancerController.php:82
 * @route /freelancers/{freelancer}
 */
destroy.url = (args: { freelancer: string | number } | [freelancer: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { freelancer: args }
    }

    if (Array.isArray(args)) {
        args = {
            freelancer: args[0],
        }
    }

    const parsedArgs = {
        freelancer: args.freelancer,
    }

    return destroy.definition.url
            .replace('{freelancer}', parsedArgs.freelancer.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
 * @see \App\Http\Controllers\FreelancerController::destroy
 * @see app\Http\Controllers\FreelancerController.php:82
 * @route /freelancers/{freelancer}
 */
destroy.delete = (args: { freelancer: string | number } | [freelancer: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'delete',
} => ({
    url: destroy.url(args, options),
    method: 'delete',
})


export default destroy