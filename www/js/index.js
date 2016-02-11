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
    app.initialize();
}

var app = {
    // Application Constructor
    initialize: function() {
      this.bindEvents();
    },
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.getElementById("btn_submit").addEventListener('click', app.submitRequest);
    },

    submitRequest:function() {
        var first = document.getElementById("first").value;
        var middle = document.getElementById("middle").value;
        var last = document.getElementById("last").value;
        var age = document.getElementById("age").value;
        var date = document.getElementById("date").value;
        var height = document.getElementById("height").value;

        //JavaAdapter expects first, middle and last to be part of the POST URL path.
        var url = "/adapters/JavaAdapter/users/"+first+"/"+middle+"/"+last;
        var resourceRequest = new WLResourceRequest(url, WLResourceRequest.POST);

        //JavaAdapter expects age to be a query parameter.
        resourceRequest.setQueryParameter("age", age);

        //JavaAdapter expects date to be a header parameter.
        resourceRequest.setHeader("date",date);

        //JavaAdapter expects height to be a form parameter.
        var formParameters = {};
        formParameters.height = height;

        resourceRequest.sendFormParameters(formParameters).then(app.onSuccess, app.onFailure);
        SpinnerDialog.show(null,null,function(){/*no callback - force the use of SpinnerDialog.hide() */ });
    },

    onSuccess: function(response) {
        WL.Logger.info("Success: " + response.responseText);
        SpinnerDialog.hide();

        var resultText = "Success"+ "<br>";
        resultText += "Name: ";
        resultText += response.responseJSON.first + " " + response.responseJSON.middle + " " + response.responseJSON.last + "<br>";
        resultText += "Age: " + response.responseJSON.age + "<br>";
        resultText += "Height: " + response.responseJSON.height + "<br>";
        resultText += "Date: " + response.responseJSON.Date + "<br>";

        document.getElementById("div_result").innerHTML= resultText;
    },

    onFailure: function(response) {

        WL.Logger.info("Failure: " + JSON.stringify(response));
        SpinnerDialog.hide();

        var resultText = "FAIL<br>"+response.errorMsg;

        document.getElementById("div_result").innerHTML= resultText;
    }
};
