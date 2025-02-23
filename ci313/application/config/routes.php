<?php
defined('BASEPATH') OR exit('No direct script access allowed');

/*
| -------------------------------------------------------------------------
| URI ROUTING
| -------------------------------------------------------------------------
| This file lets you re-map URI requests to specific controller functions.
|
| Typically there is a one-to-one relationship between a URL string
| and its corresponding controller class/method. The segments in a
| URL normally follow this pattern:
|
|	example.com/class/method/id/
|
| In some instances, however, you may want to remap this relationship
| so that a different class/function is called than the one
| corresponding to the URL.
|
| Please see the user guide for complete details:
|
|	https://codeigniter.com/userguide3/general/routing.html
|
| -------------------------------------------------------------------------
| RESERVED ROUTES
| -------------------------------------------------------------------------
|
| There are three reserved routes:
|
|	$route['default_controller'] = 'welcome';
|
| This route indicates which controller class should be loaded if the
| URI contains no data. In the above example, the "welcome" class
| would be loaded.
|
|	$route['404_override'] = 'errors/page_missing';
|
| This route will tell the Router which controller/method to use if those
| provided in the URL cannot be matched to a valid route.
|
|	$route['translate_uri_dashes'] = FALSE;
|
| This is not exactly a route, but allows you to automatically route
| controller and method names that contain dashes. '-' isn't a valid
| class or method name character, so it requires translation.
| When you set this option to TRUE, it will replace ALL dashes in the
| controller and method URI segments.
|
| Examples:	my-controller/index	-> my_controller/index
|		my-controller/my-method	-> my_controller/my_method
*/
$route['default_controller'] = 'welcome';
$route['404_override'] = '';
$route['translate_uri_dashes'] = FALSE;

// application/config/routes.php
$route['api/tables/search/(:any)'] = 'tables/search/$1';
$route['api/tables/(:any)/detail/(:num)'] = 'tables/detail/$1/$2';
$route['api/tables/(:any)/update/(:num)'] = 'tables/update/$1/$2';
$route['api/tables/(:any)/delete/(:num)'] = 'tables/delete/$1/$2';
$route['api/tables/(:any)/create'] = 'tables/create/$1';
$route['api/tables/(:any)/update-column'] = 'tables/update_column/$1';
$route['api/tables/(:any)/map'] = 'tables/map/$1';
$route['api/media/list'] = 'media/list_images';
$route['api/media/upload'] = 'media/upload';
$route['api/media/delete'] = 'media/delete';
$route['api/media/create_directory'] = 'media/create_directory';
$route['api/login'] = 'auth/login';
$route['api/route'] = 'police/route';
$route['api/course_route'] = 'police/course_route';
$route['api/document_route'] = 'police/document_route';
$route['api/questions/answers/(:num)'] = 'question/answers/$1';
$route['api/questions/updateAnswers/(:num)'] = 'question/updateAnswers/$1';
$route['api/tests/questions/(:num)'] = 'test/questions/$1';
$route['api/categories/questions/(:num)'] = 'category/questions/$1';
$route['api/categories/tests/(:num)'] = 'category/tests/$1';
$route['api/categories/courses/(:num)'] = 'category/courses/$1';
$route['api/client/categories/courses/(:num)'] = 'client/category/courses/$1';
$route['api/client/categories/courses_by_alias'] = 'client/category/courses_by_alias';
$route['api/client/login'] = 'client/auth/login';
$route['api/client/isloggedin'] = 'client/auth/isloggedin';
$route['api/client/register'] = 'client/auth/register';
$route['api/client/update'] = 'client/auth/update';
$route['api/client/courses'] = 'client/auth/courses';
$route['api/courses'] = 'client/course/courses';
$route['api/areacode/getProvinces'] = 'client/areacode/getProvinces';
$route['api/practice/save'] = 'client/practice/save';
// $route['3rdparty\/(.*)-(:num)x(:num)\.(jpg|png|gif|jpeg)'] = 'client/media/thumbnail/$1/$2/$3/$4';
$route['3rdparty/Filemanager/thumbnails/(.+)-(\d+)x(\d+)\.(png|jpe?g|gif)'] = 'client/media/thumbnail/$1/$2/$3/$4';