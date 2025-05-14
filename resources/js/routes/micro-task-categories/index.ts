import create from './create'
import store from './store'
import show from './show'
import edit from './edit'
import update from './update'
import destroy from './destroy'
import { queryParams, type QueryParams } from './../../wayfinder'

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



const microTaskCategories = {
    index, 
    create, 
    store, 
    show, 
    edit, 
    update, 
    destroy,
}

export default microTaskCategories