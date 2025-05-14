import { queryParams, type QueryParams } from './../../../../wayfinder'

/**
 * @see \App\Http\Controllers\PostController::index
 * @see app\Http\Controllers\PostController.php:13
 * @route /posts
 */
export const index = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ['get','head','post','put','patch','delete','options'],
    url: '\/posts',
}

/**
 * @see \App\Http\Controllers\PostController::index
 * @see app\Http\Controllers\PostController.php:13
 * @route /posts
 */
index.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return index.definition.url + queryParams(options)
}

/**
 * @see \App\Http\Controllers\PostController::index
 * @see app\Http\Controllers\PostController.php:13
 * @route /posts
 */
index.get = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: index.url(options),
    method: 'get',
})

/**
 * @see \App\Http\Controllers\PostController::index
 * @see app\Http\Controllers\PostController.php:13
 * @route /posts
 */
index.head = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: index.url(options),
    method: 'head',
})

/**
 * @see \App\Http\Controllers\PostController::index
 * @see app\Http\Controllers\PostController.php:13
 * @route /posts
 */
index.post = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'post',
} => ({
    url: index.url(options),
    method: 'post',
})

/**
 * @see \App\Http\Controllers\PostController::index
 * @see app\Http\Controllers\PostController.php:13
 * @route /posts
 */
index.put = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'put',
} => ({
    url: index.url(options),
    method: 'put',
})

/**
 * @see \App\Http\Controllers\PostController::index
 * @see app\Http\Controllers\PostController.php:13
 * @route /posts
 */
index.patch = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'patch',
} => ({
    url: index.url(options),
    method: 'patch',
})

/**
 * @see \App\Http\Controllers\PostController::index
 * @see app\Http\Controllers\PostController.php:13
 * @route /posts
 */
index.delete = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'delete',
} => ({
    url: index.url(options),
    method: 'delete',
})

/**
 * @see \App\Http\Controllers\PostController::index
 * @see app\Http\Controllers\PostController.php:13
 * @route /posts
 */
index.options = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'options',
} => ({
    url: index.url(options),
    method: 'options',
})


/**
 * @see \App\Http\Controllers\PostController::create
 * @see app\Http\Controllers\PostController.php:30
 * @route /posts/create
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
    url: '\/posts\/create',
}

/**
 * @see \App\Http\Controllers\PostController::create
 * @see app\Http\Controllers\PostController.php:30
 * @route /posts/create
 */
create.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return create.definition.url + queryParams(options)
}

/**
 * @see \App\Http\Controllers\PostController::create
 * @see app\Http\Controllers\PostController.php:30
 * @route /posts/create
 */
create.get = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: create.url(options),
    method: 'get',
})

/**
 * @see \App\Http\Controllers\PostController::create
 * @see app\Http\Controllers\PostController.php:30
 * @route /posts/create
 */
create.head = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: create.url(options),
    method: 'head',
})


/**
 * @see \App\Http\Controllers\PostController::store
 * @see app\Http\Controllers\PostController.php:36
 * @route /posts
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
    url: '\/posts',
}

/**
 * @see \App\Http\Controllers\PostController::store
 * @see app\Http\Controllers\PostController.php:36
 * @route /posts
 */
store.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return store.definition.url + queryParams(options)
}

/**
 * @see \App\Http\Controllers\PostController::store
 * @see app\Http\Controllers\PostController.php:36
 * @route /posts
 */
store.post = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'post',
} => ({
    url: store.url(options),
    method: 'post',
})


/**
 * @see \App\Http\Controllers\PostController::update
 * @see app\Http\Controllers\PostController.php:0
 * @route /posts/{id}
 */
export const update = (args: { id: string | number } | [id: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'post',
} => ({
    url: update.url(args, options),
    method: 'post',
})

update.definition = {
    methods: ['post'],
    url: '\/posts\/{id}',
}

/**
 * @see \App\Http\Controllers\PostController::update
 * @see app\Http\Controllers\PostController.php:0
 * @route /posts/{id}
 */
update.url = (args: { id: string | number } | [id: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { id: args }
    }

    if (Array.isArray(args)) {
        args = {
            id: args[0],
        }
    }

    const parsedArgs = {
        id: args.id,
    }

    return update.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
 * @see \App\Http\Controllers\PostController::update
 * @see app\Http\Controllers\PostController.php:0
 * @route /posts/{id}
 */
update.post = (args: { id: string | number } | [id: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'post',
} => ({
    url: update.url(args, options),
    method: 'post',
})


/**
 * @see \App\Http\Controllers\PostController::edit
 * @see app\Http\Controllers\PostController.php:0
 * @route /posts/{id}/edit
 */
export const edit = (args: { id: string | number } | [id: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ['get','head'],
    url: '\/posts\/{id}\/edit',
}

/**
 * @see \App\Http\Controllers\PostController::edit
 * @see app\Http\Controllers\PostController.php:0
 * @route /posts/{id}/edit
 */
edit.url = (args: { id: string | number } | [id: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { id: args }
    }

    if (Array.isArray(args)) {
        args = {
            id: args[0],
        }
    }

    const parsedArgs = {
        id: args.id,
    }

    return edit.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
 * @see \App\Http\Controllers\PostController::edit
 * @see app\Http\Controllers\PostController.php:0
 * @route /posts/{id}/edit
 */
edit.get = (args: { id: string | number } | [id: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: edit.url(args, options),
    method: 'get',
})

/**
 * @see \App\Http\Controllers\PostController::edit
 * @see app\Http\Controllers\PostController.php:0
 * @route /posts/{id}/edit
 */
edit.head = (args: { id: string | number } | [id: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: edit.url(args, options),
    method: 'head',
})


/**
 * @see \App\Http\Controllers\PostController::destroy
 * @see app\Http\Controllers\PostController.php:0
 * @route /posts/{id}
 */
export const destroy = (args: { id: string | number } | [id: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'delete',
} => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ['delete'],
    url: '\/posts\/{id}',
}

/**
 * @see \App\Http\Controllers\PostController::destroy
 * @see app\Http\Controllers\PostController.php:0
 * @route /posts/{id}
 */
destroy.url = (args: { id: string | number } | [id: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { id: args }
    }

    if (Array.isArray(args)) {
        args = {
            id: args[0],
        }
    }

    const parsedArgs = {
        id: args.id,
    }

    return destroy.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
 * @see \App\Http\Controllers\PostController::destroy
 * @see app\Http\Controllers\PostController.php:0
 * @route /posts/{id}
 */
destroy.delete = (args: { id: string | number } | [id: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'delete',
} => ({
    url: destroy.url(args, options),
    method: 'delete',
})


/**
 * @see \App\Http\Controllers\PostController::show
 * @see app\Http\Controllers\PostController.php:0
 * @route /posts/{id}
 */
export const show = (args: { id: string | number } | [id: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ['get','head'],
    url: '\/posts\/{id}',
}

/**
 * @see \App\Http\Controllers\PostController::show
 * @see app\Http\Controllers\PostController.php:0
 * @route /posts/{id}
 */
show.url = (args: { id: string | number } | [id: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { id: args }
    }

    if (Array.isArray(args)) {
        args = {
            id: args[0],
        }
    }

    const parsedArgs = {
        id: args.id,
    }

    return show.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
 * @see \App\Http\Controllers\PostController::show
 * @see app\Http\Controllers\PostController.php:0
 * @route /posts/{id}
 */
show.get = (args: { id: string | number } | [id: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: show.url(args, options),
    method: 'get',
})

/**
 * @see \App\Http\Controllers\PostController::show
 * @see app\Http\Controllers\PostController.php:0
 * @route /posts/{id}
 */
show.head = (args: { id: string | number } | [id: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: show.url(args, options),
    method: 'head',
})


const PostController = { index, create, store, update, edit, destroy, show }

export default PostController