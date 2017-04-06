;"use strict";
$(function(){

	var $sectionWith_opa = $('.section-with_opa');
	if ($sectionWith_opa && $sectionWith_opa.parent().is(':visible')){
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

	setTdBg();

	var tabs = '.section .section-nav li a, .section .section-aside li a, .section .section-pagination li a';

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
				$(id).fadeIn('fast').css('display', 'block').addClass('active');
			});
		}
	});

	$('.section').each(function(index, el) {
		var $this = $(this);
		var specialBlock = $('<div class="section-special special-shadow"><h2>только сегодня!</h2><p>специальное предложение</p></div>');

		if ($this.hasClass('isSpecial')){
			$this.children('.container').css('position', 'relative').prepend(specialBlock);
			$this.find('.section-special').css('top', -parseInt($this.css('padding-top')) - 15);
		}
	});

	$( ".select" ).selectmenu({
		open: function( event, ui ) {
			$(this).next().css('z-index', 1000);
		},
		close: function( event, ui ) {
			$(this).next().removeAttr('style');
		},
	});
	

	var animSpeed = 200;
	$('.link-slide').on('click', function(event) {
		event.preventDefault();
		var $this = $(this),
				windowWidth = $(window).width();
		var indexBlock = $this.parent().hasClass('section_block') ? ($this.parent().parent().index() + 1) : undefined,
				lengthBlock = $this.closest('.section_wrap').children('div').length,
				oldMb = $this.closest('.section_wrap').nextAll('.section_wrap').find('.section_block').css('margin-bottom');

		if (!$this.attr('data-toggle'))
			$this.attr('data-toggle', 'false');

		if ($this.attr('data-toggle') == 'true'){
			$this.attr('data-toggle', 'false').text('подробнее').parent().next('.link-descr').slideUp(animSpeed);
			if ($this.parent().hasClass('section_block')){
				$this.parent().attr('data-toggle', 'false')
				.animate({'margin-bottom': oldMb}, animSpeed).next().css('transform', 'translate(0, -'+$this.parent().next().innerHeight()+'px)').slideUp(animSpeed/2);
			}
		}	else {
			if ($this.parent().hasClass('section_block')){
				if ($this.attr('data-toggle') == 'false'){
					$this.closest('.section_wrap').find('.link-descr').css('transform', 'translate(0, 0)').slideUp(animSpeed)
						.prev().animate({'margin-bottom': oldMb}, animSpeed).attr('data-toggle', 'false').find('.link').text('подробнее').attr('data-toggle', 'false');
				}

				$this.parent().animate({'margin-bottom': $this.parent().next().css('transform', 'translate(0, -'+($this.parent().next().innerHeight()+25)+'px)').innerHeight()}, animSpeed, function(){
					$(this).next().slideDown(animSpeed/2);
				})
				.attr('data-toggle', 'true');
			}
			$this.attr('data-toggle', 'true').text('свернуть').parent().next('.link-descr').slideDown(animSpeed);
			
		}


		// $this.toggle(function() {
		// 	$this.text('Cвернуть').next().slideDown(400);
		// }, function() {
		// 	$this.text('Подробнее').next().slideUp(400);
		// });
	});


	var oldIndex = 0,
			nextOffset = 60,
			n_nextOffset = 120;
	$('.section .section-pagination li a').on('click', function(event) {
		event.preventDefault();
		if ($(window).width() >= 1024)
			return false;

		var $this = $(this).parent(),
				index = $this.index();

		if (oldIndex < index){
			oldIndex = index;
			$this.css({
				'transform': 'none'
			}).prev().css({
				'transform': 'translate(-'+nextOffset+'px, 0) scale(.8)',
			}).show('fast').prev().css({
				'transform': 'translate(-'+n_nextOffset+'px, 0) scale(.6)',
			}).show('fast').prevAll().css({
				'display': 'none'
			});
			$this.css({
				'transform': 'none'
			}).next().css({
				'transform': 'translate('+nextOffset+'px, 0) scale(.8)',
			}).show('fast').next().css({
				'transform': 'translate('+n_nextOffset+'px, 0) scale(.6)',
			}).show('fast').nextAll().css({
				'display': 'none'
			});
		} else {
			oldIndex = index;
			$this.css({
				'transform': 'none'
			}).next().css({
				'transform': 'translate('+nextOffset+'px, 0) scale(.8)',
			}).show('fast').next().css({
				'transform': 'translate('+n_nextOffset+'px, 0) scale(.6)',
			}).show('fast').nextAll().css({
				'display': 'none'
			});
			$this.css({
				'transform': 'none'
			}).prev().css({
				'transform': 'translate(-'+nextOffset+'px, 0) scale(.8)',
			}).show('fast').prev().css({
				'transform': 'translate(-'+n_nextOffset+'px, 0) scale(.6)',
			}).show('fast').prevAll().css({
				'display': 'none'
			});
		}
		
	});

	if ($(window).width() < 1024){
		var $pagination = $('.section-pagination ul');
		$pagination.children('li').hide();
		$pagination.find('.active').show()
		.next().css({
			'transform': 'translate('+nextOffset+'px, 0) scale(.8)'
		}).show()
		.next().css({
			'transform': 'translate('+n_nextOffset+'px, 0) scale(.6)'
		}).show();

	}

	$('.section-pagination .prev, .section-pagination .next').on('click', function(event) {
		event.preventDefault();
		var $this = $(this);

		if ($this.hasClass('prev')){
			$this.parent().find('.active').prev().children('a').trigger('click');
		} else {
			$this.parent().find('.active').next().children('a').trigger('click');
		}
	});

	$(".main_banner-nav a[href*='#'], .to_search a[href*='#']").mPageScroll2id();

	$('.open-modal').magnificPopup({
		//delegate: 'a',
		removalDelay: 500, //delay removal by X to allow out-animation
		callbacks: {
			beforeOpen: function() {
				this.st.mainClass = this.st.el.attr('data-effect');
			},
			open: function (){
				$('body').css('overflow', 'hidden');
				$(this.items[0].src).closest('.mfp-container').css('overflow', 'auto');
			},
			close: function (){
				$('body').removeAttr('style');
				$(this.items[0].src).closest('.mfp-container').removeAttr('style');
			}
		},
		midClick: true // allow opening popup on middle mouse click. Always set it to true if you don't provide alternative source.
	});

	$('.section-with-scroll').css({
		'max-height': $('.section-aside').height() + 'px',
		'overflow': 'hidden'
	}).perfectScrollbar({
		maxScrollbarLength: 210,
		wheelSpeed: .7
	});


	$('.main_banner-nav nav').attr('data-toggle', false).css('left', -$('.main_banner-nav nav').width());
	$('.main_banner-nav .btn').on('click', function(event) {
		event.preventDefault();
		var $this = $(this),
				$nav = $this.next('nav');
		if ($this.attr('data-toggle') == "true"){
			$nav.animate({'left': -$nav.width()}, 300);
			$this.attr('data-toggle', false);
		}
		else {
			$this.attr('data-toggle', true);
			$nav.animate({'left': 0}, 300);
		}

	});
	
});

var tableColBg = '<div class="table-col-vis"></div>';
function setTdBg(){
	var colTd = $('.section_table tr:last-child .section_table-col').length,
			tableCol = '',
			$table = $('.section_table');
	for (var i = 0; i < colTd; i++) {
		tableCol += tableColBg;
	}
	$table.append(tableCol).find('.table-col-vis').
	css('width', $table.find('tr:first-child td .section_table-col').width()).each(function(index, el) {
		var $this = $(this);
		$this.css('left', $($table.find('tr:first-child td')[index]).position().left + parseInt($($table.find('tr:first-child td')[index]).css('padding-left')));
	});
}