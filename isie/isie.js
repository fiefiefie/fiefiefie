//ie 10
var ie10 = 0;
if (navigator.appVersion.indexOf("MSIE 10") !== -1)
{
    var ie10 = 1;
}
	
//EnhanceJS isIE test idea

//detect IE and version number through injected conditional comments (no UA detect, no need for cond. compilation / jscript check)

//version arg is for IE version (optional)
//comparison arg supports 'lte', 'gte', etc (optional)

function isIE(version, comparison) {
	var cc      = 'IE',
	    b       = document.createElement('B'),
	    docElem = document.documentElement,
	    isIE;
	    
	if(version){
		cc += ' ' + version;
		if(comparison){ cc = comparison + ' ' + cc; }
	}
	
	b.innerHTML = '<!--[if '+ cc +']><b id="iecctest"></b><![endif]-->';
	docElem.appendChild(b);
	isIE = !!document.getElementById('iecctest');
	docElem.removeChild(b);
	return isIE;
}
	
//if (ie10 == 1) {
//}


