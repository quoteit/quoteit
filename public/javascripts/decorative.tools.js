/**
 * Javascript in charge of dealing with animation and decoration
 */

/*
 * Decorates the user name in the header bar
 */
function decorateUserName() {
	
	$('#userName').mouseover(function() {
	
		$(this).css('color', 'aquamarine');
	}); 
	$('#userName').mouseout(function() {

		$(this).css('color', '#348BFF');
	});
}

/*
 * Adds decoration to user's quotes page
 */
function decorateUserPage(userIn) {
	
	// Add OnClick event and some decoration
	if (userIn) {

		$('#userQuotesWrapper a').mouseover(function() {

			$(this).css('color', 'yellow');
		}); 
		$('#userQuotesWrapper a').mouseout(function() {
	
			$(this).css('color', '#D6C033');
		});
		
		// If there's a user, then add tooltip text
		$('#userQuotesWrapper label').attr('title', 'Delete?');
	}
	
	$('#userQuotesWrapper span').mouseover(function() {

		$(this).css('color', 'aquamarine');
	}); 
	$('#userQuotesWrapper span').mouseout(function() {

		$(this).css('color', '#6699CC');
	});
}
 /*
  * Decorates main page
  */
 function decorateMain() {
	
	$('#otherQuotesTitle').mouseover(function() {

		$('#otherQuotesTitle').css('color', 'aquamarine');
	}); 
	
	$('#otherQuotesTitle').mouseout(function() {

		$('#otherQuotesTitle').css('color', 'transparent');
	});
	
	$('.topQuotesTitle').textillate(
		{ 
			in : {
	            effect: 'flash',
	            delay: 100
	        },
	        out : {
	            effect: 'fadeIn',
	            delay: 100
	        },
	        loop: true
	    }
	);
	
	$('#textarea').typetype('Welcome!', { e : 0.2, t : 150 })
		.delay(1000)
		.backspace(9, { t : 200 })
		.typetype('Quote It!', { e : 0.2, t : 150 });
}

/*
 * Animates the deletion of a quote
 */
function animateDeletion(id) {
	
	// Animate the deletion					
	$('#V' + id).textillate({
		loop : false,
		in : {
			effect : 'hinge',
			shuffle : true
		}
	});
	$('#A' + id).textillate({
		loop : false,
		in : {
			effect : 'hinge',
			shuffle : true
		}
	});
	$('#T' + id).textillate({
		loop : false,
		in : {
			delayScale: 0.5,
			effect : 'hinge',
			shuffle : true
		},
		callback : function() {
			updateCurrentPage();
		}
	});
}

/*
 * Adds some decoration and animation to quotes
 */
function decorateQuotes(userIn) {

	if (userIn) {

		$('#topQuotesWrapper a').mouseover(function() {

			$(this).css('color', 'yellow');
		});
		$('#topQuotesWrapper a').mouseout(function() {

			$(this).css('color', '#D6C033');
		});
		$('#otherQuotesBody a').mouseover(function() {

			$(this).css('color', 'yellow');
		});
		$('#otherQuotesBody a').mouseout(function() {

			$(this).css('color', '#D6C033');
		});
	}

	$('#topQuotesWrapper span').mouseover(function() {

		$(this).css('color', 'aquamarine');
	});
	$('#topQuotesWrapper span').mouseout(function() {

		$(this).css('color', '#6699CC');
	});
	$('#otherQuotesBody span').mouseover(function() {

		$(this).css('color', 'aquamarine');
	});
	$('#otherQuotesBody span').mouseout(function() {

		$(this).css('color', '#6699CC');
	});
}