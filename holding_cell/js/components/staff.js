function Staff($el) {
	
	function staffPopup() {
		$(this).closest('.component-row').addClass('zindexTop');
		var staffID = $(this).attr('data-staff');
		$el.find('.staff-popup[data-staff="'+staffID+'"]').addClass('openStaff');
		$('body').addClass('popupOpen');
	}

	function closeStaffPopup() {
		$el.find('.staff-popup').removeClass('openStaff');
		$(this).closest('.component-row').removeClass('zindexTop');
		$('body').removeClass('popupOpen');
	}

	function keyCommands() {

		//key commands for slideshow
		$(document).keydown(function(e){
		    if (e.keyCode == 27) { 
				$el.find('.openStaff').removeClass('openStaff');
				$('body').find('.zindexTop').removeClass('zindexTop');
				$('body').removeClass('popupOpen');
			}
		});
		
	}

	this.init = function ($el) {
		$el = $el;
		$el.find('.staff-content-item').on('click', staffPopup);
		$el.find('.closeStaff').on('click', closeStaffPopup);
		keyCommands();
	
		return this;
	}


	return this.init($el);
}

export default Staff;