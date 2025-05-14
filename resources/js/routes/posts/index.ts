import create from './create'
import store from './store'
import update from './update'
import edit from './edit'
import destroy from './destroy'
import show from './show'
import { queryParams, type QueryParams } from './../../wayfinder'

/**
 * @see \App\Http\Controllers\PostController::index
 * @see app\Http\Controllers\PostController.php:13
 * @route /posts
 */
export const index = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ['get','head','post','put','patch','delete','options'],
    url: '\/posts',
}

/**
 * @see \App\Http\Controllers\PostController::index
 * @see app\Http\Controllers\PostController.php:13
 * @route /posts
 */
index.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return index.definition.url + queryParams(options)
}

/**
 * @see \App\Http\Controllers\PostController::index
 * @see app\Http\Controllers\PostController.php:13
 * @route /posts
 */
index.get = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: index.url(options),
    method: 'get',
})

/**
 * @see \App\Http\Controllers\PostController::index
 * @see app\Http\Controllers\PostController.php:13
 * @route /posts
 */
index.head = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: index.url(options),
    method: 'head',
})

/**
 * @see \App\Http\Controllers\PostController::index
 * @see app\Http\Controllers\PostController.php:13
 * @route /posts
 */
index.post = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'post',
} => ({
    url: index.url(options),
    method: 'post',
})

/**
 * @see \App\Http\Controllers\PostController::index
 * @see app\Http\Controllers\PostController.php:13
 * @route /posts
 */
index.put = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'put',
} => ({
    url: index.url(options),
    method: 'put',
})

/**
 * @see \App\Http\Controllers\PostController::index
 * @see app\Http\Controllers\PostController.php:13
 * @route /posts
 */
index.patch = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'patch',
} => ({
    url: index.url(options),
    method: 'patch',
})

/**
 * @see \App\Http\Controllers\PostController::index
 * @see app\Http\Controllers\PostController.php:13
 * @route /posts
 */
index.delete = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'delete',
} => ({
    url: index.url(options),
    method: 'delete',
})

/**
 * @see \App\Http\Controllers\PostController::index
 * @see app\Http\Controllers\PostController.php:13
 * @route /posts
 */
index.options = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'options',
} => ({
    url: index.url(options),
    method: 'options',
})



const posts = {
    index, 
    create, 
    store, 
    update, 
    edit, 
    destroy, 
    show,
}

export default posts