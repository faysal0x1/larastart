import { queryParams, type QueryParams } from './../../wayfinder'

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


export default show