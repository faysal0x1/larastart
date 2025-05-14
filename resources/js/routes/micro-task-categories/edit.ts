import { queryParams, type QueryParams } from './../../wayfinder'

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


export default edit