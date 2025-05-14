import { queryParams, type QueryParams } from './../../wayfinder'

/**
 * @see \App\Http\Controllers\FreelancerController::edit
 * @see app\Http\Controllers\FreelancerController.php:68
 * @route /freelancers/{freelancer}/edit
 */
export const edit = (args: { freelancer: string | number } | [freelancer: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ['get','head'],
    url: '\/freelancers\/{freelancer}\/edit',
}

/**
 * @see \App\Http\Controllers\FreelancerController::edit
 * @see app\Http\Controllers\FreelancerController.php:68
 * @route /freelancers/{freelancer}/edit
 */
edit.url = (args: { freelancer: string | number } | [freelancer: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
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

    return edit.definition.url
            .replace('{freelancer}', parsedArgs.freelancer.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
 * @see \App\Http\Controllers\FreelancerController::edit
 * @see app\Http\Controllers\FreelancerController.php:68
 * @route /freelancers/{freelancer}/edit
 */
edit.get = (args: { freelancer: string | number } | [freelancer: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: edit.url(args, options),
    method: 'get',
})

/**
 * @see \App\Http\Controllers\FreelancerController::edit
 * @see app\Http\Controllers\FreelancerController.php:68
 * @route /freelancers/{freelancer}/edit
 */
edit.head = (args: { freelancer: string | number } | [freelancer: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: edit.url(args, options),
    method: 'head',
})


export default edit