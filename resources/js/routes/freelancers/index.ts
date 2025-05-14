import create from './create'
import store from './store'
import show from './show'
import edit from './edit'
import update from './update'
import destroy from './destroy'
import { queryParams, type QueryParams } from './../../wayfinder'

/**
 * @see \App\Http\Controllers\FreelancerController::index
 * @see app\Http\Controllers\FreelancerController.php:15
 * @route /freelancers
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
    url: '\/freelancers',
}

/**
 * @see \App\Http\Controllers\FreelancerController::index
 * @see app\Http\Controllers\FreelancerController.php:15
 * @route /freelancers
 */
index.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return index.definition.url + queryParams(options)
}

/**
 * @see \App\Http\Controllers\FreelancerController::index
 * @see app\Http\Controllers\FreelancerController.php:15
 * @route /freelancers
 */
index.get = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: index.url(options),
    method: 'get',
})

/**
 * @see \App\Http\Controllers\FreelancerController::index
 * @see app\Http\Controllers\FreelancerController.php:15
 * @route /freelancers
 */
index.head = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: index.url(options),
    method: 'head',
})



const freelancers = {
    index, 
    create, 
    store, 
    show, 
    edit, 
    update, 
    destroy,
}

export default freelancers