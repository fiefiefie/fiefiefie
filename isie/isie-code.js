	
//is it IE? isIE(); 

//is it IE6? isIE(6);

//is it less than or equal to IE 8?
if (isIE(11,'lte')) {
	
	document.body.style.width = '700px';
	document.body.style.background = '#000';
	document.body.style.margin = '0 auto';
	
	
	var div = document.getElementById('main');
	
	div.innerHTML = '<div style="display: block; background-color:#EE2222; width: 700px; text-align:center"><p style="margin:0px;">Browser not supported: Please update Internet Explorer, or use a different browser.</p></div><div><img width="100%"" src="images/simple.png"/></div><div><ul class="iesocial"><li><a style="color:#fff;" href="https://www.facebook.com/fietheband">Facebook</a></li><li><a style="color:#fff;" href="http://twitter.com/fiefiefie1">Twitter</a></li><li><a style="color:#fff;" href="http://www.youtube.com/user/fietheband">YouTube</a></li><li><a style="color:#fff;" href="https://soundcloud.com/fie-fie-fie">Soundcloud</a></li></ul></div>';
	
	var div = document.getElementById('bg');
	div.innerHTML = "";
}

//if (isIE(7,'lte')) {
		//var div = document.getElementById('main');
	//div.innerHTML = div.innerHTML + '<div style="display: block; background-color:#EE2222; width: 650px; float:right;"><p style="margin:0px; padding-right: 20px;">Browser not supported: Please update Internet Explorer, or use a different browser.</p></div>';
	
	//document.getElementById('banner').style.display = 'none';		
	
//}

