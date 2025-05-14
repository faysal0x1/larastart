import create from './create'
import store from './store'
import show from './show'
import edit from './edit'
import update from './update'
import destroy from './destroy'
import { queryParams, type QueryParams } from './../../wayfinder'

/**
 * @see \App\Http\Controllers\Admin\RoleController::index
 * @see app\Http\Controllers\Admin\RoleController.php:22
 * @route /roles
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
    url: '\/roles',
}

/**
 * @see \App\Http\Controllers\Admin\RoleController::index
 * @see app\Http\Controllers\Admin\RoleController.php:22
 * @route /roles
 */
index.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return index.definition.url + queryParams(options)
}

/**
 * @see \App\Http\Controllers\Admin\RoleController::index
 * @see app\Http\Controllers\Admin\RoleController.php:22
 * @route /roles
 */
index.get = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: index.url(options),
    method: 'get',
})

/**
 * @see \App\Http\Controllers\Admin\RoleController::index
 * @see app\Http\Controllers\Admin\RoleController.php:22
 * @route /roles
 */
index.head = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: index.url(options),
    method: 'head',
})



const roles = {
    index, 
    create, 
    store, 
    show, 
    edit, 
    update, 
    destroy,
}

export default roles