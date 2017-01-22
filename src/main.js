var clickHandler = function(e) {
	chrome.storage.sync.get({
    	host: 'localhost'
  	}, function(items) {
  	
		$.ajax({
			method: "POST",
			url: items.host+'/transmission/rpc',
			data: JSON.stringify({
				method: "session-get"
			}),
			error: function(request, status, error){
				var sessionHeader = request.getResponseHeader("X-Transmission-Session-Id");
				//function

				$.ajax({
					method: "POST",
					url: items.host+'/transmission/rpc',
					beforeSend: function(request) {
	    				request.setRequestHeader("X-Transmission-Session-Id", sessionHeader);
	  				},
					data: JSON.stringify({
						arguments: {
							'download-dir': "/downloads/complete",
							filename: e.linkUrl,
							paused: false
						},
						method: "torrent-add"
					}),
					contentType: "application/json",
				}).done(function(data){
					alert(data.result);
				});

				//function
			},
			contentType: "application/json"
		});
	});
}

chrome.runtime.onInstalled.addListener(function(){
	chrome.contextMenus.create({
		id: "232423",
		title: "conterium",
		contexts: ["link"]
	});
});

chrome.runtime.onInstalled.addListener(function(){
	chrome.contextMenus.create({
		id: "232424",
		title: "Add to transmission",
		contexts: ["link"],
		parentId: "232423"
	});
});

chrome.contextMenus.onClicked.addListener(clickHandler);