$('document').ready(function() {
	window.setInterval(function() {
		$.get('get_browsing_data', function(data) {
			$('#browsing-list').empty();
			$.each(JSON.parse(data), (function(browsingDataUsername, browsingDataRow) {
				createBrowsingItem(browsingDataRow.url, browsingDataUsername, browsingDataRow.date);
			});
		});
	}, 500);
});

function createBrowsingItem(url, username, date) {
	$('#browsing-list').append(
		'<div class="browsing-item">' + 
			'<div class="browsing-iframe-container">' + url +  
			'</div>' + 
			'<div class="browsing-description-container">' + 
				'<div class="browsing-username">' + '</div>' + 
				'<div class="browsing-timestamp">' + (new Date(parseInt(date)).toLocaleString()) + '</div>' + 
			'</div>' + 
		'</div>'
	);
}