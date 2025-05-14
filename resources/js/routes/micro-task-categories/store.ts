import { queryParams, type QueryParams } from './../../wayfinder'

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


export default store