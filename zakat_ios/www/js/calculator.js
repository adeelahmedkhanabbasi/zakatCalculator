function currencyCalculator(){
	//var goldSilver = $$("#goldSilver").is(':checked');
	var goldSilver = document.getElementById("goldSilver").checked;
	var money = $$("#currencyInput").val();
	var result = $$("#currencyResult");

	var goldPrice = window.localStorage.getItem('goldPrice');
	var silverPrice = window.localStorage.getItem('silverPrice');
	var goldAmount = 85*goldPrice;
	var silverAmount = 595*silverPrice;
	
	//check user's typing
	if(money == ""){
		Lungo.Notification.error(
		    "计算失败",                      //Title
		    "请输入需要计算的货币总数",     //Description
		    "取消",                     //Icon
		    2,                            //Time on screen
		    function(){}             //Callback function
		);
		return false;

	}


	//判断使用的计算方式（白银or黄金）
	if(goldSilver){
		//白银
		if(money < silverAmount){
			Lungo.Notification.error(
			    "暂时不用缴纳天课",                  //Title
			    "低于起银价征额 "+silverAmount+" 元",     //Description
			    "",                    //Icon
			    7,                          //Time on screen
			    function(){}
			);
			//result.html("低于起征额 "+silverAmount+" 元，暂时不用缴纳天课。");
			return false;
		}
	}else{
		if(money < goldAmount){
			Lungo.Notification.error(
			    "暂时不用缴纳天课",                  //Title
			    "低于金价起征额 "+goldAmount+" 元",     //Description
			    "",                    //Icon
			    7,                          //Time on screen
			    function(){}
			);
			//result.html("低于起征额 "+goldAmount+" 元，暂时不用缴纳天课。");
			return false;
		}
	}

	money = money*0.025;
	money = Math.round(money*100)/100;


	Lungo.Notification.success(
	    "您应当缴纳的天课为",                  //Title
	    money + " 元",     //Description
	    "money",                    //Icon
	    7,                          //Time on screen
	    function(){}
	);

	//result.html("您应当缴纳的天课为 "+ money + " 元");
	//show the result
	//$("#hideResult").css('visibility','visible').hide().fadeIn('slow');
	return false;
}


var bull = 1;
var cow = 1;
var intRegex = /^\d+$/;
var val1 = "";
var val2 = "";

function livestockCalculator(){
	val1 = "";
	val2 = "";
	bull = 1;
	cow = 1;
	var typeoflivestock = $$(".typeoflivestock").val();
	var numberOfLivestock = $$('#livestockInput').val();
	var result = $$('#livestockResult');
	var number;

	//check user's typing
	if(numberOfLivestock == ""){
		Lungo.Notification.error(
		    "计算失败",                      //Title
		    "请输入需要计算的牲畜总数",     //Description
		    "取消",                     //Icon
		    2,                            //Time on screen
		    function(){}             //Callback function
		);
		return false;

	}

	//羊
	if(typeoflivestock == 1){
		if(numberOfLivestock >= 40 && numberOfLivestock <= 120){
			number = "1 只羊";
		}else if(numberOfLivestock >= 121 && numberOfLivestock <= 200){
			number = "2 只羊";
		}else if(numberOfLivestock >= 201 && numberOfLivestock <= 300){
			number = "3 只羊";
		}else if(numberOfLivestock > 300){
			number = parseInt(numberOfLivestock / 100) +" 只羊"; 
		}else{
			Lungo.Notification.error(
			    "暂时不用缴纳天课",                  //Title
			    "少于40只羊，不用缴纳天课。",     //Description
			    "",                    //Icon
			    7,                          //Time on screen
			    function(){}
			);
			//result.html("少于40只羊，不用缴纳天课。");
			return false;
		}

	//牛
	}else if(typeoflivestock == 2){

		//var userInput = document.getElementById("input").value;
		var userInput = numberOfLivestock;
		//replace the last number
		userInput = userInput.replace(/\d{1}$/,0);
		//Processing a number between 0 to 50
		if(userInput<30){
			Lungo.Notification.error(
			    "暂时不用缴纳天课",                  //Title
			    "少于30头牛，不用缴纳天课。",     //Description
			    "",                    //Icon
			    7,                          //Time on screen
			    function(){}
			);
			//result.html("少于30头牛，不用缴纳天课。");
			return false;
		}else if(userInput == 50 ){
			userInput = 40;
		}
		if(userInput - 30 == 0){
			Lungo.Notification.success(
			    "1头满一岁的公牛或者满一岁的母牛",                  //Title
			    number,     //Description
			    "github-alt",                    //Icon
			    7,                          //Time on screen
			    function(){}
			);
			//result.html("1头满一岁的公牛或者满一岁的母牛");
			return false;
		}else if(userInput - 40 ==0){
			Lungo.Notification.success(
			    "1头满两岁的母牛",                  //Title
			    number,     //Description
			    "github-alt",                    //Icon
			    7,                          //Time on screen
			    function(){}
			);
			//result.html("1头满两岁的母牛");
			return false;
		}

		//Processing a number > 50
		var res1 = bullCaculator(userInput);
		var res2 = cowCaculator(userInput);
		if(res1 == res2){
			number = res1;
		}else if(res1!="" && res2!=""){
			number = res1+"或"+res2
		}else if(res1!=""){
			number = res1;
		}else if(res2!=""){
			number = res2;
		}
	//骆驼
	}else if(typeoflivestock == 3){


	}
	
	//result.html("您应当缴纳的天课为 "+ number);
	Lungo.Notification.success(
	    "您应当缴纳的天课为",                  //Title
	    number,     //Description
	    "github-alt",                    //Icon
	    7,                          //Time on screen
	    function(){}
	);
	 
}

/*		牛 		*/
function bullCaculator(userInput){

	var a = userInput - 30;
	var aa = a/30;
	var ab = a/40;
	if(intRegex.test(aa) && (intRegex.test(ab)==false)) {
		val1+= ((aa+1) +"头满一岁的公牛");
	}else if(intRegex.test(ab) && (intRegex.test(aa)==false)){
		val1+= ab +"头满两岁的母牛和"+ bull +"头满一岁的公牛"
		//alert(ab +"母， "+ bull +" 公")
	}else if((intRegex.test(aa)==false) && (intRegex.test(ab)==false)){
		bull++;
		if(a>30){
			bullCaculator(a);
		}
	}else{
		//alert('bullCaculator else')
	}
	bull = 1;
	return val1;
}
function cowCaculator(userInput){
	var b = userInput - 40;

	var ba = b/30;
	var bb = b/40;
 
	if(intRegex.test(ba) && (intRegex.test(bb)==false)) {
		//alert((ba) +" 公和"+ cow +"母")
		val2+= (cow +"头满两岁的母牛和"+(ba) +"头满一岁的公牛");
	}else if(intRegex.test(bb) && (intRegex.test(ba)==false)){
		//alert(bb+1 +"母")
		val2 += (bb+1) +"头满两岁的母牛";
	}else if( (intRegex.test(bb)==false) && (intRegex.test(ba)==false)){
		cow++;
		if(b>40){
			cowCaculator(b);
		}
	}else{
		//alert("cowCaculator else");
	}
	cow = 1;
	return val2;
}

/*	商业天课		*/
function businessCalculator(){
	var goldPrice = window.localStorage.getItem('goldPrice');
	var silverPrice = window.localStorage.getItem('silverPrice');
	var goldAmount = 85*goldPrice;
	var silverAmount = 595*silverPrice;

	//var goldSilver = $$("#goldSilverBs").is(':checked');
	var goldSilver = document.getElementById("goldSilver").checked;
	var result = $$("#businessResult");
	var businessInput1 = $$("#businessInput1").val();
	var businessInput2 = $$("#businessInput2").val();
	var businessInput3 = $$("#businessInput3").val();
	var businessInput4 = $$("#businessInput4").val();

	if(businessInput1 == ""){ businessInput1 = 0;}
	if(businessInput2 == ""){ businessInput2 = 0;}
	if(businessInput3 == ""){ businessInput3 = 0;}
	if(businessInput4 == ""){ businessInput4 = 0;}

	var baseResult = Number(businessInput1) + Number(businessInput2) + Number(businessInput3) - Number(businessInput4);

	//判断使用的计算方式（白银or黄金）
	if(goldSilver){
		//白银
		if(baseResult < silverAmount){
			Lungo.Notification.error(
			    "暂时不用缴纳天课",                  //Title
			    "低于起银价征额 "+silverAmount+" 元",     //Description
			    "",                    //Icon
			    7,                          //Time on screen
			    function(){}
			);
			//result.html("低于起征额 "+silverAmount+" 元，暂时不用缴纳天课。");
			return false;
		}
	}else{
		if(baseResult < goldAmount){
			Lungo.Notification.error(
			    "暂时不用缴纳天课",                  //Title
			    "低于起金价征额 "+goldAmount+" 元",     //Description
			    "",                    //Icon
			    7,                          //Time on screen
			    function(){}
			);
			//result.html("低于起征额 "+goldAmount+" 元，暂时不用缴纳天课。");
			return false;
		}
	}
	baseResult = baseResult*0.025;
	baseResult = Math.round(baseResult*100)/100;
	//result.html("您应当缴纳的天课为 "+ baseResult + " 元");
	Lungo.Notification.success(
	    "您应当缴纳的天课为",                  //Title
	    baseResult + " 元",     //Description
	    "shopping-cart",                    //Icon
	    7,                          //Time on screen
	    function(){}
	);
}


/*	农产品天课	*/
function agromineralsCalculator(){
	var agromineralsInput = $$("#agromineralsInput").val();
	var result = $$("#agromineralsResult");
	var type = $$(".typeAgrominerals").val();

	if(agromineralsInput == ""){
		Lungo.Notification.error(
		    "计算失败",                      //Title
		    "请输入需要计算的农产品总量",     //Description
		    "取消",                     //Icon
		    2,                            //Time on screen
		    function(){}             //Callback function
		);
		return false;
	}

	var startUp = 300*2.04;
	var user = agromineralsInput*2.04;
	var output;
	if(user < startUp){
		Lungo.Notification.error(
		    "暂时不用缴纳天课",                  //Title
		    "低于起征额 "+startUp+" 公斤",     //Description
		    "",                    //Icon
		    7,                          //Time on screen
		    function(){}
		);
		//result.html("低于起征额 "+startUp+" 公斤，暂时不用缴纳天课。");
		return false;
	}
	if(type == 1){
		output = user*0.1;
	}else if(type == 2){
		output = user*0.05;
	}else if(type == 3){
		output = user*0.075;
	}

	output = Math.round(output*100)/100;
	//result.html("您应当缴纳的天课为 "+ output+"公斤");
	Lungo.Notification.success(
	    "您应当缴纳的天课为",                  //Title
	    output+"公斤",     //Description
	    "leaf",                    //Icon
	    7,                          //Time on screen
	    function(){}
	);

}