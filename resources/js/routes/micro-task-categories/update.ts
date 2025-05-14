import { queryParams, type QueryParams } from './../../wayfinder'

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


export default update