/**
* Copyright 2016 IBM Corp.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

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
        var birthdate = document.getElementById("birthdate").value;
        var height = document.getElementById("height").value;

        //JavaAdapter expects first, middle and last to be part of the POST URL path.
        var url = "/adapters/JavaAdapter/users/"+first+"/"+middle+"/"+last;
        var resourceRequest = new WLResourceRequest(url, WLResourceRequest.POST);

        //JavaAdapter expects age to be a query parameter.
        resourceRequest.setQueryParameter("age", age);

        //JavaAdapter expects birthdate to be a header parameter.
        resourceRequest.setHeader("birthdate",birthdate);

        //JavaAdapter expects height to be a form parameter.
        var formParameters = {};
        formParameters.height = height;

        resourceRequest.sendFormParameters(formParameters).then(app.onSuccess, app.onFailure);
        window.plugins.spinnerDialog.show(null,null,function(){/*no callback - force the use of SpinnerDialog.hide() */ });
    },

    onSuccess: function(response) {
        WL.Logger.info("Success: " + response.responseText);
        window.plugins.spinnerDialog.hide();

        var resultText = "Success: " + "<br>";
        resultText += "Name: ";
        resultText += response.responseJSON.first + " " + response.responseJSON.middle + " " + response.responseJSON.last + "<br>";
        resultText += "Age: " + response.responseJSON.age + "<br>";
        resultText += "Height: " + response.responseJSON.height + "<br>";
        resultText += "Birthdate: " + response.responseJSON.birthdate + "<br>";

        document.getElementById("div_result").innerHTML= resultText;
    },

    onFailure: function(response) {

        WL.Logger.info("Failure: " + JSON.stringify(response));
        SpinnerDialog.hide();

        var resultText = "Failure: " + JSON.stringify(response);

        document.getElementById("div_result").innerHTML = resultText;
    }
};
