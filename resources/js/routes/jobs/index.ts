import create from './create'
import store from './store'
import show from './show'
import edit from './edit'
import update from './update'
import destroy from './destroy'
import { queryParams, type QueryParams } from './../../wayfinder'

/**
 * @see \App\Http\Controllers\JobController::index
 * @see app\Http\Controllers\JobController.php:12
 * @route /jobs
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
    url: '\/jobs',
}

/**
 * @see \App\Http\Controllers\JobController::index
 * @see app\Http\Controllers\JobController.php:12
 * @route /jobs
 */
index.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return index.definition.url + queryParams(options)
}

/**
 * @see \App\Http\Controllers\JobController::index
 * @see app\Http\Controllers\JobController.php:12
 * @route /jobs
 */
index.get = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: index.url(options),
    method: 'get',
})

/**
 * @see \App\Http\Controllers\JobController::index
 * @see app\Http\Controllers\JobController.php:12
 * @route /jobs
 */
index.head = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: index.url(options),
    method: 'head',
})



const jobs = {
    index, 
    create, 
    store, 
    show, 
    edit, 
    update, 
    destroy,
}

export default jobs