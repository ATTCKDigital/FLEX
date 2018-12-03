
function Downloads($el) {
	

	function openPopUp(e) {
		e.preventDefault();
		//which pdf
		var pdf = $(this).find('.pdf').attr('data-pdf');
		var pdfTitle = $(this).attr('data-download-title');

		//open the popup
		$(this).closest('.component-row').addClass('zindexTop');
		$('body').addClass('popupOpen');
		
		//show the message
		$el.find('.gate-message').show();
		
		//change the value of the pdf title
		$('input[name="pdf_title"]').val(pdfTitle).change();

		//after the form is submitted, display a link to download the pdf
		window.addEventListener('message', event => {
		   if(event.data.type === 'hsFormCallback' && event.data.eventName === 'onFormSubmitted') {
		       $el.find('.complete-message').html('<a href="'+pdf+'" target="_blank" class="button">Download</a>')
		       $el.find('.gate-message').hide();
		       $el.addClass('downloaded');
		   }
		});			
	}

	function closePopUp(e) {
		$(this).closest('.component-row').removeClass('zindexTop');
		$('body').removeClass('popupOpen');
		$el.find('.complete-message').html('')
		$el.find('.gate-message').hide();

		//after closing the form, create a new form
		hbspt.forms.create({
			portalId: "4828910",
			formId: "b19fee4b-16d3-4cdf-ac55-98f6bb0e989d",
			target: '.hubspot-form',
			onFormReady($form, ctx){
				var titleField = document.getElementsByName('pdf_title')[0];
				titleField.value = 'placeholder';
			}
		});

	}


	function keyCommands() {

		//key commands for slideshow
		$(document).keydown(function(e){
		    if (e.keyCode == 27) { 
				$('body').find('.component-row').removeClass('zindexTop');
				$('body').removeClass('popupOpen');
				$el.find('.complete-message').html('')
				$el.find('.gate-message').hide();

				//after closing the form, create a new form
				hbspt.forms.create({
					portalId: "4828910",
					formId: "b19fee4b-16d3-4cdf-ac55-98f6bb0e989d",
					target: '.hubspot-form',
					onFormReady($form, ctx){
						var titleField = document.getElementsByName('pdf_title')[0];
						titleField.value = 'placeholder';
					}
				});
		    }
		});
		
	}

	function pageLoad() {
		hbspt.forms.create({
			portalId: "4828910",
			formId: "b19fee4b-16d3-4cdf-ac55-98f6bb0e989d",
			target: '.hubspot-form',
			onFormReady($form, ctx){
				var titleField = document.getElementsByName('pdf_title')[0];
				titleField.value = 'placeholder';
			}
		});
	}

	this.init = function ($el) {
		$el = $el;
		$el.find('.openPDF').on('click', openPopUp);
		$el.find('.closeForm').on('click', closePopUp);
		keyCommands();
		pageLoad();
	
		return this;
	}

	return this.init($el);
}

export default Downloads;