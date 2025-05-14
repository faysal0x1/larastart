import { queryParams, type QueryParams } from './../../../../wayfinder'

/**
 * @see \App\Http\Controllers\FreelancerController::index
 * @see app\Http\Controllers\FreelancerController.php:15
 * @route /freelancers
 */
export const index = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ['get','head'],
    url: '\/freelancers',
}

/**
 * @see \App\Http\Controllers\FreelancerController::index
 * @see app\Http\Controllers\FreelancerController.php:15
 * @route /freelancers
 */
index.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return index.definition.url + queryParams(options)
}

/**
 * @see \App\Http\Controllers\FreelancerController::index
 * @see app\Http\Controllers\FreelancerController.php:15
 * @route /freelancers
 */
index.get = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: index.url(options),
    method: 'get',
})

/**
 * @see \App\Http\Controllers\FreelancerController::index
 * @see app\Http\Controllers\FreelancerController.php:15
 * @route /freelancers
 */
index.head = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: index.url(options),
    method: 'head',
})


/**
 * @see \App\Http\Controllers\FreelancerController::create
 * @see app\Http\Controllers\FreelancerController.php:37
 * @route /freelancers/create
 */
export const create = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ['get','head'],
    url: '\/freelancers\/create',
}

/**
 * @see \App\Http\Controllers\FreelancerController::create
 * @see app\Http\Controllers\FreelancerController.php:37
 * @route /freelancers/create
 */
create.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return create.definition.url + queryParams(options)
}

/**
 * @see \App\Http\Controllers\FreelancerController::create
 * @see app\Http\Controllers\FreelancerController.php:37
 * @route /freelancers/create
 */
create.get = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: create.url(options),
    method: 'get',
})

/**
 * @see \App\Http\Controllers\FreelancerController::create
 * @see app\Http\Controllers\FreelancerController.php:37
 * @route /freelancers/create
 */
create.head = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: create.url(options),
    method: 'head',
})


/**
 * @see \App\Http\Controllers\FreelancerController::store
 * @see app\Http\Controllers\FreelancerController.php:44
 * @route /freelancers
 */
export const store = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'post',
} => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ['post'],
    url: '\/freelancers',
}

/**
 * @see \App\Http\Controllers\FreelancerController::store
 * @see app\Http\Controllers\FreelancerController.php:44
 * @route /freelancers
 */
store.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return store.definition.url + queryParams(options)
}

/**
 * @see \App\Http\Controllers\FreelancerController::store
 * @see app\Http\Controllers\FreelancerController.php:44
 * @route /freelancers
 */
store.post = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'post',
} => ({
    url: store.url(options),
    method: 'post',
})


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


const FreelancerController = { index, create, store, show, edit, update, destroy }

export default FreelancerController