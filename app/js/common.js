;"use sctict";
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

	$('.section').each(function(index, el) {
		var $this = $(this);
		var specialBlock = `
			<div class="section-special special-shadow">
				<h2>только сегодня!</h2>
				<p>специальное предложение</p>
			</div>
		`;
		if ($this.hasClass('isSpecial')){
			$this.children('.container').css('position', 'relative').prepend(specialBlock);
			$this.find('.section-special').css('top', -parseInt($this.css('padding-top')) - 15);
		}
	});
		
});
