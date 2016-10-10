$('document').ready(function() {
	var currentBrowsing = {};

	window.setInterval(function() {
		$.get('get_browsing_data', function(data) {
			var newBrowsing = JSON.parse(data);

			if (!isBrowsingSame(currentBrowsing, newBrowsing)) {
				currentBrowsing = newBrowsing;
				$('#browsing-list').empty();

				$.each(newBrowsing, function(browsingDataUsername, browsingDataRow) {
					createBrowsingItem(browsingDataRow.url, browsingDataUsername, browsingDataRow.date);
				});
			}
		});
	}, 500);
});

function isBrowsingSame(currentBrowsing, newBrowsing) {
	var same = true;

	$.each(newBrowsing, function(username, browsingData) {
		if (currentBrowsing[username].url != newBrowsing[username].url) {	
			same = false;
		}
	});

	return same;
}

function createBrowsingItem(url, username, date) {
	$('#browsing-list').append(
		'<div class="browsing-item">' + 
			'<div class="browsing-iframe-container">' + 
				'<iframe src="' + url + '" target="_parent"></iframe>' +  
			'</div>' + 
			'<div class="browsing-description-container">' + 
				'<div class="browsing-username">' + username + '</div>' + 
				'<div class="browsing-timestamp">' + (new Date(parseInt(date)).toLocaleString()) + '</div>' + 
			'</div>' + 
		'</div>'
	);
}