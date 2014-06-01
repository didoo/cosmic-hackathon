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
                next = (step==='8') ? '/done' : '/'+size+'-bean/'+(parseInt(step,10) + 1);
            } else {
                next = (step==='3') ? '/done' : '/'+size+'-bean/'+(parseInt(step,10) + 1);
            }
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

                // NOTICE: the idea here was to connect to an external service (hosted on heroku) to retrieve
                //         the questions and the images for the survey (but we didn't had enought time to complete the server-side code).
                //         The backend was intended to be a very lightweight application, that was simply converting the folder structure
                //         to a json file and return it to the frontend. The names of the folders would have been the questions,
                //         the name of the files would have been the responses, and finally the images (JPGs, PNGs, animated GIFs)
                //         would have been hosted on the server itself.
                //         Not only: the folders and the images would have been kept in sync with a Dropbox folder (using an existing heroku add-on)
                //         so that maintaining, updating or even creating new surveys woild have been extremely simple for the COSMIC staff.
                //         At the same time, the responses collected by the backend would have been saved as CSV files (one per questionaire and user)
                //         in one dedicated folder inside the main Dropbox folder, so that also the data would have been delivered to the COSMIC team
                //         simply using the Dropbox/Heroku sync (this time the other way round), and the COSMIC operators could simply open the
                //         CSV files in Excel/Numbers, copy in a main spreadsheet and then elaborate the data in that file.
                //         A very simple, low cost solution, without the necessity to implement special content-management systems, storage servers, databases.

                // REAL DATA
                // $http.get('//cosmic-hackathon.herokuapp.com/feedback').success(function (data) { ... });

                // MOCK DATA
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

            // NOTICE: unfortunately we did not had enought time to create the dynamic version of the survey
            //         for the "big" an "another" beans, so we created fake "pages" which are actually flat PNGs;
            //         sorry for that, and bear with us, but the time was not enough to complete such a huge work.
            // } else if(personBean==='little-bean') {

            }

        }

	});

    //  cosmicApp.run(function ($rootScope, $location, $routeParams) {
    //  });