// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services'])

.run(function($ionicPlatform,$http,$httpParamSerializerJQLike) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
    	cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
		cordova.plugins.Keyboard.disableScroll(true);
    }
    
    
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      
      //StatusBar.styleLightContent();
    }
	if(!window.cordova){
		//웹접근일때 페이스북 모듈 초기화.
	
		
		window.fbAsyncInit = function() {
			var host = window.location.host;
			var fbAppId = (host=="192.168.0.11:8100")?"912608968774931":"902315989804229";
			FB.init({
				appId	: fbAppId,
				xfbml	: true,
				version	: 'v2.4'
			});    
		};
		
		(function(d, s, id){
		    var js, fjs = d.getElementsByTagName(s)[0];
		    if (d.getElementById(id)) {return;}
		    js = d.createElement(s); js.id = id;
		    js.src = "//connect.facebook.net/ko_KR/sdk.js";
		    fjs.parentNode.insertBefore(js, fjs);
		}(document, 'script', 'facebook-jssdk'));
	}
	var token = localStorage.getItem('token');
	if(token){
		//토큰이 있으면 해더에 토큰 지정
		$http.defaults.headers.common.token = token;
	}
	
	
	
  });
})

.config(function($stateProvider, $urlRouterProvider,$httpProvider) {

	
	// Ionic uses AngularUI Router which uses the concept of states
	// Learn more here: https://github.com/angular-ui/ui-router
	// Set up the various states which the app can be in.
	// Each state's controller can be found in controllers.js
	$stateProvider
	
	
	.state('tab', {
		url: '/tab',
		abstract: true,
		templateUrl: 'templates/tabs.html'
	})
	.state('tab.dash', {
		url: '/dash',
		views: {
			'tab-dash': {
				templateUrl: 'templates/tab-dash.html',
				controller: 'DashCtrl'
			}
		}
	})
	.state('tab.course', {
		url: '/course/:courseId',
		views: {
			'tab-dash': {
				templateUrl: 'templates/course-list.html',
				controller: 'RideList'
			}
		}
	}).state('tab.course-detail', {
		url: '/course/:courseId/:courseDetailId',
		views: {
			'tab-dash': {
				templateUrl: 'templates/course-detail.html',
				controller: 'RideDetail'
			}
		}
	})
	.state('tab.chats', {
		url: '/chats',
		views: {
			'tab-chats': {
				templateUrl: 'templates/tab-chats.html',
				controller: 'ChatsCtrl'
			}
		}
	})
	.state('tab.chat-detail', {
		url: '/chats/:chatId',
			views: {
			'tab-chats': {
				templateUrl: 'templates/chat-detail.html',
				controller: 'ChatDetailCtrl'
			}
		}
	})
	.state('tab.account', {
			url: '/account',
			views: {
			'tab-account': {
				templateUrl: 'templates/tab-account.html',
				controller: 'AccountCtrl'
			}
		}
	})
	.state('login', {
		url: '/login',
		templateUrl: 'templates/login.html',
		controller: 'Login'
	});

	// if none of the above states are matched, use this as the fallback
	var token = localStorage.getItem('token');
	if(!token){
		$urlRouterProvider.otherwise('/login');
	}else{
		$urlRouterProvider.otherwise('/tab/dash');
	}
  
  
  
});
   
  
 