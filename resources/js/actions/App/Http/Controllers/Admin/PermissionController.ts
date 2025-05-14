import { queryParams, type QueryParams } from './../../../../../wayfinder'

/**
 * @see \App\Http\Controllers\Admin\PermissionController::index
 * @see app\Http\Controllers\Admin\PermissionController.php:14
 * @route /permissions
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
    url: '\/permissions',
}

/**
 * @see \App\Http\Controllers\Admin\PermissionController::index
 * @see app\Http\Controllers\Admin\PermissionController.php:14
 * @route /permissions
 */
index.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return index.definition.url + queryParams(options)
}

/**
 * @see \App\Http\Controllers\Admin\PermissionController::index
 * @see app\Http\Controllers\Admin\PermissionController.php:14
 * @route /permissions
 */
index.get = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: index.url(options),
    method: 'get',
})

/**
 * @see \App\Http\Controllers\Admin\PermissionController::index
 * @see app\Http\Controllers\Admin\PermissionController.php:14
 * @route /permissions
 */
index.head = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: index.url(options),
    method: 'head',
})


/**
 * @see \App\Http\Controllers\Admin\PermissionController::create
 * @see app\Http\Controllers\Admin\PermissionController.php:33
 * @route /permissions/create
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
    url: '\/permissions\/create',
}

/**
 * @see \App\Http\Controllers\Admin\PermissionController::create
 * @see app\Http\Controllers\Admin\PermissionController.php:33
 * @route /permissions/create
 */
create.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return create.definition.url + queryParams(options)
}

/**
 * @see \App\Http\Controllers\Admin\PermissionController::create
 * @see app\Http\Controllers\Admin\PermissionController.php:33
 * @route /permissions/create
 */
create.get = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: create.url(options),
    method: 'get',
})

/**
 * @see \App\Http\Controllers\Admin\PermissionController::create
 * @see app\Http\Controllers\Admin\PermissionController.php:33
 * @route /permissions/create
 */
create.head = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: create.url(options),
    method: 'head',
})


/**
 * @see \App\Http\Controllers\Admin\PermissionController::store
 * @see app\Http\Controllers\Admin\PermissionController.php:40
 * @route /permissions
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
    url: '\/permissions',
}

/**
 * @see \App\Http\Controllers\Admin\PermissionController::store
 * @see app\Http\Controllers\Admin\PermissionController.php:40
 * @route /permissions
 */
store.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return store.definition.url + queryParams(options)
}

/**
 * @see \App\Http\Controllers\Admin\PermissionController::store
 * @see app\Http\Controllers\Admin\PermissionController.php:40
 * @route /permissions
 */
store.post = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'post',
} => ({
    url: store.url(options),
    method: 'post',
})


/**
 * @see \App\Http\Controllers\Admin\PermissionController::show
 * @see app\Http\Controllers\Admin\PermissionController.php:53
 * @route /permissions/{permission}
 */
export const show = (args: { permission: string | number } | [permission: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ['get','head'],
    url: '\/permissions\/{permission}',
}

/**
 * @see \App\Http\Controllers\Admin\PermissionController::show
 * @see app\Http\Controllers\Admin\PermissionController.php:53
 * @route /permissions/{permission}
 */
show.url = (args: { permission: string | number } | [permission: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { permission: args }
    }

    if (Array.isArray(args)) {
        args = {
            permission: args[0],
        }
    }

    const parsedArgs = {
        permission: args.permission,
    }

    return show.definition.url
            .replace('{permission}', parsedArgs.permission.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
 * @see \App\Http\Controllers\Admin\PermissionController::show
 * @see app\Http\Controllers\Admin\PermissionController.php:53
 * @route /permissions/{permission}
 */
show.get = (args: { permission: string | number } | [permission: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: show.url(args, options),
    method: 'get',
})

/**
 * @see \App\Http\Controllers\Admin\PermissionController::show
 * @see app\Http\Controllers\Admin\PermissionController.php:53
 * @route /permissions/{permission}
 */
show.head = (args: { permission: string | number } | [permission: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: show.url(args, options),
    method: 'head',
})


/**
 * @see \App\Http\Controllers\Admin\PermissionController::edit
 * @see app\Http\Controllers\Admin\PermissionController.php:60
 * @route /permissions/{permission}/edit
 */
export const edit = (args: { permission: string | number } | [permission: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ['get','head'],
    url: '\/permissions\/{permission}\/edit',
}

/**
 * @see \App\Http\Controllers\Admin\PermissionController::edit
 * @see app\Http\Controllers\Admin\PermissionController.php:60
 * @route /permissions/{permission}/edit
 */
edit.url = (args: { permission: string | number } | [permission: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { permission: args }
    }

    if (Array.isArray(args)) {
        args = {
            permission: args[0],
        }
    }

    const parsedArgs = {
        permission: args.permission,
    }

    return edit.definition.url
            .replace('{permission}', parsedArgs.permission.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
 * @see \App\Http\Controllers\Admin\PermissionController::edit
 * @see app\Http\Controllers\Admin\PermissionController.php:60
 * @route /permissions/{permission}/edit
 */
edit.get = (args: { permission: string | number } | [permission: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: edit.url(args, options),
    method: 'get',
})

/**
 * @see \App\Http\Controllers\Admin\PermissionController::edit
 * @see app\Http\Controllers\Admin\PermissionController.php:60
 * @route /permissions/{permission}/edit
 */
edit.head = (args: { permission: string | number } | [permission: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: edit.url(args, options),
    method: 'head',
})


/**
 * @see \App\Http\Controllers\Admin\PermissionController::update
 * @see app\Http\Controllers\Admin\PermissionController.php:71
 * @route /permissions/{permission}
 */
export const update = (args: { permission: string | number } | [permission: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'put',
} => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ['put','patch'],
    url: '\/permissions\/{permission}',
}

/**
 * @see \App\Http\Controllers\Admin\PermissionController::update
 * @see app\Http\Controllers\Admin\PermissionController.php:71
 * @route /permissions/{permission}
 */
update.url = (args: { permission: string | number } | [permission: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { permission: args }
    }

    if (Array.isArray(args)) {
        args = {
            permission: args[0],
        }
    }

    const parsedArgs = {
        permission: args.permission,
    }

    return update.definition.url
            .replace('{permission}', parsedArgs.permission.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
 * @see \App\Http\Controllers\Admin\PermissionController::update
 * @see app\Http\Controllers\Admin\PermissionController.php:71
 * @route /permissions/{permission}
 */
update.put = (args: { permission: string | number } | [permission: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'put',
} => ({
    url: update.url(args, options),
    method: 'put',
})

/**
 * @see \App\Http\Controllers\Admin\PermissionController::update
 * @see app\Http\Controllers\Admin\PermissionController.php:71
 * @route /permissions/{permission}
 */
update.patch = (args: { permission: string | number } | [permission: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'patch',
} => ({
    url: update.url(args, options),
    method: 'patch',
})


/**
 * @see \App\Http\Controllers\Admin\PermissionController::destroy
 * @see app\Http\Controllers\Admin\PermissionController.php:89
 * @route /permissions/{permission}
 */
export const destroy = (args: { permission: string | number } | [permission: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'delete',
} => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ['delete'],
    url: '\/permissions\/{permission}',
}

/**
 * @see \App\Http\Controllers\Admin\PermissionController::destroy
 * @see app\Http\Controllers\Admin\PermissionController.php:89
 * @route /permissions/{permission}
 */
destroy.url = (args: { permission: string | number } | [permission: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { permission: args }
    }

    if (Array.isArray(args)) {
        args = {
            permission: args[0],
        }
    }

    const parsedArgs = {
        permission: args.permission,
    }

    return destroy.definition.url
            .replace('{permission}', parsedArgs.permission.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
 * @see \App\Http\Controllers\Admin\PermissionController::destroy
 * @see app\Http\Controllers\Admin\PermissionController.php:89
 * @route /permissions/{permission}
 */
destroy.delete = (args: { permission: string | number } | [permission: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'delete',
} => ({
    url: destroy.url(args, options),
    method: 'delete',
})


const PermissionController = { index, create, store, show, edit, update, destroy }

export default PermissionController