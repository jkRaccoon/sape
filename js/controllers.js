angular.module('starter.controllers', [])

//라이딩 리스트
.controller('RideList', function($scope, $ionicLoading, $compile, $stateParams, $ionicPopup,Course) {
	
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
    
   
    $scope.courseId = $stateParams.courseId; //코스아이디
    
    
	
	
	
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
	
	
	Course.routeLiveList($scope.courseId).success(function(result){
		$scope.courseList = result;
	});
	
	
	Course.route($scope.courseId).success(function(result){
		
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
.controller('RideDetail', function($scope, $stateParams, ride) {
	$scope.courseDetailId	= $stateParams.courseDetailId;
	$scope.courseId			= $stateParams.courseId;
	$scope.displayTimerID	= false;
	//디스트로이 이벤트 
	$scope.$on("$destroy", function handler() {		
		if($scope.watchID)navigator.geolocation.clearWatch($scope.watchID);
		
		$scope.leaveRide();
    });
	
	//지도 추가 
	var container = document.getElementById('detailmap'); //지도를 담을 영역의 DOM 레퍼런스
	var options = { //지도를 생성할 때 필요한 기본 옵션
		center: new daum.maps.LatLng(37.51186511, 126.99830338718), //지도의 중심좌표.
		level: 3, //지도의 레벨(확대, 축소 정도)
	};
	
	var map = new daum.maps.Map(container, options); //지도 생성 및 객체 리턴
	map.addOverlayMapTypeId(daum.maps.MapTypeId.BICYCLE); //자전거 범례추가
	$scope.detailMap = map;
	
	//코스정보 표시.
	
	ride.route($scope.courseId).success(function(result){
		
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
	
	//내위치를 표시할 마커 생성.
	$scope.myPositionIcon = new daum.maps.CustomOverlay({
	    map: $scope.detailMap,
	    position: new daum.maps.LatLng(37.51186511, 126.99830338718),
	    content: "<i class=\"ion-android-bicycle positive  icon-large\" style=\"font-size:200%\"></i>",
	    yAnchor: 0.5 
	});
	
	//정확도 서클 생성
	$scope.myPositionCircle = new daum.maps.Circle({
	    center : new daum.maps.LatLng(37.51186511, 126.99830338718),  // 원의 중심좌표 입니다 
	    radius: 10, // 미터 단위의 원의 반지름입니다 
	    strokeWeight: 0, // 선의 두께입니다 
	    strokeColor: '#11c1f3', // 선의 색깔입니다
	    strokeOpacity: 0, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
	    strokeStyle: 'solid', // 선의 스타일 입니다
	    fillColor: '#FFCFE7', // 채우기 색깔입니다
	    fillOpacity: 0.5,  // 채우기 불투명도 입니다   
	    map:$scope.detailMap
	});
		
	//내위치 표시
	$scope.mapMoveThisPosition = function(position){
		//console.log(position)
		var coods = new daum.maps.LatLng(position.coords.latitude, position.coords.longitude);
		var accuracy = position.coords.accuracy;
				
		
		
		
		//아이콘 위치 수정
		$scope.myPositionIcon.setPosition(coods);
		$scope.myPositionCircle.setPosition(coods);		
		
		//정확도 원 크기 조정
		$scope.myPositionCircle.setRadius(accuracy);
		
		//지도 중심좌표이동
		$scope.detailMap.panTo(coods);
		
		//속도표시
		$scope.speedMeter = (position.coords.speed)?position.coords.speed:0;
		
		//경위도표시
		$scope.lat = position.coords.latitude;
		$scope.lng = position.coords.longitude;
		ride.post(position,$scope.courseDetailId);
	}
	
	$scope.displayTimer = function(){
		ride.get($scope.courseDetailId).then(function(result){
			for(var i in $scope.riderList){
				$scope.riderList[i].setMap(null);
			}
			$scope.riderList = new Array();
			
			for(var i in result.data){
				tmpPosition = new daum.maps.LatLng(result.data[i].latitude, result.data[i].longitude);
				$scope.riderList[result.data[i].idx] = new daum.maps.CustomOverlay({
				    map: $scope.detailMap,
				    position: tmpPosition,
				    content: "<i class=\"ion-android-bicycle assertive dissolveOut5s icon-large\" style=\"font-size:200%\"></i>",
				    yAnchor: 0.5 
				});
								
			}
			//console.log($scope.riderList)
			
		});
	}
	
	$scope.joinRide = function(){
		ride.put($scope.courseDetailId);
		$scope.displayTimer();
		$scope.displayTimerID = setInterval($scope.displayTimer, 5000);
	}
	
	$scope.leaveRide = function(){
		if($scope.displayTimerID)clearInterval($scope.displayTimerID);
		ride.delete($scope.courseDetailId);
		for(var i in $scope.riderList){
			$scope.riderList[i].setMap(null);
		}
		$scope.displayTimerID	= false;
	}
	
	$scope.riderList = new Array();
	$scope.watchID =  navigator.geolocation.watchPosition($scope.mapMoveThisPosition);
	
})
	

.controller('DashCtrl', function($scope,$http,$httpParamSerializerJQLike,Course,myInfo) {
	Course.list().success(function(result){
		console.log(result)
		$scope.routeList = result;
		
	});
	
	$scope.uuid = myInfo.token();
	
	
	
	
})

.controller('ChatsCtrl', function($scope, Chats) {
	$scope.chats = Chats.all();
	$scope.remove = function(chat) {
		Chats.remove(chat);
	};
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
	$scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope,$state) {
	$scope.settings = {
		enableGps: true,
		enableDailyRecommend : true
	};
	
	$scope.logout = function(){
		$state.go('login');
	};
})

.controller('Login', function($scope,$state) {
	
	//테스트코드-인증패스
	$state.go('tab.dash');
	$scope.LoginWithFacebook = function(){
		if(window.cordova){
			facebookConnectPlugin.login(["public_profile"], function(loginData){
				
	 			$scope.LoginOkFacebook(loginData );
	 		},
	 		  function loginError (error) {
	 		    console.error(error)
	 		  }
	 		);
		}else{
			FB.login(function(loginData) {
				console.log(loginData)
			    if (loginData.authResponse) {
				    
				    $scope.LoginOkFacebook(loginData );
			    } else {
			     console.log('User cancelled login or did not fully authorize.');
			    }
			},{
		 		  scope: 'public_profile,user_friends',
		 		  return_scopes: true
	 		  }
	 		);
		}
		
	}
	
	$scope.LoginOkFacebook = function(loginData){
		
		if(window.cordova){
			$state.go('tab.dash');
		}else{
			FB.api("/me",{"fields":"picture,name,cover"}, function(response){
	 			console.log(response);
	 			$state.go('tab.dash');
	 		});

		}
		
		
		
	}
})
.directive('hideTabs', function($rootScope) {
  return {
      restrict: 'A',
      link: function($scope, $el) {
          $rootScope.hideTabs = 'tabs-item-hide';
          $scope.$on('$destroy', function() {
              $rootScope.hideTabs = '';
          });
      }
  };
});;



