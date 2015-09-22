angular.module('starter.controllers', [])

//코스 상세보기
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
			
		});
	
	};
	if(!$scope.map) {
		initialize();
	}
	
	
	Course.routeLiveList(courseId).success(function(result){
		$scope.courseList = result;
	});
	
	
	Course.route(courseId).success(function(result){
		
		var linePath = new Array();
		var bounds = new daum.maps.LatLngBounds();
		var point = null;
		
		for(var i in result){
			point = new daum.maps.LatLng(result[i]["lat"], result[i]["lng"]);
			linePath.push(point);
			bounds.extend(point);
		}
		
		// 지도에 표시할 선을 생성합니다
		var polyline = new daum.maps.Polyline({
		    path: linePath, // 선을 구성하는 좌표배열 입니다
		    strokeWeight: 5, // 선의 두께 입니다
		    strokeColor: '#0000FF', // 선의 색깔입니다
		    strokeOpacity: 1, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
		    strokeStyle: 'solid' // 선의 스타일입니다
		});
		
		
		
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
		polyline.setMap($scope.map); 
		$scope.map.setBounds(bounds,10,10,10,10);

	});
	

})
//라이딩 상세보기
.controller('CourseDetailCtrl', function($scope, Course) {
	
	$scope.$on("$destroy", function handler() {		
		navigator.geolocation.clearWatch($scope.watchID);		
    });
	
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
	
	
	
	
	
	Course.route().success(function(result){
		
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
	$scope.mapMoveThisPosition = function(position){
		console.log(position)
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
		$scope.lat = position.coords.latitude;
		$scope.lng = position.coords.longitude;
	}
	
	$scope.watchID =  navigator.geolocation.watchPosition($scope.mapMoveThisPosition);
	
})

.controller('DashCtrl', function($scope,$http,$httpParamSerializerJQLike,Course,myInfo) {
	Course.list().success(function(result){
		$scope.routeList = result;
		
	});
	
	$scope.uuid = myInfo.token();
	
	
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
