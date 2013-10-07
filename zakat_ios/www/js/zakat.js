
var app = {
    initialize: function() {
        this.bindEvents();
    },
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    onDeviceReady: function() {
        cordova.exec(null, null, "SplashScreen", "hide", [])
        
        app.receivedEvent('deviceready');
        //check if first run

        var firstrun = window.localStorage.getItem("runned"); 

        if (firstrun == null) { //first
            window.localStorage.setItem("runned", "1"); 
            window.localStorage.setItem("goldPrice", "260.69");
            window.localStorage.setItem("silverPrice", "4.08");
        }else{
            //not first
        }

        loadResource();
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        console.log('Received Event: ' + id);
    }

};

var goldPrice = window.localStorage.getItem('goldPrice');
var silverPrice = window.localStorage.getItem('silverPrice');

//加载数据和资源
function loadResource(){
    $$('.todayPrice').html("正在获取...");

    var url = 'http://api.qmzh.net/zakat.php?request=push';
    //var url = 'http://localhost/studio/api/zakat.php?request=push';
    $$.ajax({
        type: 'POST', // defaults to 'GET'
        url: url,
        data: { name: device.name, cordova:device.cordova, platform:device.platform, uuid:device.uuid, model:device.model, version:device.version},
        dataType: 'json', //'json', 'xml', 'html', or 'text'
        async: true,
        crossDomain: true,
        contentType: "application/x-www-form-urlencoded",
        success: function(data) {

            window.localStorage.setItem("goldPrice", data.gold);
            window.localStorage.setItem("silverPrice", data.silver);

            if(data.apps != ''){

                $$('#SpecialApps').html('<div class="text tiny" style="color:#666; margin-bottom:6px;"> 推荐应用 - SpecialHonored</div>');

                $$(data.apps).each(function(app){
                    $$('#SpecialApps').append('<li class="thumb arrow" id="appID'+app+'"><img src="'+this.icon+'"><div><a href="#" class="arrow"><strong>'+this.title+'</strong><small>'+this.subtitle+'</small></a></div></li>');
                    var url = this.url;
                    $$('#appID'+app).on("tap", function(){
                        window.open(url, '_blank', 'closebuttoncaption=关闭,toolbar=yes');
                    });
                });
            }
            $$('.todayPrice').html("金价:"+data.gold+"元/克， 银价: "+data.silver+"/克");
            $$("#SpecialApps").css('display','block');
            $$("#Ad").css('display','block');
        },
        error: function(xhr, type) {
            $$('.todayPrice').html("金价:"+goldPrice+"元/克， 银价: "+silverPrice+"/克。");

            $$('#SpecialApps').css('display','none');
            //consider no internet access
            $$("#Ad").css('display','none');
        }
    });

}


$$('.applestore').tap(function() {
    //https://itunes.apple.com/us/app/tian-ke-ji-suan-qi/id687212309?ls=1&mt=8
    //itms-apps://itunes.apple.com/us/app/tian-ke-ji-suan-qi/id687212309?ls=1&mt=8
    window.open('itms-apps://itunes.apple.com/cn/app/tian-ke-ji-suan-qi/id687212309?ls=1&mt=8','_system');

});

$$('.currencyCalculator').tap(function(){
    currencyCalculator();
});

$$('.agromineralsCalculator').tap(function(){
    agromineralsCalculator();
});

$$('.businessCalculator').tap(function(){
    businessCalculator();
});

$$('.livestockCalculator').tap(function(){
    livestockCalculator();
});

$$('.qmzh').tap(function(){
     window.open('http://www.qmzh.net', '_blank', 'closebuttoncaption=关闭,toolbar=yes');
});


$$('.feedback').tap(function(){
    var feedback = $$('.fbcontent').val();
    var email = $$('.email').val();
    //var url = "http://localhost/studio/api/feedback.php?request=database";
    var url = "http://api.qmzh.net/feedback.php?request=database";

    if(feedback == ''){
        Lungo.Notification.error(
            "发送失败",                  //Title
            "请填写反馈内容",     //Description
            "",                    //Icon
            7,                          //Time on screen
            function(){}
        );
        return false;
    }

 
    $$('#feedbackButton').html('正在提交，请稍候...');
    $$('.fbcontrol').removeClass('feedback');


    $$.ajax({
            url: url,
            type: "POST",
            dataType: "json",
            data: { email: email, feedback: feedback, from: 'Zakat', device_ID:device.uuid },
            async: true,
            crossDomain: true,
            contentType: "application/x-www-form-urlencoded",
            success: function(data) {

                if(data.status != 'ok'){
                    Lungo.Notification.error(
                        "发送失败",                  //Title
                        "请稍后再试或手动发送电子邮件到：i@qmzh.net",     //Description
                        "",                    //Icon
                        7,                          //Time on screen
                        function(){}
                    );
                }

                Lungo.Router.section("feedbackDone");

                $$('.userfeedback').html("<b>"+email+"</b>"+"<p>"+feedback+"</p>");
                $$('#feedbackButton').html('反馈');
                $$('.fbcontrol').addClass('feedback');
            },
            error: function(xhr, type) {
                Lungo.Notification.error(
                    "发送失败",                  //Title
                    "请稍后再试或手动发送电子邮件到：i@qmzh.net",     //Description
                    "",                    //Icon
                    7,                          //Time on screen
                    function(){}
                );
                $$('#feedbackButton').html('反馈');
                $$('.fbcontrol').addClass('feedback');
            }
        });
 
});

$$('#Ad').tap(function() {
    window.open('http://api.qmzh.net/ad.php?request=zakat', '_blank', 'closebuttoncaption=关闭,toolbar=yes');
});

$$(".notification").tap(function() {
    Lungo.Notification.hide();
});