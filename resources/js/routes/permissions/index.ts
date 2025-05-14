import create from './create'
import store from './store'
import show from './show'
import edit from './edit'
import update from './update'
import destroy from './destroy'
import { queryParams, type QueryParams } from './../../wayfinder'

/**
 * @see \App\Http\Controllers\Admin\PermissionController::index
 * @see app\Http\Controllers\Admin\PermissionController.php:14
 * @route /permissions
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
    url: '\/permissions',
}

/**
 * @see \App\Http\Controllers\Admin\PermissionController::index
 * @see app\Http\Controllers\Admin\PermissionController.php:14
 * @route /permissions
 */
index.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return index.definition.url + queryParams(options)
}

/**
 * @see \App\Http\Controllers\Admin\PermissionController::index
 * @see app\Http\Controllers\Admin\PermissionController.php:14
 * @route /permissions
 */
index.get = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: index.url(options),
    method: 'get',
})

/**
 * @see \App\Http\Controllers\Admin\PermissionController::index
 * @see app\Http\Controllers\Admin\PermissionController.php:14
 * @route /permissions
 */
index.head = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: index.url(options),
    method: 'head',
})



const permissions = {
    index, 
    create, 
    store, 
    show, 
    edit, 
    update, 
    destroy,
}

export default permissions