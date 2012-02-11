var as_mediabox = function () {

	var init = function () {
		$('.mediabox').click(function () {
			add(this);
		});
	}
	
	var mediaType = 0;
	var mediaUrl = 0;
	var scribdPubKey = 0;
	
	var setScribdPubKey = function (a) {
		scribdPubKey =a;
	}
	
	var add = function (link) {
		mediaType = $(link).attr("class");
		mediaUrl = $(link).attr("href");
		$("<div/>").attr("id","as_blackPage").hide().prependTo('body');
		$('#as_blackPage').append('<div class="as_loading" />');
		var windowHeight = $(window).height();
		$('.as_loading').css('top', (windowHeight/2)- 40).append('<div class="as_ball" />').append('<div class="as_ball1" />');
		$('#as_blackPage').click(remove).fadeIn(600).after('<div></div>').next('div').attr("id","as_mediaBox").addClass(mediaType);
		$('#as_mediaBox').wrap('<div class="as_mediaContainer" />').wrap('<div class="as_mediaBorder" />');
		$('.as_mediaContainer').hide();
		
		//Specially written for scribd
		if ($('#as_mediaBox').hasClass("scribd")) {
			$.getScript('http://www.scribd.com/javascripts/scribd_api.js', function () {
				size();
				var mediaBoxHeight = $('#as_mediaBox').height();
				var mediaBoxWidth = $('#as_mediaBox').width();
				var scribd_doc = scribd.Document.getDocFromUrl(mediaUrl, scribdPubKey);
				scribd_doc.addParam('jsapi_version', 2);
				scribd_doc.addParam('height', mediaBoxHeight);
				scribd_doc.addParam('width', mediaBoxWidth);
				scribd_doc.write('as_mediaBox');
				scribd_doc.addEventListener('docReady', function () {
					$('.as_loading').fadeOut(200);
					$('.as_mediaContainer').delay(200).fadeIn(800);
				});
			});
		}
	}
	
	var remove = function () {
		$('.as_mediaContainer').fadeOut(600, function () {
			$(this).remove();
		});
		$('#as_blackPage').delay(400).fadeOut(800, function () {
			$(this).remove();
		});
	}
	
	var size = function () {
		var windowHeight = $(window).height();
		var windowWidth = $(window).width();
		
		if ($('#as_mediaBox').hasClass("scribd" || "fullsize")) {
			var h = (windowHeight/10)*9;
			var w = 900;
			if (windowWidth < 940) {
				w = (windowWidth/10)*9;
			}
			var mh = h-60;
			var mw = w-40;
			var mediaBoxLeft = ((windowWidth - w)/2)-10;
			var mediaBoxTop = ((windowHeight - h)/2)-10;
			$('.as_mediaContainer').css('height',h).css('width',w).css('left', mediaBoxLeft ).css('top', mediaBoxTop);
			$('#as_mediaBox').css('height',mh).css('width',mw);
			$('.as_mediaContainer').append('<div class="close"/>');
			$('.close').html('Close <div id="x">X</div>').click(function () {as_mediabox.remove();});
		}
	}
	
	return {
		init: init,
		remove: remove,
		setScribdPubKey: setScribdPubKey
	}
}();