// ----------------------------------------------------------------------------------------------
//
//  requires
//
// ----------------------------------------------------------------------------------------------
var serviceTop = require('./services/top.js');
var viewIndex = require('./views/index.js');
var appJS = require('../app.js');


// ----------------------------------------------------------------------------------------------
//
//  defines
//
// ----------------------------------------------------------------------------------------------
var indexList = [
		1010,
		1020,
		1030,
		1040,
		1050,
		1060,
		1070,
		1080,
		1090,
		1100,
		1110,
		1120,
		1130,
		1140,
		1150,
		1160,
		1170,
		1180
];


var teamList = {
		1010:"",
		1020:"",
		1030:"",
		1040:"",
		1050:"",
		1060:"",
		1070:"",
		1080:"",
		1090:"",
		1100:"",
		1110:"",
		1120:"",
		1130:"",
		1140:"",
		1150:"",
		1160:"",
		1170:"",
		1180:"",
};

var textList = {
		1010:"およべちゃん",
		1020:"チーム卑猥",
		1030:"きじー",
		1040:"Meena Bhoor",
		1050:"Agarwal Ankit",
		1060:"sawa",
		1070:"からあげさん",
		1080:"むらたっち",
		1090:"たかひろ",
		1100:"あじさん",
		1110:"たかはし",
		1120:"やまき",
		1130:"かじ",
		1140:"もりき",
		1150:"ほんま",
		1160:"たかまう",
		1170:"チームへたれ",
		1180:"チームテキサス",
};

var titleList = {
		1010:"",
		1020:"",
		1030:"",
		1040:"",
		1050:"",
		1060:"",
		1070:"",
		1080:"",
		1090:"",
		1100:"",
		1110:"",
		1120:"",
		1130:"",
		1140:"",
		1150:"",
		1160:"",
		1170:"",
		1180:"",
};

var imgList = {
		1010:"/images/butoukai/20130803/oyo.jpg",
		1020:"/images/butoukai/20130803/hiwai.jpg",
		1030:"/images/butoukai/20130803/kijima.jpg",
		1040:"/images/butoukai/20130803/Bhoor.jpg",
		1050:"/images/butoukai/20130803/Ankit.jpg",
		1060:"/images/butoukai/20130803/sawa.jpg",
		1070:"/images/butoukai/20130803/karaage.jpg",
		1080:"/images/butoukai/20130803/murata.jpg",
		1090:"/images/butoukai/20130803/hirotaka.jpg",
		1100:"/images/butoukai/20130803/aji.jpg",
		1110:"/images/butoukai/20130803/takahashi.jpg",
		1120:"/images/butoukai/20130803/yamaki.jpg",
		1130:"/images/butoukai/20130803/kajihara.jpg",
		1140:"/images/butoukai/20130803/moriki.jpg",
		1150:"/images/butoukai/20130803/maro.jpg",
		1160:"/images/butoukai/20130803/takamario.jpg",
		1170:"/images/butoukai/20130803/チームへたれ.jpg",
		1180:"/images/butoukai/20130803/otsukare.jpg",
};


// ----------------------------------------------------------------------------------------------
//
//  /index
//
// ----------------------------------------------------------------------------------------------
exports.index = function(req, res){
	var contextTop = {};
	var resultTop = serviceTop.doTop(contextTop);

	var viewContext = {};
	viewIndex.do(req, res, viewContext);
};


// ----------------------------------------------------------------------------------------------
//
//  /list
//
// ----------------------------------------------------------------------------------------------
exports.list = function(req, res){
	res.render('partials/list', {
		img:   imgList,
		team:  teamList,
		title: titleList,
		text:  textList,
		indeies: indexList
	});
}


// ----------------------------------------------------------------------------------------------
//
//  /search
//
// ----------------------------------------------------------------------------------------------
exports.search = function(req, res){
	res.render('search');
}


// ----------------------------------------------------------------------------------------------
//
//  /detail
//
// ----------------------------------------------------------------------------------------------
exports.detail = function(req, res){

	//-------------------------------------------------------------
	// defines
	//-------------------------------------------------------------
	var img = "";
	var id = req.param("id");
	if(id == "" || id === undefined ){
		id = "10"
	}

	//-------------------------------------------------------------
	// Get Mongodb Connection Object
	//-------------------------------------------------------------
	var db = appJS.getMongoConnection();
	var User = db.model('User');

	//-------------------------------------------------------------
	// Execute Query( select id from users)
	//-------------------------------------------------------------
	User.find({id:id},function(err,docs){
		if(err){
			throw err;
		}

		var p_result;

		if(docs[0] == "" || docs[0] === undefined ){
			p_result = 0;
		}else{
			p_result = new User(docs[0]).price;
		}

		//-------------------------------------------------------------
		// Call view page
		//-------------------------------------------------------------
		res.render('detail', {
			team:    teamList[id],
			title:   titleList[id],
			text:    textList[id],
			get_img: imgList[id],
			get_price: p_result,
			get_id: id
		});
	});
};
