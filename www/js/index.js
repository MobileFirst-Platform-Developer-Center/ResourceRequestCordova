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
      //JavaAdapter expects first, middle and last  to be part of the POST URL path
      var url = "/adapters/JavaAdapter/users/"+first+"/"+middle+"/"+last;
      var resourceRequest = new WLResourceRequest(url, WLResourceRequest.POST);
      //JavaAdapter expects age to be a query parameter
      resourceRequest.setQueryParameter("age", age);
      //JavaAdapter expects date to be a header parameter
      resourceRequest.setHeader("date",date);
      //JavaAdapter expects height to be a form parameter
      var formParameters ={};
      formParameters.height=height;
      WL.Logger.info("at app.submitRequest - sendFormParameters");
      resourceRequest.sendFormParameters(formParameters).then(
         app.onSuccess,
         app.onFailure);
      SpinnerDialog.show(null,null,function(){/*no callback - force the use of SpinnerDialog.hide() */ });
    },
    onSuccess: function(response){
      WL.Logger.info("at onSuccess");
      WL.Logger.info(response.responseText);
      SpinnerDialog.hide();
      var resultText = ""
               resultText += "Name = "
               resultText += response.responseJSON["first"] + " " + response.responseJSON["middle"] + " " + response.responseJSON["last"] + "\n"
               resultText += "Age = " + response.responseJSON["age"] + "\n"
               resultText += "Height = " + response.responseJSON["height"] + "\n"
               resultText += "Date = " + response.responseJSON["date"] + "\n"

      navigator.notification.alert(resultText, function(){}, "Success");
    },
    onFailure: function(response){
      WL.Logger.info("at onFailure");
      WL.Logger.info(JSON.stringify(response));
      SpinnerDialog.hide();
      navigator.notification.alert(JSON.stringify(response), function(){}, "Fail");
    }
};
