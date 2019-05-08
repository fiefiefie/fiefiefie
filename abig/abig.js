var photoSwitch = 1; 
var imgCutpoints = 8;
var imgCount = 0;
var totalImgCount = 0;

var viewportWidth = 1920;
var viewportHeight = 1080;

var abphotoarray = [];
	
//return data
$.getJSON("photos.json", function(data) {

	if (data == null) {
		//wrapper.html('No tweets available.');
		return false;
	}
		
	$.each(data.data, function(i, field) {
		abphotoarray.push(field.loc);	
	});	
		
		
}).fail(function(jqxhr, textStatus, error) {
	//wrapper.html('No tweets available');
}).then(function(){
	
	function Shuffle(o) {
	for(var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
	return o;
	};
	
	$(document).ready(function() {
			
		$('#abig').html("<div id=\"photoCont\"><div id=\"photoInnerCont\"><div id=\"abPhotoGal\"></div></div><p class=\"photoBtnCont\"><a class=\"photoBtn\" href=\"#\">More...</a></p></div></div>");	
		
		Shuffle(abphotoarray);
		
		totalImgCount = abphotoarray.length;
		
		if (imgCutpoints > abphotoarray.length) {
			imgCount = abphotoarray.length;
		} else {
			imgCount = imgCutpoints;
		}
		
		
		
		for (i = 1; i <= imgCount; i++) { 
		
		$("#abPhotoGal").append( "<div class=\"abPhoto\"><a class=\"abphotolink\" href=\"#\"><img src=\""+ abphotoarray[i-1] +"\"/></a></div>");	
			
					
		}
		
		$('#abig').waitForImages(function() {
			// All descendant images have loaded, now slide up.
			SetImgHeight(photoSwitch);	
		});
			
		
		
		$('.photoBtn').click(function (event) {
			event.preventDefault();
		
			photoSwitch = photoSwitch + 1;
			imgCount = imgCutpoints * photoSwitch;
			var imgcprev = imgCutpoints * (photoSwitch - 1); 
			
			for (i = imgcprev + 1; i <= imgCount; i++) { 
		
				if (i <= abphotoarray.length) {
					$("#abPhotoGal").append( "<div class=\"abPhoto\"><a class=\"abphotolink\" href=\"#\"><img src=\""+ abphotoarray[i-1] +"\"/></a></div>");		
				}
			
			}
			
			$('#abig').waitForImages(function() {
				// All descendant images have loaded, now slide up.
				SetImgHeight(photoSwitch);	
			});
			
			SetImgHeight(photoSwitch);
			
			$('.abphotolink').click(function (event) {
				event.preventDefault();
				/*console.log($(this).parent().prevAll().length);*/
				LoadImage($(this).parent().prevAll().length);
			});
		
		});	
		
		$('.abphotolink').click(function (event) {
			event.preventDefault();
			/*console.log($(this).parent().prevAll().length);*/
			LoadImage($(this).parent().prevAll().length);
		});
	
	});
		

	$(window).resize(function () {

		SetImgHeight(photoSwitch);
				
	});

	function LoadImage (position) {
		
		var lbimg;
		var Limg;
		var Rimg;
		var nextI;
		
		viewportWidth = $(window).width();
		viewportHeight = $(window).height();
		
		var temphtmlL;
		
		if (position == 0) {
			temphtmlL = "";
		}
		else
		{
			temphtmlL = "<a class=\"leftImg\" href=\"#\"><i class=\"fa fa-chevron-left \"></i></a>";
			nextI = position - 1;
			Limg = nextI;
		}
		
		var temphtmlR;
		
		if (position == totalImgCount-1) {
			temphtmlR = "";
		}
		else
		{
			temphtmlR = "<a class=\"rightImg\" href=\"#\"><i class=\"fa fa-chevron-right \"></i></a>";
			nextI = position + 1;
			Rimg = nextI;
		}
		
		lbimg = $("<div class=\"fsimg\"><div class=\"closeImg\" style=\"width:100vw; height:100vh; z-index:-1;\"></div>" + temphtmlL + temphtmlR +"<a class=\"closeImg\" href=\"#\"><i class=\"fa fa-times\"></i></a><img class=\"fsinner\" src=\""+ abphotoarray[position] +"\"/></div>").prependTo("body");
		$('.fsimg').css("background-image", "url(\""+ abphotoarray[position] +"\")"); 

		
		$('.fsimg').css("background-size", "contain");  
		

		$('.closeImg').click(function (event) {
			event.preventDefault();
			lbimg.remove();
		});
		
		$('.leftImg').click(function (event) {
			event.preventDefault();
			lbimg.remove();
			LoadImage (Limg);
		});
		
		$('.rightImg').click(function (event) {
			event.preventDefault();
			lbimg.remove();
			LoadImage (Rimg);
		});
		
	};
	
	
	function SetImgHeight(a){
		
		$(".abphotolink").each(function( index ) {
			 var height1 = $(".abphotolink img").eq(index).height();
			 var width1 = $(".abphotolink img").eq(index).width();
			 
			 if ( height1 > width1 ) {
				/*console.log( index + " " + height1 + " " + width1);*/
				$(".abphotolink").eq(index).height(width1);
				$(".abphotolink img").eq(index).width('100%');
				
			 }
			 else
			 {
				var newvar = width1 / height1;
				newvar = newvar*100;
				$(".abphotolink img").eq(index).width(newvar+'%');
			
				$(".abphotolink img").eq(index).css('margin', '0 -100% 0 -100%');
			 }
			 
		});
		
		
		
		if (a * imgCutpoints >= abphotoarray.length) {
			
			$('.photoBtnCont').hide();
			$("#photoInnerCont").css({
				'overflow' : 'auto',
				'height' : 'auto'
			});
		}
		
		
		
	}

});