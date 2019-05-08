(function($) {
	$.fn.extend({

		abYT : function(options) {

			var defaults = {
				//inital settings
				maxRes: '5',
			    plId: 'PLFLxHvhZIr2Zb-4ohVUOtCYl9x-Xz_V_I',
				accent_col: '#ff9900'
			}
			
			var options = $.extend(defaults, options);
			
			return this.each(function() {
				var o = options;
				var htmltext = "";
				var vidarray = new Array();
				var div = document.getElementById('abyt');

				//return data
				$.get("https://www.googleapis.com/youtube/v3/playlistItems",{
				part: 'snippet',
				maxResults: o.maxRes,
				playlistId: o.plId,
				key: 'AIzaSyA95HgejaqXLkYw47ysIRll3eim2errOAU'},
				
				function(data){
					
					$.each(data.items, function(i, item){
						//console.log(item);				
						vidarray.push([item.snippet.resourceId.videoId,'','','','']);
		
					})
				
				}).then(function(){
					
					async.eachSeries(vidarray, function(item, done) {
							
						//return data
						$.get("https://www.googleapis.com/youtube/v3/videos",{
						part: 'statistics, snippet',
						maxResults: 1,
						id: vidarray[vidarray.indexOf(item)][0],
						key: 'AIzaSyA95HgejaqXLkYw47ysIRll3eim2errOAU'},
						
						function(data3){
							
							$.each(data3.items, function(i3, item3){
						
								vidarray[vidarray.indexOf(item)][1] = item3.snippet.publishedAt;		
								vidarray[vidarray.indexOf(item)][2] = item3.statistics.viewCount;	
								vidarray[vidarray.indexOf(item)][3] = item3.snippet.title;
								vidarray[vidarray.indexOf(item)][4] = "https://img.youtube.com/vi/"+vidarray[vidarray.indexOf(item)][0]+"/0.jpg";
							
							})
							done();
						});
							
					}, function(err) {
					    if (err) {
							throw err;
						}
						//console.log("All requests are done");
						//console.log(vidarray);
						$.each(vidarray, function(i4){
													
							var nDate = new Date(vidarray[i4][1]);
							var aDate = [];
							aDate[0] = nDate.getDay();
							aDate[1] = nDate.getDate();
							aDate[2] = nDate.getMonth();
							aDate[3] = nDate.getFullYear();
							
						/* 	if (aDate[0] == 1) { 
								aDate[0] = "Monday"; 
							} else if (aDate[0] == 2) {
								aDate[0] = "Tuesday"; 
							} else if (aDate[0] == 3) { 
								aDate[0] = "Wednesday"; 
							} else if (aDate[0] == 4) { 
								aDate[0] = "Thursday"; 
							} else if (aDate[0] == 5) { 
								aDate[0] = "Firday"; 
							} else if (aDate[0] == 6) { 
								aDate[0] = "Saturday"; 
							} else { aDate[0] = "Sunday"; } */
									
							aDate[0] = '';
							
							if (aDate[1] == 1) { 
								aDate[1] = aDate[1] + "<sup>st</sup>";
							} else 
							if (aDate[1] == 2) {
								aDate[1] = aDate[1] + "<sup>nd</sup>";
							} else if (aDate[1] == 3) { 
								aDate[1] = aDate[1] + "<sup>rd</sup>";
							} else if (aDate[1] >= 4 && aDate[1] <= 20) { 
								aDate[1] = aDate[1] + "<sup>th</sup>";
							} else {
								
								if (aDate[1] == 0) {
									aDate[1] = "0th"
								} else {
									if (aDate[1].toString()[1] == '1') { 
									aDate[1] = aDate[1] + "<sup>st</sup>";
									} else if (aDate[1].toString()[1] == '2') {
										aDate[1] = aDate[1] + "<sup>nd</sup>";
									} else if (aDate[1].toString()[1] == '3') {
										aDate[1] = aDate[1] + "<sup>rd</sup>";
									} else {
										aDate[1] = aDate[1] + "<sup>th</sup>";
									}
								}
							}
							
							if (aDate[2] == 0) { 
								aDate[2] = "January"; 
							} else if (aDate[2] == 1) {
								aDate[2] = "February"; 
							} else if (aDate[2] == 2) { 
								aDate[2] = "March"; 
							} else if (aDate[2] == 3) { 
								aDate[2] = "April"; 
							} else if (aDate[2] == 4) { 
								aDate[2] = "May"; 
							} else if (aDate[2] == 5) { 
								aDate[2] = "June"; 
							} else if (aDate[2] == 6) { 
								aDate[2] = "July"; 
							}else if (aDate[2] == 7) { 
								aDate[2] = "August"; 
							}else if (aDate[2] == 8) { 
								aDate[2] = "September"; 
							}else if (aDate[2] == 9) { 
								aDate[2] = "October"; 
							}else if (aDate[2] == 10) { 
								aDate[2] = "November"; 
							}else { aDate[2] = "December"; }
													
							dDate = aDate.join(' ');
						
							if (i4 == 0) {
								htmltext = htmltext + '<div class="abyt-main"><div class="abyt-vid"><iframe width="560" height="315" src="https://www.youtube.com/embed/' + vidarray[i4][0] + '?list=' + o.plId + '" frameborder="0" allowfullscreen></iframe></div><span class="abyt-info"><span class="abyt-title">' + vidarray[i4][3] +'</span><br><span class="abyt-views" style="color:' + o.accent_col + '";>' + vidarray[i4][2] +' VIEWS</span><span class="abyt-gap"> | </span><span class="abyt-date" style="color:' + o.accent_col + '";>' + dDate +'</span></span></div>';
								htmltext = htmltext + '<div class="abyt-side">';
							} else {
								
								htmltext = htmltext + '<div class="abyt-siderow"><div class="abyt-swrap"><div class="abyt-vid"><a target="_blank" href="https://www.youtube.com/watch?v=' + vidarray[i4][0] + '&list=' + o.plId + '"><img style="width:100%;" src="' + vidarray[i4][4] + '" alt="' + vidarray[i4][3] + '" /><div class="after"></div></a></div></div><div class="abyt-sub"><span class="abyt-info"><span class="abyt-title">' + vidarray[i4][3] +'</span><br><span class="abyt-views"  style="color:' + o.accent_col + '";>' + vidarray[i4][2] +' VIEWS</span><span class="abyt-gap"> | </span><span class="abyt-date" style="color:' + o.accent_col + '";>' + dDate +'</span></span></div></div>';
							}

						})	

						htmltext = htmltext + '</div>';	
						div.innerHTML = htmltext;
						
					});
					
				});

			});
			
		}
	
	});
	
})(jQuery); 

