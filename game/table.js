var table_source = "http://127.0.0.1:5000/" ;
    var table = {};
    var XHR = createXHR()
    var header = "Access-Control-Allow-Origin";
    XHR.open('GET', table_source, true);
    XHR.send();
    XHR.onreadystatechange = function() {       
        if (XHR.readyState == 4){ 
            if (rsp_txt !=""){
                var rsp_txt = XHR.responseText
                table = JSON.parse(rsp_txt);
            }
        };
    }
    var players = table.Players
    var bb = table.bb

 
function createXHR(){
    if (window.XMLHttpRequest) { // Mozilla, Safari, IE7+...
        var XHR = new XMLHttpRequest();
    }
    else if (window.ActiveXObject) { // IE 6 et antérieurs
        XHR = new ActiveXObject("Microsoft.XMLHTTP");
    }
    return XHR;
}

