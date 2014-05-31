	// create the module and name it cosmicApp
	var cosmicApp = angular.module('cosmicApp', ['ngRoute']);

	// configure our routes
	cosmicApp.config(function($routeProvider, $locationProvider) {
		$routeProvider

			// route for the home page
			.when('/', {
				templateUrl : 'partials/home.html',
				controller  : 'mainController'
			})

            .when('/choose', {
                templateUrl : 'partials/choose.html',
                controller  : 'mainController'
            })


            .when('/:person/done', {
                templateUrl : 'partials/done.html',
                controller  : 'mainController'
            })

			.when('/big-bean/:question', {
				templateUrl : 'partials/question-big-bean.html',
				controller  : 'mainController'
			})

            // .when('/:person/:question', {
            .when('/little-bean/:question', {
                templateUrl : 'partials/question-little-bean.html',
                controller  : 'mainController'
            });

			// use the HTML5 History API
			$locationProvider.html5Mode(true);

	});

	// create the controller and inject Angular's $rootScope
	cosmicApp.controller('mainController', function($rootScope, $location, $routeParams) {


        if ($location.path()==='/') {
            $rootScope.message = 'Homepage';
        } else if ($location.path()==='/choose') {
            $rootScope.message = 'Choose';
        } else { // CR- TODO: use the right path/regex

            var pathArray = $location.path().split('/');
            // var personBean = $routeParams.person;
            var personBean = pathArray[1];

            console.log(pathArray,personBean,$routeParams.question);

            $rootScope.step = ($routeParams.question==='start') ? 1 : $routeParams.question;

            if(personBean==='small-bean') {
                $rootScope.question = 'Question here!';
            }
            // } else if(personBean==='big-bean') {}


            console.log($routeParams, $location.path());

            // var fullRoute = $rootScope.$$route.originalPath,
            // routeParams = $rootScope.params,
            // resolvedRoute;
            // console.log('2',fullRoute);
            // console.log('3',routeParams);
            // resolvedRoute = fullRoute.replace(/:var1/, routeParams.id);
            // console.log('4', resolvedRoute);

            // if() {

            // }
        }

        // console.log('$routeParams', $routeParams);

        // register listener to watch route changes
        // $rootScope.$on( '$routeChangeStart', function () {
        //     if ($location.path()==='/') {
        //         console.log('BBB = root');
        //     }
        // });

        // $rootScope.$on('$routeChangeSuccess', function (e, current, pre) {
        //     var fullRoute = current.$$route.originalPath,
        //     routeParams = current.params,
        //     resolvedRoute;
        //     console.log('1',e, current, pre);
        //     console.log('2',fullRoute);
        //     console.log('3',routeParams);
        //     resolvedRoute = fullRoute.replace(/:var1/, routeParams.id);
        //     console.log('4', resolvedRoute);
        // });


        // $rootScope.changeRoute = function(page) {
        //     console.log('AAAA', page);
        //     if($location.path() !== page) {
        //         $location.path(page).replace();
        //     }
        // };

	});

	// cosmicApp.run(function ($rootScope, $location, $routeParams) {
 //    });