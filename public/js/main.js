$('document').ready(function() {
	var usernameUrlMapping = {};

	window.setInterval(function() {
		$.get('get_browsing_data', function(data) {
			var i = 0;
			JSON.parse(data).forEach(function(browsingDataRow) {
				if (usernameUrlMapping[browsingDataRow.username] != browsingDataRow.url) {
					if (i == 0) {
						$('#browsing-list').empty();
					}
					createBrowsingItem(browsingDataRow.url, browsingDataRow.username, browsingDataRow.date);
					usernameUrlMapping[browsingDataRow.username] = browsingDataRow.url;
				}
				i++;
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
				'<div class="browsing-timestamp">' + (new Date(parseInt(date.date)).toLocaleString()) + '</div>' + 
			'</div>' + 
		'</div>'
	);
}