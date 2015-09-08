angular.module('starter.controllers', [])

.controller('CourseCtrl', function($scope, $ionicLoading, $compile, $stateParams, Course) {
	
	function initialize() {
		var container = document.getElementById('map'); //지도를 담을 영역의 DOM 레퍼런스
		var options = { //지도를 생성할 때 필요한 기본 옵션
			center: new daum.maps.LatLng(37.51186511, 126.99830338718), //지도의 중심좌표.
			level: 3, //지도의 레벨(확대, 축소 정도)
			
		};
		
		var map = new daum.maps.Map(container, options); //지도 생성 및 객체 리턴
		
		map.addOverlayMapTypeId(daum.maps.MapTypeId.BICYCLE);
		
		
		daum.maps.event.addListener(map, 'click', function(mouseEvent) {
		    var latlng = mouseEvent.latLng;
		   
		});

		$scope.map = map;
		
		
    }
    var courseId = $stateParams.courseId; //코스아이디
    
	
	
	$scope.centerOnMe = function() {
		if(!$scope.map) {
			return;
		}
		
		$scope.loading = $ionicLoading.show({
			content: 'Getting current location...',
			showBackdrop: false
		});
		
		navigator.geolocation.getCurrentPosition(function(pos) {
			$scope.map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
			$scope.loading.hide();
		}, function(error) {
			alert('Unable to get location: ' + error.message);
		});
	};
	
	$scope.clickTest = function() {
		alert('Example of infowindow with ng-click')
	};
	if(!$scope.map) {
		initialize();
	}
	$scope.course = Course.all();
	
    
}).controller('CourseDetailCtrl', function($scope, Course) {
	
	
})

.controller('DashCtrl', function($scope) {})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableGps: true,
    enableDailyRecommend : true
  };
});
