// document.addEventListener('DOMContentLoaded', function() {
jQuery(document).ready(function($) {


	// Global Variables
	// ----------------------------------------------------------------------------
	// var elBody = document.body;


	// Fratelli Message
	// ----------------------------------------------------------------------------
	function message() {

		var $messageOverlay = $('#modal-message'),
			$messageClose   = $('#message-close');

		$messageClose.on('click', function(e) {

			$messageOverlay.removeClass('visible');

			e.preventDefault();

		});

		$messageOverlay.on('click', function(e) {

			if ( !$(e.target).closest('article.message').length ) {

				if( $messageOverlay.hasClass('visible') ) {

					$messageOverlay.removeClass('visible');

				}

			}

		});

	}


	// Mailchimp AJAX Submission
	// ----------------------------------------------------------------------------
	function mailchimpAJAX() {

		var emailfilter     = /^\w+[\+\.\w-]*@([\w-]+\.)*\w+[\w-]*\.([a-z]{2,4}|\d+)$/i,
			$modalButton    = $('#launch_modal'),
			$modalOverlay   = $('#modal-mailchimp'),
			$signupArticle  = $('#mc_embed_signup'),
			$mailchimpForm  = $('#mc-embedded-subscribe-form'),
			$mailchimpInput = $('#mce-EMAIL'),
			$responseText   = $('#mce-response-text');

		// reveal signup modal on button click
		$modalButton.on('click', function(e) {

			$modalOverlay.addClass('visible');

			e.preventDefault();

		});

		// hide signup modal on click outside of signup article
		$modalOverlay.on('click', function(e) {

			if ( !$(e.target).closest('#mc_embed_signup').length ) {

				if( $modalOverlay.hasClass('visible') ) {

					$modalOverlay.removeClass('visible');
					$signupArticle.removeClass('success');

				}

			}

		});

		// as long as our email input has a value...
		if ($mailchimpForm.length > 0) {

			$('#mc-embedded-subscribe-form').submit(function(e) {

				var $this   = $(this),
					isValid = true;

				// we may have added an error class... so let's go ahead and remove it
				$('.error').removeClass('error');

				// email ID validation
				if ( emailfilter.test( $mailchimpInput.val() ) == false ) {
					$mailchimpInput.addClass('error');
					isValid = false;
				}

				// if email is valid, submit form through ajax
				if (isValid) {

					$.ajax({

						type: 'GET',
						url:  $this.attr('action'),
						data: $this.serialize(),
						dataType: 'json',
						contentType: 'application/json; charset=utf-8',
						error: function(jqXHR, textStatus, errorThrown) {
							alert('Could not connect to the registration server. Please reload the page and try again.');
						},

						success: function(data) {

							// it worked, so hide form and display thank-you message.
							$responseText.html(data.msg);
							$signupArticle.addClass('success');
							$this[0].reset();

						}

					});

				}

				return false;

			});

		}

	}


	// Initialize Primary Functions
	// ----------------------------------------------------------------------------
	mailchimpAJAX();
	message();


}); // end jQuery
// }, false);