import { queryParams, type QueryParams } from './../../../../wayfinder'

/**
 * @see \App\Http\Controllers\EmployeerController::index
 * @see app\Http\Controllers\EmployeerController.php:15
 * @route /employers
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
    url: '\/employers',
}

/**
 * @see \App\Http\Controllers\EmployeerController::index
 * @see app\Http\Controllers\EmployeerController.php:15
 * @route /employers
 */
index.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return index.definition.url + queryParams(options)
}

/**
 * @see \App\Http\Controllers\EmployeerController::index
 * @see app\Http\Controllers\EmployeerController.php:15
 * @route /employers
 */
index.get = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: index.url(options),
    method: 'get',
})

/**
 * @see \App\Http\Controllers\EmployeerController::index
 * @see app\Http\Controllers\EmployeerController.php:15
 * @route /employers
 */
index.head = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: index.url(options),
    method: 'head',
})


/**
 * @see \App\Http\Controllers\EmployeerController::create
 * @see app\Http\Controllers\EmployeerController.php:37
 * @route /employers/create
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
    url: '\/employers\/create',
}

/**
 * @see \App\Http\Controllers\EmployeerController::create
 * @see app\Http\Controllers\EmployeerController.php:37
 * @route /employers/create
 */
create.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return create.definition.url + queryParams(options)
}

/**
 * @see \App\Http\Controllers\EmployeerController::create
 * @see app\Http\Controllers\EmployeerController.php:37
 * @route /employers/create
 */
create.get = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: create.url(options),
    method: 'get',
})

/**
 * @see \App\Http\Controllers\EmployeerController::create
 * @see app\Http\Controllers\EmployeerController.php:37
 * @route /employers/create
 */
create.head = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: create.url(options),
    method: 'head',
})


/**
 * @see \App\Http\Controllers\EmployeerController::store
 * @see app\Http\Controllers\EmployeerController.php:44
 * @route /employers
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
    url: '\/employers',
}

/**
 * @see \App\Http\Controllers\EmployeerController::store
 * @see app\Http\Controllers\EmployeerController.php:44
 * @route /employers
 */
store.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return store.definition.url + queryParams(options)
}

/**
 * @see \App\Http\Controllers\EmployeerController::store
 * @see app\Http\Controllers\EmployeerController.php:44
 * @route /employers
 */
store.post = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'post',
} => ({
    url: store.url(options),
    method: 'post',
})


/**
 * @see \App\Http\Controllers\EmployeerController::show
 * @see app\Http\Controllers\EmployeerController.php:51
 * @route /employers/{employer}
 */
export const show = (args: { employer: string | number } | [employer: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ['get','head'],
    url: '\/employers\/{employer}',
}

/**
 * @see \App\Http\Controllers\EmployeerController::show
 * @see app\Http\Controllers\EmployeerController.php:51
 * @route /employers/{employer}
 */
show.url = (args: { employer: string | number } | [employer: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { employer: args }
    }

    if (Array.isArray(args)) {
        args = {
            employer: args[0],
        }
    }

    const parsedArgs = {
        employer: args.employer,
    }

    return show.definition.url
            .replace('{employer}', parsedArgs.employer.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
 * @see \App\Http\Controllers\EmployeerController::show
 * @see app\Http\Controllers\EmployeerController.php:51
 * @route /employers/{employer}
 */
show.get = (args: { employer: string | number } | [employer: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: show.url(args, options),
    method: 'get',
})

/**
 * @see \App\Http\Controllers\EmployeerController::show
 * @see app\Http\Controllers\EmployeerController.php:51
 * @route /employers/{employer}
 */
show.head = (args: { employer: string | number } | [employer: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: show.url(args, options),
    method: 'head',
})


/**
 * @see \App\Http\Controllers\EmployeerController::edit
 * @see app\Http\Controllers\EmployeerController.php:58
 * @route /employers/{employer}/edit
 */
export const edit = (args: { employer: string | number } | [employer: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ['get','head'],
    url: '\/employers\/{employer}\/edit',
}

/**
 * @see \App\Http\Controllers\EmployeerController::edit
 * @see app\Http\Controllers\EmployeerController.php:58
 * @route /employers/{employer}/edit
 */
edit.url = (args: { employer: string | number } | [employer: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { employer: args }
    }

    if (Array.isArray(args)) {
        args = {
            employer: args[0],
        }
    }

    const parsedArgs = {
        employer: args.employer,
    }

    return edit.definition.url
            .replace('{employer}', parsedArgs.employer.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
 * @see \App\Http\Controllers\EmployeerController::edit
 * @see app\Http\Controllers\EmployeerController.php:58
 * @route /employers/{employer}/edit
 */
edit.get = (args: { employer: string | number } | [employer: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: edit.url(args, options),
    method: 'get',
})

/**
 * @see \App\Http\Controllers\EmployeerController::edit
 * @see app\Http\Controllers\EmployeerController.php:58
 * @route /employers/{employer}/edit
 */
edit.head = (args: { employer: string | number } | [employer: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: edit.url(args, options),
    method: 'head',
})


/**
 * @see \App\Http\Controllers\EmployeerController::update
 * @see app\Http\Controllers\EmployeerController.php:65
 * @route /employers/{employer}
 */
export const update = (args: { employer: string | number } | [employer: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'put',
} => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ['put','patch'],
    url: '\/employers\/{employer}',
}

/**
 * @see \App\Http\Controllers\EmployeerController::update
 * @see app\Http\Controllers\EmployeerController.php:65
 * @route /employers/{employer}
 */
update.url = (args: { employer: string | number } | [employer: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { employer: args }
    }

    if (Array.isArray(args)) {
        args = {
            employer: args[0],
        }
    }

    const parsedArgs = {
        employer: args.employer,
    }

    return update.definition.url
            .replace('{employer}', parsedArgs.employer.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
 * @see \App\Http\Controllers\EmployeerController::update
 * @see app\Http\Controllers\EmployeerController.php:65
 * @route /employers/{employer}
 */
update.put = (args: { employer: string | number } | [employer: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'put',
} => ({
    url: update.url(args, options),
    method: 'put',
})

/**
 * @see \App\Http\Controllers\EmployeerController::update
 * @see app\Http\Controllers\EmployeerController.php:65
 * @route /employers/{employer}
 */
update.patch = (args: { employer: string | number } | [employer: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'patch',
} => ({
    url: update.url(args, options),
    method: 'patch',
})


/**
 * @see \App\Http\Controllers\EmployeerController::destroy
 * @see app\Http\Controllers\EmployeerController.php:72
 * @route /employers/{employer}
 */
export const destroy = (args: { employer: string | number } | [employer: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'delete',
} => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ['delete'],
    url: '\/employers\/{employer}',
}

/**
 * @see \App\Http\Controllers\EmployeerController::destroy
 * @see app\Http\Controllers\EmployeerController.php:72
 * @route /employers/{employer}
 */
destroy.url = (args: { employer: string | number } | [employer: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { employer: args }
    }

    if (Array.isArray(args)) {
        args = {
            employer: args[0],
        }
    }

    const parsedArgs = {
        employer: args.employer,
    }

    return destroy.definition.url
            .replace('{employer}', parsedArgs.employer.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
 * @see \App\Http\Controllers\EmployeerController::destroy
 * @see app\Http\Controllers\EmployeerController.php:72
 * @route /employers/{employer}
 */
destroy.delete = (args: { employer: string | number } | [employer: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'delete',
} => ({
    url: destroy.url(args, options),
    method: 'delete',
})


const EmployeerController = { index, create, store, show, edit, update, destroy }

export default EmployeerController