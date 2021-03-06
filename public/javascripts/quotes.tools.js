/**
 * Quotes Handler js
 */

/*
 * Retrieves and show the quotes stored in the DB
 */
function fillQuotes(userIn) {
	
	$.getJSON('/quotes/quotelist', function(data) {

		// Clear data
		clearQuotesData();

		// Stick our quote data array into a quotelist variable in the global object
		quoteListData = data;
		var idx = 1;

		// For each item in our JSON, add a table row and cells to the content string
		$.each(data, function() {
			
			text = this.quote;
			author = this.user;
			votes = this.votes;
			id = this._id;

			// Fill the first three
			if (idx <= 3) {
	
				// Create Top Quotes HTML elements
				wrapperName = 'topQuotesWrapper';
				
				appendQuote(wrapperName, id, votes, text, author);
				
				idx++;
			} else {
				
				// Create Other Quotes HTML elements					
				wrapperName = 'otherQuotesBody';
				
				appendQuote(wrapperName, id, votes, text, author);
			}
			
			if (userIn) {
				
				// If there's a user, then add tooltip text
				$('#T' + id).attr('title', 'Delete?');
			}			
		});
		
		// Add some decoration
		decorateQuotes(userIn);
		
		// Add click events
		addOnClickFunctions(userIn);
	});
};

/*
 * Delete a quote
 */
function deleteQuote(event) {

    event.preventDefault();

	var id = $(this).attr('rel');

	$.getJSON('/quotes/quote/' + id, function(data) {
		
		if (data.user === $('#userName').text()) {
		
		    // Pop up a confirmation dialog
		    var confirmation = confirm('Are you sure you want to delete this quote?');
		
		    // Check and make sure the user confirmed
		    if (confirmation) {
		
		        // If they did, do our delete
		        $.ajax({
		            type: 'DELETE',
		            url: '/quotes/deletequote/' + id
		        }).done(function( response ) {
		
		            // Check for a successful (blank) response
		            if (response.msg === '') {
		            }
		            else {
		                alert('Error: ' + response.msg);
		            }
		
					// Give some animation to the deleted quote
					animateDeletion(id);
		        });
		
		    }
		    else {
		
		        // If they said no to the confirm, do nothing
		        return false;
		    }
	    } else {
	    	
	    	alert('You can only delete your own quotes!');
	    }
	});
}

function showUserPageByName(name) {
	
	userName = name;
	
	$.getJSON('/quotes/userquotes/' + userName, function(data) {
		
		// Clear data
		clearQuotesData();
		
		$.each(data, function() {
		
			votes = this.votes;
			text = this.quote;
			author = this.user;
			id = this._id;
			
			// Create User Quotes HTML elements					
			wrapperName = 'userQuotesWrapper';
			
			appendQuote(wrapperName, id, votes, text, author);
		});
		
		if (userName === $('#userName').text()) {
			
			$('#userQuotesTitle').text('✩ MY QUOTES ✩');
		} else {
			
			$('#userQuotesTitle').text('✩ ' + userName + '´s QUOTES ✩');
		}
		
		// Add OnClick event and some decoration
		decorateUserPage(userIn);
		
		if (userIn) {
			
			$('#userQuotesWrapper a').on('click', voteUp);
			
			$('#userQuotesWrapper label').on('click', deleteQuote);
		}
		
		$('#mainWrapper').hide();
		$('#userWrapper').show();
	});
}

/*
 * Clears divs with quotes data
 */
function clearQuotesData() {
	
	document.getElementById('topQuotesWrapper').innerHTML='';
	document.getElementById('otherQuotesBody').innerHTML='';
	document.getElementById('userQuotesWrapper').innerHTML='';
}

/*
 * Adds quote data to div
 */
function appendQuote(wrapperName, id, votes, text, author) {
	
	$('#' + wrapperName).append('<fieldset><a id="V' + id + '" class="votes" href="#" rel=' + 
		id + '>✩ ' + votes + ' ✩</a>' + '<label id="T' + id + '" class="topQuoteText" rel=' + id + '>' + 
		text + '</label><br><span id="A' + id + '" class="author" rel="' + author + '" href="#">' + author + 
		'</label></fieldset>');
}

/*
 * Add on click functions to quotes
 */
function addOnClickFunctions(userIn) {
	
	$('#topQuotesWrapper span').on('click', showUserPage);
	$('#otherQuotesBody span').on('click', showUserPage);

	if (userIn) {

		$('#topQuotesWrapper a').on('click', voteUp);
		$('#otherQuotesBody a').on('click', voteUp);

		$('#topQuotesWrapper label').on('click', deleteQuote);
		$('#otherQuotesBody label').on('click', deleteQuote);
	}
}

/*
 * Adds a new quote storing it into the DB
 */
function sendNewQuote(event) {
	
	event.preventDefault();

	// Validate if some text was found
	if ($('#newQuoteText').val()) {

		// If there is, compile all quote info into one object
		var newQuote = {
			'quote' : $('#newQuoteText').val(),
			'user' : $('#newQuoteAuthor option:selected').text(),
			'votes' : 0
		};

		// Use AJAX to post the object to our adduser service
		$.ajax({
			type : 'POST',
			data : newQuote,
			url : '/quotes/addquote',
			dataType : 'JSON'
		}).done(function(response) {

			// Check for successful (blank) response
			if (response.msg === '') {

				// Send notification email to user quoted
				sendNotificationEmail($('#newQuoteAuthor').val(), $('#userName').text(), 
					$('#newQuoteText').val());
				
				// Clear the form inputs
				$('#newQuoteText').val('');

				// Update quote list
				fillQuotes(userIn);

			} else {

				// If something goes wrong, alert the error message that our service returned
				alert('Error: ' + response.msg);

			}
		});
	} else {
		
		// If no text was found, then inform
		alert('Please add some text');
		return false;
	}
}