$('document').ready(function() {
	var usernameUrlMapping = {};

	window.setInterval(function() {
		$.get('get_browsing_data', function(data) {
			JSON.parse(data).forEach(function(browsingDataRow) {
				$('#browsing-list').empty();
				if (usernameUrlMapping[browsingDataRow.username] != browsingDataRow.url) {
					createBrowsingItem(browsingDataRow.url, browsingDataRow.username, browsingDataRow.date);
					usernameUrlMapping[browsingDataRow.username] = browsingDataRow.url;
				}
			});
		});
	}, 500);
});

function createBrowsingItem(url, username, date) {
	$('#browsing-list').append(
		'<div class="browsing-item">' + 
			'<div class="browsing-iframe-container">' + 
				'<iframe src="' + url + '" target="_blank"></iframe>' + 
			'</div>' + 
			'<div class="browsing-description-container">' + 
				'<div class="browsing-username">' + '</div>' + 
				'<div class="browsing-timestamp">' + (new Date(parseInt(browsingDataRow.date)).toLocaleString()) + '</div>' + 
			'</div>' + 
		'</div>'
	);
}