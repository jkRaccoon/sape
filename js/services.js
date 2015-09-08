angular.module('starter.services', [])

.factory('Chats', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var chats = [{
    id: 0,
    name: '수지',
    lastText: '한강(남단) - 2분전',
    face: 'img/sample/sasa23.jpg',
    statusText : '한강 함께 달려요~!'
  }, {
    id: 1,
    name: '솔아',
    lastText: '중랑천 - 10분전',
    face: 'http://cfile4.uf.tistory.com/image/195AE74F509C864D0CAE7A',
    statusText : '중랑천엔 사람이없나요ㅠㅠ'

  }, {
    id: 2,
    name: '한나',
    lastText: '남한강자전거도로 - 14분전',
    face: 'http://fimg2.pann.com/new/download.jsp?FileID=26664527',
    statusText : '와 여기 좋다~ 누구 없어요?'

  }, {
    id: 3,
    name: '은주',
    lastText: '낙동강자전거도로 - 1시간전',
    face: 'http://cfile211.uf.daum.net/original/243BFF3D519CA9EB10CD8C',
    statusText : '지방엔 사람이 없어 ㅠㅠ'

  }, {
    id: 4,
    name: '철호',
    lastText: '경인아라뱃길 - 3시간전',
    face: 'http://cfile215.uf.daum.net/image/224BA334544DB22A013894',
    statusText : '이동네 처음!'

  }];

  return {
    all: function() {
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    }
  };
}).factory('Course',function(){
	var list = [{
		id:0,
		title:'으아닛'
	},{
		id:1,
		title:'아 달려보자고'
	}];
	
	return{
		all:function(){
			return list;
		}
	}
});
