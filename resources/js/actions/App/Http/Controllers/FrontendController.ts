import { queryParams, type QueryParams } from './../../../../wayfinder'

/**
 * @see \App\Http\Controllers\FrontendController::index
 * @see app\Http\Controllers\FrontendController.php:11
 * @route /
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
    url: '\/',
}

/**
 * @see \App\Http\Controllers\FrontendController::index
 * @see app\Http\Controllers\FrontendController.php:11
 * @route /
 */
index.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return index.definition.url + queryParams(options)
}

/**
 * @see \App\Http\Controllers\FrontendController::index
 * @see app\Http\Controllers\FrontendController.php:11
 * @route /
 */
index.get = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: index.url(options),
    method: 'get',
})

/**
 * @see \App\Http\Controllers\FrontendController::index
 * @see app\Http\Controllers\FrontendController.php:11
 * @route /
 */
index.head = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: index.url(options),
    method: 'head',
})


/**
 * @see \App\Http\Controllers\FrontendController::about
 * @see app\Http\Controllers\FrontendController.php:0
 * @route /about
 */
export const about = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: about.url(options),
    method: 'get',
})

about.definition = {
    methods: ['get','head'],
    url: '\/about',
}

/**
 * @see \App\Http\Controllers\FrontendController::about
 * @see app\Http\Controllers\FrontendController.php:0
 * @route /about
 */
about.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return about.definition.url + queryParams(options)
}

/**
 * @see \App\Http\Controllers\FrontendController::about
 * @see app\Http\Controllers\FrontendController.php:0
 * @route /about
 */
about.get = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: about.url(options),
    method: 'get',
})

/**
 * @see \App\Http\Controllers\FrontendController::about
 * @see app\Http\Controllers\FrontendController.php:0
 * @route /about
 */
about.head = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: about.url(options),
    method: 'head',
})


/**
 * @see \App\Http\Controllers\FrontendController::howItWorks
 * @see app\Http\Controllers\FrontendController.php:0
 * @route /how-it-works
 */
export const howItWorks = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: howItWorks.url(options),
    method: 'get',
})

howItWorks.definition = {
    methods: ['get','head'],
    url: '\/how-it-works',
}

/**
 * @see \App\Http\Controllers\FrontendController::howItWorks
 * @see app\Http\Controllers\FrontendController.php:0
 * @route /how-it-works
 */
howItWorks.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return howItWorks.definition.url + queryParams(options)
}

/**
 * @see \App\Http\Controllers\FrontendController::howItWorks
 * @see app\Http\Controllers\FrontendController.php:0
 * @route /how-it-works
 */
howItWorks.get = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: howItWorks.url(options),
    method: 'get',
})

/**
 * @see \App\Http\Controllers\FrontendController::howItWorks
 * @see app\Http\Controllers\FrontendController.php:0
 * @route /how-it-works
 */
howItWorks.head = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: howItWorks.url(options),
    method: 'head',
})


/**
 * @see \App\Http\Controllers\FrontendController::pricing
 * @see app\Http\Controllers\FrontendController.php:0
 * @route /pricing
 */
export const pricing = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: pricing.url(options),
    method: 'get',
})

pricing.definition = {
    methods: ['get','head'],
    url: '\/pricing',
}

/**
 * @see \App\Http\Controllers\FrontendController::pricing
 * @see app\Http\Controllers\FrontendController.php:0
 * @route /pricing
 */
pricing.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return pricing.definition.url + queryParams(options)
}

/**
 * @see \App\Http\Controllers\FrontendController::pricing
 * @see app\Http\Controllers\FrontendController.php:0
 * @route /pricing
 */
pricing.get = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: pricing.url(options),
    method: 'get',
})

/**
 * @see \App\Http\Controllers\FrontendController::pricing
 * @see app\Http\Controllers\FrontendController.php:0
 * @route /pricing
 */
pricing.head = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: pricing.url(options),
    method: 'head',
})


/**
 * @see \App\Http\Controllers\FrontendController::employeeDashboard
 * @see app\Http\Controllers\FrontendController.php:22
 * @route /employeeDashboard
 */
export const employeeDashboard = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: employeeDashboard.url(options),
    method: 'get',
})

employeeDashboard.definition = {
    methods: ['get','head'],
    url: '\/employeeDashboard',
}

/**
 * @see \App\Http\Controllers\FrontendController::employeeDashboard
 * @see app\Http\Controllers\FrontendController.php:22
 * @route /employeeDashboard
 */
employeeDashboard.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return employeeDashboard.definition.url + queryParams(options)
}

/**
 * @see \App\Http\Controllers\FrontendController::employeeDashboard
 * @see app\Http\Controllers\FrontendController.php:22
 * @route /employeeDashboard
 */
employeeDashboard.get = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: employeeDashboard.url(options),
    method: 'get',
})

/**
 * @see \App\Http\Controllers\FrontendController::employeeDashboard
 * @see app\Http\Controllers\FrontendController.php:22
 * @route /employeeDashboard
 */
employeeDashboard.head = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: employeeDashboard.url(options),
    method: 'head',
})


/**
 * @see \App\Http\Controllers\FrontendController::EmployeeJobsList
 * @see app\Http\Controllers\FrontendController.php:27
 * @route /employeeJobsList
 */
export const EmployeeJobsList = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: EmployeeJobsList.url(options),
    method: 'get',
})

EmployeeJobsList.definition = {
    methods: ['get','head'],
    url: '\/employeeJobsList',
}

/**
 * @see \App\Http\Controllers\FrontendController::EmployeeJobsList
 * @see app\Http\Controllers\FrontendController.php:27
 * @route /employeeJobsList
 */
EmployeeJobsList.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return EmployeeJobsList.definition.url + queryParams(options)
}

/**
 * @see \App\Http\Controllers\FrontendController::EmployeeJobsList
 * @see app\Http\Controllers\FrontendController.php:27
 * @route /employeeJobsList
 */
EmployeeJobsList.get = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: EmployeeJobsList.url(options),
    method: 'get',
})

/**
 * @see \App\Http\Controllers\FrontendController::EmployeeJobsList
 * @see app\Http\Controllers\FrontendController.php:27
 * @route /employeeJobsList
 */
EmployeeJobsList.head = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: EmployeeJobsList.url(options),
    method: 'head',
})


/**
 * @see \App\Http\Controllers\FrontendController::EmployeeJobDetails
 * @see app\Http\Controllers\FrontendController.php:32
 * @route /JobDetails
 */
export const EmployeeJobDetails = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: EmployeeJobDetails.url(options),
    method: 'get',
})

EmployeeJobDetails.definition = {
    methods: ['get','head'],
    url: '\/JobDetails',
}

/**
 * @see \App\Http\Controllers\FrontendController::EmployeeJobDetails
 * @see app\Http\Controllers\FrontendController.php:32
 * @route /JobDetails
 */
EmployeeJobDetails.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return EmployeeJobDetails.definition.url + queryParams(options)
}

/**
 * @see \App\Http\Controllers\FrontendController::EmployeeJobDetails
 * @see app\Http\Controllers\FrontendController.php:32
 * @route /JobDetails
 */
EmployeeJobDetails.get = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: EmployeeJobDetails.url(options),
    method: 'get',
})

/**
 * @see \App\Http\Controllers\FrontendController::EmployeeJobDetails
 * @see app\Http\Controllers\FrontendController.php:32
 * @route /JobDetails
 */
EmployeeJobDetails.head = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: EmployeeJobDetails.url(options),
    method: 'head',
})


/**
 * @see \App\Http\Controllers\FrontendController::FreelancerLoginPage
 * @see app\Http\Controllers\FrontendController.php:38
 * @route /loginEx
 */
export const FreelancerLoginPage = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: FreelancerLoginPage.url(options),
    method: 'get',
})

FreelancerLoginPage.definition = {
    methods: ['get','head'],
    url: '\/loginEx',
}

/**
 * @see \App\Http\Controllers\FrontendController::FreelancerLoginPage
 * @see app\Http\Controllers\FrontendController.php:38
 * @route /loginEx
 */
FreelancerLoginPage.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return FreelancerLoginPage.definition.url + queryParams(options)
}

/**
 * @see \App\Http\Controllers\FrontendController::FreelancerLoginPage
 * @see app\Http\Controllers\FrontendController.php:38
 * @route /loginEx
 */
FreelancerLoginPage.get = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: FreelancerLoginPage.url(options),
    method: 'get',
})

/**
 * @see \App\Http\Controllers\FrontendController::FreelancerLoginPage
 * @see app\Http\Controllers\FrontendController.php:38
 * @route /loginEx
 */
FreelancerLoginPage.head = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: FreelancerLoginPage.url(options),
    method: 'head',
})


/**
 * @see \App\Http\Controllers\FrontendController::SignupPage
 * @see app\Http\Controllers\FrontendController.php:42
 * @route /SignUp
 */
export const SignupPage = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: SignupPage.url(options),
    method: 'get',
})

SignupPage.definition = {
    methods: ['get','head'],
    url: '\/SignUp',
}

/**
 * @see \App\Http\Controllers\FrontendController::SignupPage
 * @see app\Http\Controllers\FrontendController.php:42
 * @route /SignUp
 */
SignupPage.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return SignupPage.definition.url + queryParams(options)
}

/**
 * @see \App\Http\Controllers\FrontendController::SignupPage
 * @see app\Http\Controllers\FrontendController.php:42
 * @route /SignUp
 */
SignupPage.get = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: SignupPage.url(options),
    method: 'get',
})

/**
 * @see \App\Http\Controllers\FrontendController::SignupPage
 * @see app\Http\Controllers\FrontendController.php:42
 * @route /SignUp
 */
SignupPage.head = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: SignupPage.url(options),
    method: 'head',
})


/**
 * @see \App\Http\Controllers\FrontendController::ForgotPasswordPage
 * @see app\Http\Controllers\FrontendController.php:47
 * @route /ForgotPassword
 */
export const ForgotPasswordPage = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: ForgotPasswordPage.url(options),
    method: 'get',
})

ForgotPasswordPage.definition = {
    methods: ['get','head'],
    url: '\/ForgotPassword',
}

/**
 * @see \App\Http\Controllers\FrontendController::ForgotPasswordPage
 * @see app\Http\Controllers\FrontendController.php:47
 * @route /ForgotPassword
 */
ForgotPasswordPage.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return ForgotPasswordPage.definition.url + queryParams(options)
}

/**
 * @see \App\Http\Controllers\FrontendController::ForgotPasswordPage
 * @see app\Http\Controllers\FrontendController.php:47
 * @route /ForgotPassword
 */
ForgotPasswordPage.get = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: ForgotPasswordPage.url(options),
    method: 'get',
})

/**
 * @see \App\Http\Controllers\FrontendController::ForgotPasswordPage
 * @see app\Http\Controllers\FrontendController.php:47
 * @route /ForgotPassword
 */
ForgotPasswordPage.head = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: ForgotPasswordPage.url(options),
    method: 'head',
})


const FrontendController = { index, about, howItWorks, pricing, employeeDashboard, EmployeeJobsList, EmployeeJobDetails, FreelancerLoginPage, SignupPage, ForgotPasswordPage }

export default FrontendController