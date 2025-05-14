import create from './create'
import store from './store'
import show from './show'
import edit from './edit'
import update from './update'
import destroy from './destroy'
import { queryParams, type QueryParams } from './../../wayfinder'

/**
 * @see \App\Http\Controllers\EmployeerController::index
 * @see app\Http\Controllers\EmployeerController.php:15
 * @route /employers
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
    url: '\/employers',
}

/**
 * @see \App\Http\Controllers\EmployeerController::index
 * @see app\Http\Controllers\EmployeerController.php:15
 * @route /employers
 */
index.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return index.definition.url + queryParams(options)
}

/**
 * @see \App\Http\Controllers\EmployeerController::index
 * @see app\Http\Controllers\EmployeerController.php:15
 * @route /employers
 */
index.get = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: index.url(options),
    method: 'get',
})

/**
 * @see \App\Http\Controllers\EmployeerController::index
 * @see app\Http\Controllers\EmployeerController.php:15
 * @route /employers
 */
index.head = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: index.url(options),
    method: 'head',
})



const employers = {
    index, 
    create, 
    store, 
    show, 
    edit, 
    update, 
    destroy,
}

export default employers