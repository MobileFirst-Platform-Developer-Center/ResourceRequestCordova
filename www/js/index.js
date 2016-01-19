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
      var second = document.getElementById("second").value;
      var third = document.getElementById("third").value;
      var age = document.getElementById("age").value;
      var date = document.getElementById("date").value;
      var height = document.getElementById("height").value;

      var url = "/adapters/JavaAdapter/users/"+first+"/"+second+"/"+third;
      var resourceRequest = new WLResourceRequest(url, WLResourceRequest.POST);

      resourceRequest.setQueryParameter("age", age);
      resourceRequest.setHeader("date",date);

      var formParameters ={};
      formParameters.height=height;
      WL.Logger.info("at app.submitRequest - sendFormParameters");
      resourceRequest.sendFormParameters(formParameters).then(
          app.onSuccess,
          app.onFailure);
    },
    onSuccess: function(response){
      WL.Logger.info("at onSuccess");
      app.showResult("Success " + JSON.stringify(response.responseJSON));
    },
    onFailure: function(response){
      WL.Logger.info("at onFailure");
      app.showResult("Error " + JSON.stringify(response.responseJSON));
    },
    showResult:function(content){
      var span = document.getElementById('span_result');
      while( span.firstChild ) {
        span.removeChild( span.firstChild );
      }
      span.appendChild( document.createTextNode(content) );
    }
};
