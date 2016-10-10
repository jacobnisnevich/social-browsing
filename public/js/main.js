$('document').ready(function() {
	var currentBrowsing = {};

	window.setInterval(function() {
		$.get('get_browsing_data', function(data) {
			var newBrowsing = JSON.parse(data);

			if (currentBrowsing.id != newBrowsing.id)) {
				currentBrowsing = newBrowsing;
				$('#browsing-list').empty();

				$.each(newBrowsing.data, function(browsingDataUsername, browsingDataRow) {
					createBrowsingItem(browsingDataRow.url, browsingDataUsername, browsingDataRow.date);
				});
			}
		});
	}, 500);
});

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
