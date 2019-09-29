'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

//user controller
Route.post('user', 'UserController.create')
Route.get('profile/:id', 'UserController.show')

//session controller
Route.post('auth', 'SessionController.authentication')
Route.get('is_auth', 'SessionController.is_auth')

//car controller
Route.post('create_car', 'CarController.create_car')
Route.get('has_cars/:id', 'CarController.show_cars')

//park lot controller
Route.post('create_lot', 'ParkLotController.create');
Route.get('show_lots/:id', 'ParkLotController.show');
Route.post('parkin', 'ParkLotController.parking_car');
Route.post('unparkin', 'ParkLotController.unparking_car');
Route.get('list_parkin/:id', 'ParkLotController.list_parkings');