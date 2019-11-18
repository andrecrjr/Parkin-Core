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
Route.post('api/create_profile', 'UserController.create');
Route.get('api/profile/:id', 'UserController.show');

//session controller
Route.post('api/auth', 'SessionController.authentication');
Route.get('api/show_user', 'SessionController.show_user');

//car controller
Route.post('api/create_car', 'CarController.create_car');
Route.get('api/has_cars/:id', 'CarController.show_cars');

//park lot controller
Route.post('api/create_lot', 'ParkLotController.create');
Route.get('api/show_lots/:id', 'ParkLotController.show');
Route.get('api/find_park_lot', 'ParkLotController.findParkLots');

//parking the car
Route.post('api/parkin', 'ParkingCarController.parking_car');
Route.post('api/unparkin', 'ParkingCarController.unparking_car');

//list of parkins
Route.get('api/list_parkin/:id', 'ParkingCarController.list_parkings');