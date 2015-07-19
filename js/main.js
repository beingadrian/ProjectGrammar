
var _app = new app();

_app.initGui = function() {
    //alert("App Ready");   
}

_app.formSubmission = function (event) {
   event.preventDefault();
   var val = document.getElementById("inputarea").value;
   var params = [
       {'name': 'key', value:'810ff583bed6266bc7cec7781b49cfc9'},
       {'name': 'txt', value:val}
   ];
    console.log("Got Submission");
    _app.nimble.get(0, _app.formSubmissionHandler, true, params);
}

_app.formSubmissionHandler = function (data){
   var json = JSON.parse(data);
   var pages = json.ListPage.pages.LinkPage;
   
   var output = document.getElementById("inputarea").value;  

    
    
   for (i=(pages.length-1);i>=0;i--) {
       var p = pages[i];
       var lt =  p['linkTitle'].split('-');
       var start = parseInt(lt[0]);
       var end = parseInt(lt[1])+1;
       output = output.slice(0,start) + "<span id='" +p['@attributes']['id']+ "'>" + output.slice(start,end) 
           + "</span>" + output.slice(end,output.length);
       console.log(output);
       
   }
    
    document.getElementById("output").innerHTML = output;
}

_app.audioSubmission = function (file) {
   var params = [
       {'name': 'key', value:'810ff583bed6266bc7cec7781b49cfc9'}
   ];
    console.log("Got Submission");
    _app.nimble.getWithFile(file, _app.audioSubmissionHandler,1, null,false);
}

_app.audioSubmissionHandler = function (data){
   var json = JSON.parse(data);
   //var obj = encodeURIComponent(json);
    
    _app.nimble.get(2, function(data) {
        console.log(data);
    }, true, {name:'json',value:encodeURIComponent(json)});
    
    console.log(json);
    
    var outputDoc = document.getElementById("output");
    
    
    
    //var output = document.getElementById("inputarea").value;  
    var output = json['ListPage']['title'];
    
    var pages = json['ListPage']['pages'];
    
    if (pages === Array) {
    
   for (i=(pages.length-1);i>=0;i--) {
       var p = pages[i];
       var lt =  p['LinkPage']['LinkUrl'].split('-');
       var start = parseInt(lt[0]);
       var end = parseInt(lt[1])+1;
       output = output.slice(0,start) + "<span class='highlight' id='" +p['@attributes']['id']+ "'>" + output.slice(start,end) 
           + "</span>" + output.slice(end,output.length);
       console.log(output);
   }
    }
    else if (pages['LinkPage']){
      var p = pages['LinkPage'];
        console.log(typeof(pages['LinkPage']));
       var lt =  p['LinkUrl'].split('-');
       var start = parseInt(lt[0]);
       var end = parseInt(lt[1])+1;
       output = output.slice(0,start) + "<span class='highlighted' id='" +p['@attributes']['id']+ "'>" + output.slice(start,end) 
           + "</span>" + output.slice(end,output.length);
       console.log(output);
    }
    
    outputDoc.innerHTML = output;
    //var matchesCount = outputVal.split("<Music/Noise>").length - 1;
}


_app.initialize();