import { queryParams, type QueryParams } from './../../../../wayfinder'

/**
 * @see \App\Http\Controllers\JobController::index
 * @see app\Http\Controllers\JobController.php:12
 * @route /jobs
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
    url: '\/jobs',
}

/**
 * @see \App\Http\Controllers\JobController::index
 * @see app\Http\Controllers\JobController.php:12
 * @route /jobs
 */
index.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return index.definition.url + queryParams(options)
}

/**
 * @see \App\Http\Controllers\JobController::index
 * @see app\Http\Controllers\JobController.php:12
 * @route /jobs
 */
index.get = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: index.url(options),
    method: 'get',
})

/**
 * @see \App\Http\Controllers\JobController::index
 * @see app\Http\Controllers\JobController.php:12
 * @route /jobs
 */
index.head = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: index.url(options),
    method: 'head',
})


/**
 * @see \App\Http\Controllers\JobController::create
 * @see app\Http\Controllers\JobController.php:20
 * @route /jobs/create
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
    url: '\/jobs\/create',
}

/**
 * @see \App\Http\Controllers\JobController::create
 * @see app\Http\Controllers\JobController.php:20
 * @route /jobs/create
 */
create.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return create.definition.url + queryParams(options)
}

/**
 * @see \App\Http\Controllers\JobController::create
 * @see app\Http\Controllers\JobController.php:20
 * @route /jobs/create
 */
create.get = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: create.url(options),
    method: 'get',
})

/**
 * @see \App\Http\Controllers\JobController::create
 * @see app\Http\Controllers\JobController.php:20
 * @route /jobs/create
 */
create.head = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: create.url(options),
    method: 'head',
})


/**
 * @see \App\Http\Controllers\JobController::store
 * @see app\Http\Controllers\JobController.php:28
 * @route /jobs
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
    url: '\/jobs',
}

/**
 * @see \App\Http\Controllers\JobController::store
 * @see app\Http\Controllers\JobController.php:28
 * @route /jobs
 */
store.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return store.definition.url + queryParams(options)
}

/**
 * @see \App\Http\Controllers\JobController::store
 * @see app\Http\Controllers\JobController.php:28
 * @route /jobs
 */
store.post = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'post',
} => ({
    url: store.url(options),
    method: 'post',
})


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


const JobController = { index, create, store, show, edit, update, destroy }

export default JobController