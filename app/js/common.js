"use sctict";
$(function(){
	$('.section .btn').on('click', function(event) {
		event.preventDefault();
		var $this = $(this);
		if (!$this.hasClass('active')){
			$('.section .btn').removeClass('active');
			$this.addClass('active')
			.closest('.row').next().fadeOut('fast').fadeIn('fast');
		}
	});
});
