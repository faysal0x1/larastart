import { queryParams, type QueryParams } from './../../wayfinder'

/**
 * @see \App\Http\Controllers\FreelancerController::show
 * @see app\Http\Controllers\FreelancerController.php:51
 * @route /freelancers/{freelancer}
 */
export const show = (args: { freelancer: string | number } | [freelancer: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ['get','head'],
    url: '\/freelancers\/{freelancer}',
}

/**
 * @see \App\Http\Controllers\FreelancerController::show
 * @see app\Http\Controllers\FreelancerController.php:51
 * @route /freelancers/{freelancer}
 */
show.url = (args: { freelancer: string | number } | [freelancer: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
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

    return show.definition.url
            .replace('{freelancer}', parsedArgs.freelancer.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
 * @see \App\Http\Controllers\FreelancerController::show
 * @see app\Http\Controllers\FreelancerController.php:51
 * @route /freelancers/{freelancer}
 */
show.get = (args: { freelancer: string | number } | [freelancer: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: show.url(args, options),
    method: 'get',
})

/**
 * @see \App\Http\Controllers\FreelancerController::show
 * @see app\Http\Controllers\FreelancerController.php:51
 * @route /freelancers/{freelancer}
 */
show.head = (args: { freelancer: string | number } | [freelancer: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: show.url(args, options),
    method: 'head',
})


export default show