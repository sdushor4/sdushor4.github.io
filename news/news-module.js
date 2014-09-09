'use strict';

var module = angular.module('NM', []);

	module.controller('MainCtrl', function($scope, PostsFactory) {
		PostsFactory.getPosts(function(data) {
			$scope.posts = data;
		});


	});
	
	module.factory('PostsFactory', function($http) {
		return {
			getPosts: function(callback) {
				$http.get('/news/news.json').success(callback);
			}
		}
	});

	module.directive('markdown', function($http) {
		var converter = new Showdown.converter();

		return {
			restrict: 'A',
			scope: { link:'@' },
			link: function (scope, element, attrs) {
				attrs.$observe('link',function(link){
		            $http.get('/news/' + link)
		            .success(function(response){
		              var htmlText = converter.makeHtml(response);
		              element.html(htmlText);
		            });
		        })
			}
		}
	});