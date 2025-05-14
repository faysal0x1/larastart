import { queryParams, type QueryParams } from './../../../../wayfinder'

/**
 * @see \App\Http\Controllers\MicroTaskCategoryController::index
 * @see app\Http\Controllers\MicroTaskCategoryController.php:18
 * @route /micro-task-categories
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
    url: '\/micro-task-categories',
}

/**
 * @see \App\Http\Controllers\MicroTaskCategoryController::index
 * @see app\Http\Controllers\MicroTaskCategoryController.php:18
 * @route /micro-task-categories
 */
index.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return index.definition.url + queryParams(options)
}

/**
 * @see \App\Http\Controllers\MicroTaskCategoryController::index
 * @see app\Http\Controllers\MicroTaskCategoryController.php:18
 * @route /micro-task-categories
 */
index.get = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: index.url(options),
    method: 'get',
})

/**
 * @see \App\Http\Controllers\MicroTaskCategoryController::index
 * @see app\Http\Controllers\MicroTaskCategoryController.php:18
 * @route /micro-task-categories
 */
index.head = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: index.url(options),
    method: 'head',
})


/**
 * @see \App\Http\Controllers\MicroTaskCategoryController::create
 * @see app\Http\Controllers\MicroTaskCategoryController.php:38
 * @route /micro-task-categories/create
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
    url: '\/micro-task-categories\/create',
}

/**
 * @see \App\Http\Controllers\MicroTaskCategoryController::create
 * @see app\Http\Controllers\MicroTaskCategoryController.php:38
 * @route /micro-task-categories/create
 */
create.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return create.definition.url + queryParams(options)
}

/**
 * @see \App\Http\Controllers\MicroTaskCategoryController::create
 * @see app\Http\Controllers\MicroTaskCategoryController.php:38
 * @route /micro-task-categories/create
 */
create.get = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: create.url(options),
    method: 'get',
})

/**
 * @see \App\Http\Controllers\MicroTaskCategoryController::create
 * @see app\Http\Controllers\MicroTaskCategoryController.php:38
 * @route /micro-task-categories/create
 */
create.head = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: create.url(options),
    method: 'head',
})


/**
 * @see \App\Http\Controllers\MicroTaskCategoryController::store
 * @see app\Http\Controllers\MicroTaskCategoryController.php:45
 * @route /micro-task-categories
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
    url: '\/micro-task-categories',
}

/**
 * @see \App\Http\Controllers\MicroTaskCategoryController::store
 * @see app\Http\Controllers\MicroTaskCategoryController.php:45
 * @route /micro-task-categories
 */
store.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return store.definition.url + queryParams(options)
}

/**
 * @see \App\Http\Controllers\MicroTaskCategoryController::store
 * @see app\Http\Controllers\MicroTaskCategoryController.php:45
 * @route /micro-task-categories
 */
store.post = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'post',
} => ({
    url: store.url(options),
    method: 'post',
})


/**
 * @see \App\Http\Controllers\MicroTaskCategoryController::show
 * @see app\Http\Controllers\MicroTaskCategoryController.php:71
 * @route /micro-task-categories/{micro_task_category}
 */
export const show = (args: { micro_task_category: string | number } | [micro_task_category: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ['get','head'],
    url: '\/micro-task-categories\/{micro_task_category}',
}

/**
 * @see \App\Http\Controllers\MicroTaskCategoryController::show
 * @see app\Http\Controllers\MicroTaskCategoryController.php:71
 * @route /micro-task-categories/{micro_task_category}
 */
show.url = (args: { micro_task_category: string | number } | [micro_task_category: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { micro_task_category: args }
    }

    if (Array.isArray(args)) {
        args = {
            micro_task_category: args[0],
        }
    }

    const parsedArgs = {
        micro_task_category: args.micro_task_category,
    }

    return show.definition.url
            .replace('{micro_task_category}', parsedArgs.micro_task_category.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
 * @see \App\Http\Controllers\MicroTaskCategoryController::show
 * @see app\Http\Controllers\MicroTaskCategoryController.php:71
 * @route /micro-task-categories/{micro_task_category}
 */
show.get = (args: { micro_task_category: string | number } | [micro_task_category: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: show.url(args, options),
    method: 'get',
})

/**
 * @see \App\Http\Controllers\MicroTaskCategoryController::show
 * @see app\Http\Controllers\MicroTaskCategoryController.php:71
 * @route /micro-task-categories/{micro_task_category}
 */
show.head = (args: { micro_task_category: string | number } | [micro_task_category: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: show.url(args, options),
    method: 'head',
})


/**
 * @see \App\Http\Controllers\MicroTaskCategoryController::edit
 * @see app\Http\Controllers\MicroTaskCategoryController.php:78
 * @route /micro-task-categories/{micro_task_category}/edit
 */
export const edit = (args: { micro_task_category: string | number } | [micro_task_category: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ['get','head'],
    url: '\/micro-task-categories\/{micro_task_category}\/edit',
}

/**
 * @see \App\Http\Controllers\MicroTaskCategoryController::edit
 * @see app\Http\Controllers\MicroTaskCategoryController.php:78
 * @route /micro-task-categories/{micro_task_category}/edit
 */
edit.url = (args: { micro_task_category: string | number } | [micro_task_category: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { micro_task_category: args }
    }

    if (Array.isArray(args)) {
        args = {
            micro_task_category: args[0],
        }
    }

    const parsedArgs = {
        micro_task_category: args.micro_task_category,
    }

    return edit.definition.url
            .replace('{micro_task_category}', parsedArgs.micro_task_category.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
 * @see \App\Http\Controllers\MicroTaskCategoryController::edit
 * @see app\Http\Controllers\MicroTaskCategoryController.php:78
 * @route /micro-task-categories/{micro_task_category}/edit
 */
edit.get = (args: { micro_task_category: string | number } | [micro_task_category: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: edit.url(args, options),
    method: 'get',
})

/**
 * @see \App\Http\Controllers\MicroTaskCategoryController::edit
 * @see app\Http\Controllers\MicroTaskCategoryController.php:78
 * @route /micro-task-categories/{micro_task_category}/edit
 */
edit.head = (args: { micro_task_category: string | number } | [micro_task_category: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: edit.url(args, options),
    method: 'head',
})


/**
 * @see \App\Http\Controllers\MicroTaskCategoryController::update
 * @see app\Http\Controllers\MicroTaskCategoryController.php:85
 * @route /micro-task-categories/{micro_task_category}
 */
export const update = (args: { micro_task_category: string | number } | [micro_task_category: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'put',
} => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ['put','patch'],
    url: '\/micro-task-categories\/{micro_task_category}',
}

/**
 * @see \App\Http\Controllers\MicroTaskCategoryController::update
 * @see app\Http\Controllers\MicroTaskCategoryController.php:85
 * @route /micro-task-categories/{micro_task_category}
 */
update.url = (args: { micro_task_category: string | number } | [micro_task_category: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { micro_task_category: args }
    }

    if (Array.isArray(args)) {
        args = {
            micro_task_category: args[0],
        }
    }

    const parsedArgs = {
        micro_task_category: args.micro_task_category,
    }

    return update.definition.url
            .replace('{micro_task_category}', parsedArgs.micro_task_category.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
 * @see \App\Http\Controllers\MicroTaskCategoryController::update
 * @see app\Http\Controllers\MicroTaskCategoryController.php:85
 * @route /micro-task-categories/{micro_task_category}
 */
update.put = (args: { micro_task_category: string | number } | [micro_task_category: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'put',
} => ({
    url: update.url(args, options),
    method: 'put',
})

/**
 * @see \App\Http\Controllers\MicroTaskCategoryController::update
 * @see app\Http\Controllers\MicroTaskCategoryController.php:85
 * @route /micro-task-categories/{micro_task_category}
 */
update.patch = (args: { micro_task_category: string | number } | [micro_task_category: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'patch',
} => ({
    url: update.url(args, options),
    method: 'patch',
})


/**
 * @see \App\Http\Controllers\MicroTaskCategoryController::destroy
 * @see app\Http\Controllers\MicroTaskCategoryController.php:92
 * @route /micro-task-categories/{micro_task_category}
 */
export const destroy = (args: { micro_task_category: string | number } | [micro_task_category: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'delete',
} => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ['delete'],
    url: '\/micro-task-categories\/{micro_task_category}',
}

/**
 * @see \App\Http\Controllers\MicroTaskCategoryController::destroy
 * @see app\Http\Controllers\MicroTaskCategoryController.php:92
 * @route /micro-task-categories/{micro_task_category}
 */
destroy.url = (args: { micro_task_category: string | number } | [micro_task_category: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { micro_task_category: args }
    }

    if (Array.isArray(args)) {
        args = {
            micro_task_category: args[0],
        }
    }

    const parsedArgs = {
        micro_task_category: args.micro_task_category,
    }

    return destroy.definition.url
            .replace('{micro_task_category}', parsedArgs.micro_task_category.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
 * @see \App\Http\Controllers\MicroTaskCategoryController::destroy
 * @see app\Http\Controllers\MicroTaskCategoryController.php:92
 * @route /micro-task-categories/{micro_task_category}
 */
destroy.delete = (args: { micro_task_category: string | number } | [micro_task_category: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'delete',
} => ({
    url: destroy.url(args, options),
    method: 'delete',
})


const MicroTaskCategoryController = { index, create, store, show, edit, update, destroy }

export default MicroTaskCategoryController