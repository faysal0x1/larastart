import { queryParams, type QueryParams } from './../../wayfinder'

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


export default destroy