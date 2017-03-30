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
    if (this.value.match(/[^.\d]+/g)) {
        this.value = this.value.replace(/[^.\d]+/g, '');
    }
	});

	$('.section .btn').on('click', function(event) {
		event.preventDefault();
		var $this = $(this);
		var id = $this.attr('href');
		if (!$this.hasClass('active')){
			$('.section .btn').removeClass('active');

			$this.addClass('active')
			.closest('.row').parent().find('.section-cart-wrap.active').fadeOut('fast', function(){
				$(this).removeClass('active');
				$(id).fadeIn('fast').removeAttr('style').addClass('active');
			});

		}
	});

	$(tabs).on('click', function(event) {
		event.preventDefault();
		var $this = $(this).parent();
		var id = $(this).attr('href');
		if (!$this.hasClass('active')){
			$this.parent().children('li').removeClass('active');
			$this.addClass('active')
			.closest('.row').find('.section-cart-wrap.active').fadeOut('fast', function(){
				$(this).removeClass('active');
				$(id).fadeIn('fast').removeAttr('style').addClass('active');
			});
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
	

	$('.link-slide').on('click', function(event) {
		event.preventDefault();
		var $this = $(this),
				windowWidth = $(window).width();
		var indexBlock = $this.parent().hasClass('section_block') ? ($this.parent().parent().index() + 1) : undefined,
				lengthBlock = $this.closest('.section_wrap').children('div').length;

		if (!$this.attr('data-toggle'))
			$this.attr('data-toggle', 'false');

		if ($this.attr('data-toggle') == 'true'){
			$this.attr('data-toggle', 'false').text('подробнее').next().slideUp(400);
			if ($this.parent().hasClass('section_block')){
				$this.parent().attr('data-toggle', 'false')
				.animate({'margin-bottom': 10}, 400).next().css('transform', 'translate(0, -'+$this.parent().next().innerHeight()+'px)').slideUp(400);
			}
		}	else {
			if ($this.parent().hasClass('section_block')){
				if ($this.attr('data-toggle') == 'false'){
					$this.closest('.section_wrap').find('.link-descr').css('transform', 'translate(0, 0)').slideUp(400)
						.prev().animate({'margin-bottom': 10}, 400).attr('data-toggle', 'false').find('.link').text('подробнее').attr('data-toggle', 'false');
				}

				$this.parent().animate({'margin-bottom': $this.parent().next().css('transform', 'translate(0, -'+($this.parent().next().innerHeight()+25)+'px)').innerHeight()}, 400, function(){
					$(this).next().slideDown(200);
				})
				.attr('data-toggle', 'true');
			}
			$this.attr('data-toggle', 'true').text('свернуть').next().slideDown(400);
			
		}


		// $this.toggle(function() {
		// 	$this.text('Cвернуть').next().slideDown(400);
		// }, function() {
		// 	$this.text('Подробнее').next().slideUp(400);
		// });
	});
	
});
