/**
* Copyright 2015 IBM Corp.
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

function loadFeeds(){
	busyIndicator.show();
	
	/*
	 * The REST API works with all adapters and external resources, and is supported on the following hybrid environments: 
	 * iOS, Android, Windows Phone 8, Windows 8. 
	 * If your application supports other hybrid environments, see the tutorial for MobileFirst 6.3.
	 */
	var resourceRequest = new WLResourceRequest("/adapters/RSSReader/getFeedFiltered", WLResourceRequest.GET);
	resourceRequest.setQueryParameter("params", "['MobileFirst_Platform']");
	resourceRequest.send().then(
			loadFeedsSuccess,
			loadFeedsFailure
	);
}


function loadFeedsSuccess(result){
	WL.Logger.debug("Feed retrieve success");
	busyIndicator.hide();
	if (result.responseJSON.Items.length>0) 
		displayFeeds(result.responseJSON.Items);
	else 
		loadFeedsFailure();
}

function loadFeedsFailure(result){
	WL.Logger.error("Feed retrieve failure");
	busyIndicator.hide();
	WL.SimpleDialog.show("Engadget Reader", "Service not available. Try again later.", 
			[{
				text : 'Reload',
				handler : WL.Client.reloadApp 
			},
			{
				text: 'Close',
				handler : function() {}
			}]
		);
}

function displayFeeds(items){
	var ul = $('#itemsList');
	for (var i = 0; i < items.length; i++) {
		var li = $('<li/>').text(items[i].title);
		var pubDate = $('<div/>', {
			'class': 'pubDate'
		}).text(items[i].pubDate);

		li.append(pubDate);
		
		ul.append(li);
	}
}