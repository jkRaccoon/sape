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
    
    var token = localStorage.getItem('token');
	
	if(window.cordova){
		if(!token){
			localStorage.setItem('token',device.uuid+makeid());
			var httpOption = {headers:{'Content-Type':"application/x-www-form-urlencoded"}};
			var httpRequest  = {token:localStorage.getItem('token')};
			
			$http.post("http://sape.kr/member/join",$httpParamSerializerJQLike(httpRequest),httpOption).then(function(result){
				//console.log(result.data);
			});	
		}
// 		
// 		facebookConnectPlugin.login(["public_profile"], function(userData){
// 			console.log(userData );
// 		},
// 		  function loginError (error) {
// 		    console.error(error)
// 		  }
// 		);

		facebookConnectPlugin.getLoginStatus(function(response){
			console.log(response.status)
			if (response.status === 'connected') {
				// the user is logged in and has authenticated your
				// app, and response.authResponse supplies
				// the user's ID, a valid access token, a signed
				// request, and the time the access token 
				// and signed request each expire
				var uid = response.authResponse.userID;
				var accessToken = response.authResponse.accessToken;
			} else if (response.status === 'not_authorized') {
				// the user is logged in to Facebook, 
				// but has not authenticated your app
			} else {
				// the user isn't logged in to Facebook.
			}
		}, function(error){
			//실패
			console.log(error);
		})
		
	}else{
		if(!token){
			localStorage.setItem('token','abcdefg-ABCDEFG-1234567-7654321'+makeid());
			var httpOption = {headers:{'Content-Type':"application/x-www-form-urlencoded"}};
			var httpRequest  = {token:localStorage.getItem('token')};
			
			$http.post("http://sape.kr/member/join",$httpParamSerializerJQLike(httpRequest),httpOption).then(function(result){
				//console.log(result.data);
			});
		}
		window.fbAsyncInit = function() {
		    FB.init({
		      appId      : '902315989804229',
		      xfbml      : true,
		      version    : 'v2.4'
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
	
	
	
	
	
	
		
	
	function makeid(){
	    var text = "";
	    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
	
	    for( var i=0; i < 5; i++ )
	        text += possible.charAt(Math.floor(Math.random() * possible.length));
	
	    return text;
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
  $urlRouterProvider.otherwise('/login');
  
  
  
});
   
  
 