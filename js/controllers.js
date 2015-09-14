angular.module('starter.controllers', [])

.controller('CourseCtrl', function($scope, $ionicLoading, $compile, $stateParams, $ionicPopup,Course) {
	
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
    if($scope.watchID){
		navigator.geolocation.clearWatch($scope.watchID);
	}
	
	
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
	
	$scope.openRegForm = function() {
		//새로운방 생성
		$scope.data = {}

		// An elaborate, custom popup
		var myPopup = $ionicPopup.show({
			template: '<input type="text" ng-model="data.roomTitle">',
			title: '제목을 입력해주세요',
			subTitle: '5글자이상 입력하시는것이 좋습니다',
			scope: $scope,
			buttons: [
			          { text: '취소' },
			          {
			        	  text: '<b>등록</b>',
			        	  type: 'button-positive',
			        	  onTap: function(e) {
			        		  if (!$scope.data.roomTitle) {			        			 
			        			  e.preventDefault();
			        		  } else {
			        			
			        			  return $scope.data.roomTitle;
			        		  }
			        	  }
			          }
			          ]
		  });
		myPopup.then(function(res) {
			console.log('Tapped!', res);
		});
	
	};
	if(!$scope.map) {
		initialize();
	}
	$scope.courseList = Course.list();
	
	Course.route().success(function(result){
		
		var linePath = new Array();
		for(var i in result){
			linePath.push(new daum.maps.LatLng(result[i]["lat"], result[i]["lng"]));
		}
		//console.log(linePath)
		// 지도에 표시할 선을 생성합니다
		var polyline = new daum.maps.Polyline({
		    path: linePath, // 선을 구성하는 좌표배열 입니다
		    strokeWeight: 5, // 선의 두께 입니다
		    strokeColor: '#0000FF', // 선의 색깔입니다
		    strokeOpacity: 1, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
		    strokeStyle: 'solid' // 선의 스타일입니다
		});
		
		polyline.setMap($scope.map); 
		
		var startCircle = new daum.maps.Circle({
		    center : linePath[0],  // 원의 중심좌표 입니다 
		    radius: 50, // 미터 단위의 원의 반지름입니다 
		    strokeWeight: 2, // 선의 두께입니다 
		    strokeColor: '#75B8FA', // 선의 색깔입니다
		    strokeOpacity: 1, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
		    strokeStyle: 'solid', // 선의 스타일 입니다
		    fillColor: '#CFE7FF', // 채우기 색깔입니다
		    fillOpacity: 0.7  // 채우기 불투명도 입니다   
		});
		
		startCircle.setMap($scope.map); 
		
		var endCircle = new daum.maps.Circle({
		    center : linePath[linePath.length-1],  // 원의 중심좌표 입니다 
		    radius: 50, // 미터 단위의 원의 반지름입니다 
		    strokeWeight: 2, // 선의 두께입니다 
		    strokeColor: '#FA75B8', // 선의 색깔입니다
		    strokeOpacity: 1, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
		    strokeStyle: 'solid', // 선의 스타일 입니다
		    fillColor: '#FFCFE7', // 채우기 색깔입니다
		    fillOpacity: 0.7  // 채우기 불투명도 입니다   
		});
		endCircle.setMap($scope.map); 
		var coods = new daum.maps.LatLng(result[0]["lat"], result[0]["lng"]);
		$scope.map.panTo(coods);

	});
	
	
	
	

    
}).controller('CourseDetailCtrl', function($scope, Course) {
	
	
	
	var container = document.getElementById('detailmap'); //지도를 담을 영역의 DOM 레퍼런스
	var options = { //지도를 생성할 때 필요한 기본 옵션
		center: new daum.maps.LatLng(37.51186511, 126.99830338718), //지도의 중심좌표.
		level: 3, //지도의 레벨(확대, 축소 정도)
		
	};
	
	var map = new daum.maps.Map(container, options); //지도 생성 및 객체 리턴
	
	map.addOverlayMapTypeId(daum.maps.MapTypeId.BICYCLE);
	
	daum.maps.event.addListener(map, 'click', function(mouseEvent) {
	    var latlng = mouseEvent.latLng;
	   
	});

	$scope.detailMap = map;
	
	if($scope.watchID){
		navigator.geolocation.clearWatch($scope.watchID);
	}
	
	$scope.watchID =  navigator.geolocation.watchPosition(mapMoveThisPosition);
	
	Course.route().success(function(result){
		//console.log(result)
		var linePath = new Array();
		for(var i in result){
			linePath.push(new daum.maps.LatLng(result[i]["lat"], result[i]["lng"]));
		}
		// 지도에 표시할 선을 생성합니다
		var polyline = new daum.maps.Polyline({
		    path: linePath, // 선을 구성하는 좌표배열 입니다
		    strokeWeight: 5, // 선의 두께 입니다
		    strokeColor: '#0000FF', // 선의 색깔입니다
		    strokeOpacity: 1, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
		    strokeStyle: 'solid' // 선의 스타일입니다
		});
		
		polyline.setMap($scope.detailMap); 

	});
		
	//내위치 표시
	function mapMoveThisPosition(position){
		//console.log(position);
		var coods = new daum.maps.LatLng(position.coords.latitude, position.coords.longitude);
		
		var content = "<i class=\"ion-android-bicycle balanced icon-large\" style=\"font-size:200%\"></i>";
		
		if($scope.myPositionCircle) $scope.myPositionCircle.setMap(null);
		if($scope.myPositionIcon) $scope.myPositionIcon.setMap(null);
		
		$scope.myPositionCircle = new daum.maps.Circle({
		    center : coods,  // 원의 중심좌표 입니다 
		    radius: position.coords.accuracy, // 미터 단위의 원의 반지름입니다 
		    strokeWeight: 0, // 선의 두께입니다 
		    strokeColor: '#11c1f3', // 선의 색깔입니다
		    strokeOpacity: 0, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
		    strokeStyle: 'solid', // 선의 스타일 입니다
		    fillColor: '#FFCFE7', // 채우기 색깔입니다
		    fillOpacity: 0.5,  // 채우기 불투명도 입니다   
		    map:$scope.detailMap
		});

				
		// 커스텀 오버레이를 생성합니다
		$scope.myPositionIcon = new daum.maps.CustomOverlay({
		    map: $scope.detailMap,
		    position: coods,
		    content: content,
		    yAnchor: 0.5 
		});


		$scope.detailMap.panTo(coods);
		
		$scope.speedMeter = (position.coords.speed)?position.coords.speed:0;
	}
	
})

.controller('DashCtrl', function($scope,Route) {
	 Route.list().success(function(result){
		$scope.routeList = result;
		//console.log($scope.routeList)
	});
	
})

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
