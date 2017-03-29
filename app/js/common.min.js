;"use sctict";
$(function(){

	var $sectionWith_opa = $('.section-with_opa');
	if ($sectionWith_opa){
		var startOpasity = 0.35, 
				persOpa = +((1 - startOpasity)/$sectionWith_opa.length).toFixed(3),
				curOpacity = 0;
		$sectionWith_opa.each(function(index, el) {
			var $this = $(this);
			curOpacity += index == 0 ? startOpasity : persOpa;
			if (index == $sectionWith_opa.length - 1)
				curOpacity = 1;
			$this.children('p').css('opacity', curOpacity);
		});
	}

	var tabs = `.section .section-nav li a, 
	.section .section-aside li a, 
	.section .section-pagination li a`;

	$(".phone").mask("+7 (999) 999-99-99");

	$('.number').bind("change keyup input click", function() {
    if (this.value.match(/[^0-9]/g)) {
        this.value = this.value.replace(/[^0-9]/g, '');
    }
	});

	$('.section .btn').on('click', function(event) {
		event.preventDefault();
		var $this = $(this);
		if (!$this.hasClass('active')){
			$('.section .btn').removeClass('active');
			$this.addClass('active')
			.closest('.row').next().fadeOut('fast').fadeIn('fast');
		}
	});

	$(tabs).on('click', function(event) {
		event.preventDefault();
		var $this = $(this).parent();
		if (!$this.hasClass('active')){
			$this.parent().children('li').removeClass('active');
			$this.addClass('active')
			.closest('.row').find('.section-cart-wrap').fadeOut('fast').fadeIn('fast');
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

	$( ".select" ).selectmenu();
	
});
