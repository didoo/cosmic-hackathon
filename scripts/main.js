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

            .when('/next', {
                templateUrl : 'partials/choose.html',
                controller  : 'mainController'
            })

            .when('/done', {
                templateUrl : 'partials/done.html',
                controller  : 'mainController'
            })

            .when('/comment', {
                templateUrl : 'partials/comment.html',
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
	cosmicApp.controller('mainController', function($rootScope, $location, $routeParams, $http) {


        $rootScope.submit = function(size,step,data) {
            var next;
            if(size==='big') {
                next = (step==='6') ? '/done' : '/'+size+'-bean/'+(parseInt(step,10) + 1);
            } else {
                next = (step==='3') ? '/done' : '/'+size+'-bean/'+(parseInt(step,10) + 1);
            }
            // console.log('submitted',size,step);
            $location.path(next);
        };


        if ($location.path()==='/') {
            $rootScope.message = 'Homepage';
        } else if ($location.path()==='/choose') {
            $rootScope.question = 'Who are you';
            $rootScope.showtheend = false;
        } else if ($location.path()==='/next') {
            $rootScope.question = 'Who \'s next?';
            $rootScope.showtheend = true;
        } else { // CR- TODO: use the right path/regex

            var pathArray = $location.path().split('/');
            var personBean = pathArray[1];

            $rootScope.step = ($routeParams.question==='start') ? '1' : $routeParams.question;

            // console.log(pathArray,personBean,$routeParams.question, $rootScope.step);

            if(personBean==='little-bean') {
                $http.get('//cosmic-hackathon.herokuapp.com/feedback').success(function (data) {
                    // angular.forEach(hourlyDataRange, function (elem, key) {
                    //     var intkey = parseInt(key, 10);
                    //     if (typeof when !== 'undefined') {
                    //         elem.timestamp = new Date(new Date(when).setHours(0, 0, 0, 0) + intkey * 60 * 60 * 1000);
                    //     } else {
                    //         elem.timestamp = new Date(Date.now().setHours(0, 0, 0, 0) + intkey * 60 * 60 * 1000);
                    //     }
                    // });
                    // console.warn('processed hourlyDataRange', hourlyDataRange);
                    console.log(data);
                });
                if($rootScope.step==='1') {
                    $rootScope.question = 'Did you complete the book with your family?';
                    $rootScope.answers = [
                        {
                            'text': 'Yes',
                            'picture': '/media/img/question-little-bean/q1-a1.png'
                        },
                        {
                            'text': 'No',
                            'picture': '/media/img/question-little-bean/q1-a2.png'
                        }
                    ];
                } else if($rootScope.step==='2') {
                    $rootScope.question = 'How was your stay?';
                    $rootScope.answers = [
                        {
                            'text': 'Horrid',
                            'picture': '/media/img/question-little-bean/q2-a1.gif'
                        },
                        {
                            'text': 'Ok',
                            'picture': '/media/img/question-little-bean/q2-a2.gif'
                        },
                        {
                            'text': 'Comfy',
                            'picture': '/media/img/question-little-bean/q2-a3.gif'
                        }
                    ];
                } else if($rootScope.step==='3') {
                    $rootScope.question = 'Did the bereavement book help explain what was happening?';
                    $rootScope.answers = [
                        {
                            'text': 'Yes',
                            'picture': '/media/img/question-little-bean/q3-a1.gif'
                        },
                        {
                            'text': 'No',
                            'picture': '/media/img/question-little-bean/q3-a2.gif'
                        }
                    ];
                }
            }

            // console.log($routeParams, $location.path());

        }

	});

    //  cosmicApp.run(function ($rootScope, $location, $routeParams) {
    //  });