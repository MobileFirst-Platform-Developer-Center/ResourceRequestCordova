var Messages = {
    // Add here your messages for the default language.
    // Generate a similar file with a language suffix containing the translated messages.
    // key1 : message1,
};

var wlInitOptions = {
    // Options to initialize with the WL.Client object.
    // For initialization options please refer to IBM MobileFirst Platform Foundation Knowledge Center.
};

// Called automatically after MFP framework initialization by WL.Client.init(wlInitOptions).
function wlCommonInit(){
	// Common initialization code goes here
  WL.Logger.info("at wlCommonInit");
  app.initialize();
}

var app = {
    // Application Constructor
    initialize: function() {
      WL.Logger.info("at app.initialize");
        this.bindEvents();
    },

    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.getElementById("btn_submit").addEventListener('click', app.submitRequest);
    },
    submitRequest:function(){
      WL.Logger.info("at app.submitRequest");
      var first = document.getElementById("first").value;
      var middle = document.getElementById("middle").value;
      var last = document.getElementById("last").value;
      var age = document.getElementById("age").value;
      var date = document.getElementById("date").value;
      var height = document.getElementById("height").value;

      var url = "/adapters/JavaAdapter/users/"+first+"/"+middle+"/"+last;
      var resourceRequest = new WLResourceRequest(url, WLResourceRequest.GET);
    //  var resourceRequest = new WLResourceRequest(url, WLResourceRequest.POST);

      resourceRequest.setQueryParameter("age", age);
      resourceRequest.setHeader("date",date);

      var formParameters ={};
      formParameters.height=height;
      WL.Logger.info("at app.submitRequest - sendFormParameters");
      resourceRequest.sendFormParameters(formParameters).then(
          app.onSuccess,
          app.onFailure);
      SpinnerDialog.show();


    },
    onSuccess: function(response){
      WL.Logger.info("at onSuccess");
      WL.Logger.info(response.responseText);
      SpinnerDialog.hide();
      var resultText = ""
               resultText += "Name = "
               resultText += response.responseJSON["first"] + " " + response.responseJSON["middle"] + " " + response.responseJSON["last"] + "<br>"
               resultText += "Age = " + response.responseJSON["age"] + "<br>"
               resultText += "Height = " + response.responseJSON["height"] + "<br>"
               resultText += "Date = " + response.responseJSON["Date"] + "<br>"

      app.showResult(resultText);
    },
    onFailure: function(response){
      WL.Logger.info("at onFailure");
      WL.Logger.info(response.responseText);
      WL.Logger.info(JSON.stringify(response));
      SpinnerDialog.hide();
      app.showResult("Error:" + JSON.stringify(response));
    },
    showResult:function(content){
      var span = document.getElementById('span_result');
      while( span.firstChild ) {
        span.removeChild( span.firstChild );
      }
      span.appendChild( document.createTextNode(content) );

    }
};
