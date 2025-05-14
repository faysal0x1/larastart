import { queryParams, type QueryParams } from './../../../../../wayfinder'

/**
 * @see \App\Http\Controllers\Admin\RoleController::index
 * @see app\Http\Controllers\Admin\RoleController.php:22
 * @route /roles
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
    url: '\/roles',
}

/**
 * @see \App\Http\Controllers\Admin\RoleController::index
 * @see app\Http\Controllers\Admin\RoleController.php:22
 * @route /roles
 */
index.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return index.definition.url + queryParams(options)
}

/**
 * @see \App\Http\Controllers\Admin\RoleController::index
 * @see app\Http\Controllers\Admin\RoleController.php:22
 * @route /roles
 */
index.get = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: index.url(options),
    method: 'get',
})

/**
 * @see \App\Http\Controllers\Admin\RoleController::index
 * @see app\Http\Controllers\Admin\RoleController.php:22
 * @route /roles
 */
index.head = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: index.url(options),
    method: 'head',
})


/**
 * @see \App\Http\Controllers\Admin\RoleController::create
 * @see app\Http\Controllers\Admin\RoleController.php:40
 * @route /roles/create
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
    url: '\/roles\/create',
}

/**
 * @see \App\Http\Controllers\Admin\RoleController::create
 * @see app\Http\Controllers\Admin\RoleController.php:40
 * @route /roles/create
 */
create.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return create.definition.url + queryParams(options)
}

/**
 * @see \App\Http\Controllers\Admin\RoleController::create
 * @see app\Http\Controllers\Admin\RoleController.php:40
 * @route /roles/create
 */
create.get = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: create.url(options),
    method: 'get',
})

/**
 * @see \App\Http\Controllers\Admin\RoleController::create
 * @see app\Http\Controllers\Admin\RoleController.php:40
 * @route /roles/create
 */
create.head = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: create.url(options),
    method: 'head',
})


/**
 * @see \App\Http\Controllers\Admin\RoleController::store
 * @see app\Http\Controllers\Admin\RoleController.php:48
 * @route /roles
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
    url: '\/roles',
}

/**
 * @see \App\Http\Controllers\Admin\RoleController::store
 * @see app\Http\Controllers\Admin\RoleController.php:48
 * @route /roles
 */
store.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return store.definition.url + queryParams(options)
}

/**
 * @see \App\Http\Controllers\Admin\RoleController::store
 * @see app\Http\Controllers\Admin\RoleController.php:48
 * @route /roles
 */
store.post = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'post',
} => ({
    url: store.url(options),
    method: 'post',
})


/**
 * @see \App\Http\Controllers\Admin\RoleController::show
 * @see app\Http\Controllers\Admin\RoleController.php:0
 * @route /roles/{role}
 */
export const show = (args: { role: string | number } | [role: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ['get','head'],
    url: '\/roles\/{role}',
}

/**
 * @see \App\Http\Controllers\Admin\RoleController::show
 * @see app\Http\Controllers\Admin\RoleController.php:0
 * @route /roles/{role}
 */
show.url = (args: { role: string | number } | [role: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { role: args }
    }

    if (Array.isArray(args)) {
        args = {
            role: args[0],
        }
    }

    const parsedArgs = {
        role: args.role,
    }

    return show.definition.url
            .replace('{role}', parsedArgs.role.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
 * @see \App\Http\Controllers\Admin\RoleController::show
 * @see app\Http\Controllers\Admin\RoleController.php:0
 * @route /roles/{role}
 */
show.get = (args: { role: string | number } | [role: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: show.url(args, options),
    method: 'get',
})

/**
 * @see \App\Http\Controllers\Admin\RoleController::show
 * @see app\Http\Controllers\Admin\RoleController.php:0
 * @route /roles/{role}
 */
show.head = (args: { role: string | number } | [role: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: show.url(args, options),
    method: 'head',
})


/**
 * @see \App\Http\Controllers\Admin\RoleController::edit
 * @see app\Http\Controllers\Admin\RoleController.php:61
 * @route /roles/{role}/edit
 */
export const edit = (args: { role: number | { id: number } } | [role: number | { id: number }] | number | { id: number }, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ['get','head'],
    url: '\/roles\/{role}\/edit',
}

/**
 * @see \App\Http\Controllers\Admin\RoleController::edit
 * @see app\Http\Controllers\Admin\RoleController.php:61
 * @route /roles/{role}/edit
 */
edit.url = (args: { role: number | { id: number } } | [role: number | { id: number }] | number | { id: number }, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { role: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { role: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            role: args[0],
        }
    }

    const parsedArgs = {
        role: typeof args.role === 'object'
            ? args.role.id
            : args.role,
    }

    return edit.definition.url
            .replace('{role}', parsedArgs.role.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
 * @see \App\Http\Controllers\Admin\RoleController::edit
 * @see app\Http\Controllers\Admin\RoleController.php:61
 * @route /roles/{role}/edit
 */
edit.get = (args: { role: number | { id: number } } | [role: number | { id: number }] | number | { id: number }, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: edit.url(args, options),
    method: 'get',
})

/**
 * @see \App\Http\Controllers\Admin\RoleController::edit
 * @see app\Http\Controllers\Admin\RoleController.php:61
 * @route /roles/{role}/edit
 */
edit.head = (args: { role: number | { id: number } } | [role: number | { id: number }] | number | { id: number }, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: edit.url(args, options),
    method: 'head',
})


/**
 * @see \App\Http\Controllers\Admin\RoleController::update
 * @see app\Http\Controllers\Admin\RoleController.php:72
 * @route /roles/{role}
 */
export const update = (args: { role: number | { id: number } } | [role: number | { id: number }] | number | { id: number }, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'put',
} => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ['put','patch'],
    url: '\/roles\/{role}',
}

/**
 * @see \App\Http\Controllers\Admin\RoleController::update
 * @see app\Http\Controllers\Admin\RoleController.php:72
 * @route /roles/{role}
 */
update.url = (args: { role: number | { id: number } } | [role: number | { id: number }] | number | { id: number }, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { role: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { role: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            role: args[0],
        }
    }

    const parsedArgs = {
        role: typeof args.role === 'object'
            ? args.role.id
            : args.role,
    }

    return update.definition.url
            .replace('{role}', parsedArgs.role.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
 * @see \App\Http\Controllers\Admin\RoleController::update
 * @see app\Http\Controllers\Admin\RoleController.php:72
 * @route /roles/{role}
 */
update.put = (args: { role: number | { id: number } } | [role: number | { id: number }] | number | { id: number }, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'put',
} => ({
    url: update.url(args, options),
    method: 'put',
})

/**
 * @see \App\Http\Controllers\Admin\RoleController::update
 * @see app\Http\Controllers\Admin\RoleController.php:72
 * @route /roles/{role}
 */
update.patch = (args: { role: number | { id: number } } | [role: number | { id: number }] | number | { id: number }, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'patch',
} => ({
    url: update.url(args, options),
    method: 'patch',
})


/**
 * @see \App\Http\Controllers\Admin\RoleController::destroy
 * @see app\Http\Controllers\Admin\RoleController.php:85
 * @route /roles/{role}
 */
export const destroy = (args: { role: number | { id: number } } | [role: number | { id: number }] | number | { id: number }, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'delete',
} => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ['delete'],
    url: '\/roles\/{role}',
}

/**
 * @see \App\Http\Controllers\Admin\RoleController::destroy
 * @see app\Http\Controllers\Admin\RoleController.php:85
 * @route /roles/{role}
 */
destroy.url = (args: { role: number | { id: number } } | [role: number | { id: number }] | number | { id: number }, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { role: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { role: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            role: args[0],
        }
    }

    const parsedArgs = {
        role: typeof args.role === 'object'
            ? args.role.id
            : args.role,
    }

    return destroy.definition.url
            .replace('{role}', parsedArgs.role.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
 * @see \App\Http\Controllers\Admin\RoleController::destroy
 * @see app\Http\Controllers\Admin\RoleController.php:85
 * @route /roles/{role}
 */
destroy.delete = (args: { role: number | { id: number } } | [role: number | { id: number }] | number | { id: number }, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'delete',
} => ({
    url: destroy.url(args, options),
    method: 'delete',
})


const RoleController = { index, create, store, show, edit, update, destroy }

export default RoleController