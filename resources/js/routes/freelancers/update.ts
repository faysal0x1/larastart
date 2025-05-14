import { queryParams, type QueryParams } from './../../wayfinder'

/**
 * @see \App\Http\Controllers\FreelancerController::update
 * @see app\Http\Controllers\FreelancerController.php:75
 * @route /freelancers/{freelancer}
 */
export const update = (args: { freelancer: string | number } | [freelancer: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'put',
} => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ['put','patch'],
    url: '\/freelancers\/{freelancer}',
}

/**
 * @see \App\Http\Controllers\FreelancerController::update
 * @see app\Http\Controllers\FreelancerController.php:75
 * @route /freelancers/{freelancer}
 */
update.url = (args: { freelancer: string | number } | [freelancer: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
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

    return update.definition.url
            .replace('{freelancer}', parsedArgs.freelancer.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
 * @see \App\Http\Controllers\FreelancerController::update
 * @see app\Http\Controllers\FreelancerController.php:75
 * @route /freelancers/{freelancer}
 */
update.put = (args: { freelancer: string | number } | [freelancer: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'put',
} => ({
    url: update.url(args, options),
    method: 'put',
})

/**
 * @see \App\Http\Controllers\FreelancerController::update
 * @see app\Http\Controllers\FreelancerController.php:75
 * @route /freelancers/{freelancer}
 */
update.patch = (args: { freelancer: string | number } | [freelancer: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'patch',
} => ({
    url: update.url(args, options),
    method: 'patch',
})


export default update