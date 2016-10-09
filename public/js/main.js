$('document').ready(function() {
	window.setInterval(function() {
		$.get('get_browsing_data', function(data) {
			JSON.parse(data).forEach(function(browsingDataRow) {
				$('#browsing-list').empty().append('<div>' +
					browsingDataRow.url + ' ' + (new Date(browsingDataRow.date).toLocaleString()) +
				'</div>');
			});
		});
	}, 500);
});
