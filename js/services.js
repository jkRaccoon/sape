angular.module('starter.services', ['ngResource'])

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
}).factory('Route',function($http){
	var route;
	return{
		list:function(){
			return $http.get('http://sape.kr/routeList');			
		}
	}
		
}).factory('Course',function(){
	var list = [{
		id:0,
		title:'으아닛'
	},{
		id:1,
		title:'아 달려보자고'
	}];
	
	var route = {"routes":[{"summary":{"distance":9315,"duration":2264,"bounds":{"left_top":"126.9977139,37.5345750","right_bottom":"127.0818778,37.5105556"},"route_option":8,"toll":"0,0,0,0,0,0","taxi_fare":12600,"start":{"address":"또래오래해피존2호점","location":"127.0818778,37.5181833"},"end":{"address":"반포한강공원달빛광장","location":"126.9977306,37.5105639"},"copyrights":"nhn","engine_version":"route3","result_version":"web3","map_version":"map_1.0.0","coord_type":"latlng","traffic_time":"201509091541"},"route_fullpath":"","legs":[{"summary":{"distance":9314,"duration":2264,"start":{"address":"또래오래해피존2호점","location":"127.0818778,37.5181833"},"end":{"address":"반포한강공원달빛광장","location":"126.9977306,37.5105639"}},"steps":[{"path":"","summary":{"distance":0,"duration":0,"step_summary":""},"road":{"road_type":5,"road_name":"","road_no":0,"lane_num":1,"road_structure":0},"panorama":{"id":"e4S+Ryid7yzXwjeyH7D4mg==","location":"127.0818056,37.5182083","pan":67,"tilt":0},"guide":{"turn_point":"127.0818750,37.5181806","direction":"","turn":48,"entrance_type":0,"point":"또래오래해피존2호점","content":"","instructions":"또래오래해피존2호점"}},{"path":"127.0818772,37.5182160 127.0817957,37.5182244 127.0816307,37.5182273 127.0811670,37.5182300 127.0806655,37.5182522 127.0798024,37.5183549 127.0789666,37.5184493 127.0777254,37.5186437 127.0765093,37.5188464 127.0764092,37.5188658 127.0749173,37.5191075 127.0737535,37.5193131 127.0715749,37.5196743 127.0712153,37.5195109 127.0711705,37.5194809 127.0711190,37.5194097","summary":{"distance":969,"duration":726,"step_summary":""},"road":{"road_type":6,"road_name":"","road_no":0,"lane_num":0,"road_structure":0},"traffic":{"congestion":0,"speed":0},"panorama":{"id":"eFHZWcXseOm83rzNtJ7j2Q==","location":"127.0764639,37.5188417","pan":81,"tilt":0},"guide":{"turn_point":"127.0764272,37.5188620","direction":"","turn":1,"entrance_type":0,"point":"","content":"969m 이동","instructions":"969m 이동"}},{"path":"","summary":{"distance":0,"duration":0,"step_summary":""},"road":{"road_type":5,"road_name":"","road_no":0,"lane_num":1,"road_structure":0},"panorama":{"id":"RINQ2wN7o/7tTnLBkwcAzQ==","location":"127.0712250,37.5195000","pan":143,"tilt":0},"guide":{"turn_point":"127.0711190,37.5194097","direction":"","turn":3,"entrance_type":0,"point":"","content":"우회전","instructions":"우회전"}},{"path":"127.0711190,37.5194097 127.0710512,37.5194297 127.0706510,37.5194883 127.0701579,37.5194631 127.0699186,37.5194013 127.0696770,37.5193113 127.0694635,37.5191765 127.0692978,37.5190415 127.0690822,37.5187784 127.0689811,37.5185875 127.0689065,37.5183440 127.0679951,37.5183772 127.0668659,37.5184299 127.0666088,37.5184687 127.0664152,37.5185046 127.0660631,37.5185851 127.0658538,37.5186361 127.0658088,37.5186821 127.0656652,37.5189253 127.0654038,37.5193257 127.0650757,37.5198067 127.0648481,37.5200899 127.0647016,37.5203332 127.0646569,37.5204252 127.0642938,37.5209250 127.0641947,37.5210016 127.0639582,37.5211657 127.0637248,37.5213241 127.0636620,37.5213677 127.0634968,37.5215247 127.0633586,37.5216850 127.0632330,37.5218497 127.0631355,37.5219388 127.0629415,37.5221550 127.0627628,37.5223504 127.0625445,37.5225239 127.0623961,37.5226163 127.0618287,37.5229334 127.0604922,37.5236002 127.0589312,37.5243669 127.0580513,37.5248193 127.0574302,37.5252019 127.0568147,37.5256512 127.0561655,37.5262144 127.0558907,37.5264698 127.0557406,37.5266143 127.0555152,37.5268146 127.0552847,37.5270118 127.0550126,37.5272617 127.0548096,37.5274341 127.0544729,37.5277179 127.0542302,37.5278909 127.0538593,37.5281167 127.0533580,37.5283506 127.0530461,37.5284732 127.0527174,37.5285902 127.0523966,37.5286822 127.0515575,37.5288739 127.0505380,37.5291240 127.0497767,37.5292851 127.0484963,37.5295823 127.0470771,37.5299045 127.0458666,37.5302126 127.0448257,37.5305291 127.0435422,37.5309514 127.0425806,37.5312432 127.0411548,37.5316184 127.0396157,37.5319601 127.0381025,37.5323183 127.0376062,37.5324708 127.0370531,37.5326514 127.0367220,37.5327432 127.0359854,37.5329378 127.0354947,37.5330542 127.0353408,37.5331092 127.0348699,37.5333180 127.0346840,37.5333520 127.0341397,37.5334408 127.0340851,37.5334518 127.0323005,37.5339236 127.0321435,37.5339787 127.0319434,37.5340621 127.0318337,37.5341014 127.0313105,37.5342406 127.0307905,37.5343657 127.0304091,37.5344464 127.0300497,37.5344966 127.0293987,37.5345716 127.0290111,37.5345884 127.0283229,37.5345577 127.0279272,37.5345075 127.0275623,37.5344379 127.0272919,37.5343766 127.0270933,37.5343178 127.0266953,37.5341759 127.0263029,37.5340144 127.0258379,37.5338001 127.0256839,37.5337104 127.0254499,37.5335572 127.0252797,37.5334344 127.0242485,37.5325561 127.0235514,37.5319367 127.0225405,37.5311147 127.0221181,37.5307618 127.0205871,37.5294920 127.0205436,37.5294482 127.0204816,37.5293301 127.0202878,37.5289951 127.0202257,37.5289195 127.0201700,37.5288771 127.0200692,37.5288282 127.0196440,37.5286531 127.0194975,37.5285769 127.0182212,37.5275371 127.0175738,37.5270092 127.0171959,37.5266924 127.0168405,37.5263981 127.0153265,37.5251369 127.0146736,37.5245812 127.0118624,37.5221367 127.0115261,37.5218393 127.0109869,37.5213640 127.0109732,37.5213503 127.0105485,37.5209783 127.0103345,37.5207893 127.0100041,37.5205006 127.0085997,37.5192712 127.0085834,37.5192443 127.0085858,37.5191745 127.0085831,37.5189485 127.0085699,37.5189039 127.0085549,37.5188763 127.0085065,37.5188308 127.0082774,37.5186309","summary":{"distance":6919,"duration":4959,"step_summary":""},"road":{"road_type":6,"road_name":"","road_no":0,"lane_num":0,"road_structure":0},"traffic":{"congestion":0,"speed":0},"panorama":{"id":"d6SXAR6CgzpaB7wC4AsbeA==","location":"127.0386944,37.5321639","pan":75,"tilt":0},"guide":{"turn_point":"127.0385260,37.5322178","direction":"","turn":1,"entrance_type":0,"point":"","content":"6.92km 이동","instructions":"6.92km 이동"}},{"path":"","summary":{"distance":0,"duration":0,"step_summary":""},"road":{"road_type":5,"road_name":"","road_no":0,"lane_num":1,"road_structure":0},"panorama":{"id":"B1TSKW29Pr4slTKzKn74Gg==","location":"127.0083861,37.5187056","pan":138,"tilt":0},"guide":{"turn_point":"127.0082774,37.5186309","direction":"","turn":5,"entrance_type":0,"point":"","content":"우측방향","instructions":"우측방향"}},{"path":"127.0082774,37.5186309 127.0081689,37.5186103 127.0080309,37.5185960 127.0077368,37.5184716 127.0069462,37.5178232 127.0067006,37.5176354 127.0064890,37.5175283 127.0062571,37.5174463 127.0060345,37.5174383 127.0057579,37.5174131 127.0055042,37.5173594 127.0052750,37.5172407 127.0050715,37.5170623 127.0049945,37.5168997 127.0049886,37.5168226 127.0049775,37.5166753 127.0049608,37.5162758 127.0049057,37.5159639 127.0046871,37.5154494 127.0046212,37.5153424 127.0044139,37.5150715 127.0039737,37.5146397 127.0036476,37.5144075 127.0033193,37.5142227 127.0027733,37.5140287 127.0025054,37.5139282 127.0022565,37.5137940 127.0021473,37.5137268 127.0019268,37.5135704 127.0016545,37.5133260 127.0015228,37.5132326 127.0012777,37.5131033 127.0009420,37.5129702","summary":{"distance":953,"duration":685,"step_summary":""},"road":{"road_type":6,"road_name":"","road_no":0,"lane_num":0,"road_structure":0},"traffic":{"congestion":0,"speed":0},"guide":{"turn_point":"127.0048460,37.5158236","direction":"","turn":1,"entrance_type":0,"point":"","content":"953m 이동","instructions":"953m 이동"}},{"path":"","summary":{"distance":0,"duration":0,"step_summary":""},"road":{"road_type":5,"road_name":"","road_no":0,"lane_num":1,"road_structure":0},"guide":{"turn_point":"127.0009420,37.5129702","direction":"","turn":2,"entrance_type":0,"point":"","content":"좌회전","instructions":"좌회전"}},{"path":"127.0009420,37.5129702 127.0014865,37.5122564","summary":{"distance":92,"duration":66,"step_summary":""},"road":{"road_type":6,"road_name":"","road_no":0,"lane_num":0,"road_structure":0},"traffic":{"congestion":0,"speed":0},"panorama":{"id":"lMVuOrtBOvcdr7JnkehJVQ==","location":"127.0015028,37.5122528","pan":32,"tilt":0},"guide":{"turn_point":"127.0012204,37.5126049","direction":"","turn":1,"entrance_type":0,"point":"","content":"92m 이동","instructions":"92m 이동"}},{"path":"","summary":{"distance":0,"duration":0,"step_summary":""},"road":{"road_type":5,"road_name":"","road_no":0,"lane_num":1,"road_structure":0},"panorama":{"id":"lMVuOrtBOvcdr7JnkehJVQ==","location":"127.0015028,37.5122528","pan":90,"tilt":0},"guide":{"turn_point":"127.0014865,37.5122564","direction":"","turn":3,"entrance_type":0,"point":"","content":"우회전","instructions":"우회전"}},{"path":"127.0014865,37.5122564 127.0011155,37.5121261 127.0007807,37.5120265 127.0005693,37.5119793 127.0001025,37.5118254 126.9999869,37.5117578 126.9995111,37.5114656 126.9993876,37.5113702 126.9992689,37.5112652 126.9991207,37.5111719 126.9989748,37.5110976 126.9987657,37.5110123 126.9985354,37.5109575 126.9984364,37.5109495 126.9983858,37.5109550 126.9983575,37.5109519 126.9983085,37.5109404 126.9983101,37.5109409 126.9983101,37.5109409 126.9983101,37.5109408 126.9983101,37.5109408 126.9983099,37.5109395","summary":{"distance":319,"duration":228,"step_summary":""},"road":{"road_type":6,"road_name":"","road_no":0,"lane_num":0,"road_structure":0},"traffic":{"congestion":0,"speed":0},"panorama":{"id":"fAoablZ1mjLBqkjiNSZt5g==","location":"126.9999194,37.5117000","pan":129,"tilt":0},"guide":{"turn_point":"126.9998202,37.5116553","direction":"","turn":1,"entrance_type":0,"point":"","content":"319m 이동","instructions":"319m 이동"}},{"path":"126.9983099,37.5109395 126.9982501,37.5109140 126.9982501,37.5109140 126.9982461,37.5109216 126.9982461,37.5109216 126.9982461,37.5109217","summary":{"distance":0,"duration":0,"step_summary":""},"road":{"road_type":5,"road_name":"반포대로","road_no":0,"lane_num":2,"road_structure":0},"panorama":{"id":"5x0r2+pJxlj6IDcVRnoisA==","location":"126.9982917,37.5109222","pan":58,"tilt":0},"guide":{"turn_point":"126.9983099,37.5109395","direction":"","turn":39,"entrance_type":0,"point":"","content":"<b>횡단보도</b>를 이용해 <b>반포대로</b>를 횡단","instructions":"<b>횡단보도</b>를 이용해 <b>반포대로</b>를 횡단"}},{"path":"126.9982461,37.5109217 126.9982521,37.5109235 126.9982066,37.5109079 126.9981761,37.5108810 126.9981096,37.5108228 126.9980406,37.5107620 126.9979553,37.5106988 126.9979171,37.5106742 126.9978958,37.5106609 126.9978271,37.5106280 126.9977049,37.5105668","summary":{"distance":61,"duration":155,"step_summary":""},"road":{"road_type":6,"road_name":"","road_no":0,"lane_num":0,"road_structure":0},"traffic":{"congestion":0,"speed":0},"panorama":{"id":"33kXFMr7AGs0bpIUWdW+8A==","location":"126.9980806,37.5107750","pan":134,"tilt":0},"guide":{"turn_point":"126.9980002,37.5107318","direction":"","turn":1,"entrance_type":0,"point":"","content":"61m 이동","instructions":"자전거도로 진입 후 61m 이동"}},{"path":"","summary":{"distance":0,"duration":0,"step_summary":""},"road":{"road_type":5,"road_name":"","road_no":0,"lane_num":1,"road_structure":0},"panorama":{"id":"ak3D+x4tmRf3il/QwX2l4Q==","location":"126.9976389,37.5105194","pan":58,"tilt":0},"guide":{"turn_point":"126.9977278,37.5105611","direction":"","turn":41,"entrance_type":0,"point":"반포한강공원달빛광장","content":"","instructions":"반포한강공원달빛광장"}}]}]}]};
	
	return{
		all:function(){
			return list;
		},
		route:function(){
			
			
			var steps = route.routes[0].legs[0].steps
			var coodsArr = new Array();
			var coods = new Array();
			for(var i in steps){
				if(steps[i].path){
					coodsArr =steps[i].path.split(" ");
					for(var j in coodsArr){
						coods.push(coodsArr[j].split(","));
					}
				}
				
			}
	
			return coods;
		}
	}
});
