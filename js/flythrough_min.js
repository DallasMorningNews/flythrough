!function(e){e.fn.flythrough=function(t){function r(e){h.children(".flyButton").unbind("click"),e.hasClass("play")===!0?(u++,a(),n()):(u--,a(),l())}function a(){0===u?h.children(".rewind").hide():u===o.frames.length-1?h.children(".play").hide():h.children(".flyButton").show()}function n(){"waypoint"===o.frames[u].type&&(h.children(".overlay").fadeOut(250),h.children(".label").remove(),h.children(".satCredit").text(o.frames[u].satCredit),m[0].play()),c()}function i(){m[0].currentTime>=o.frames[u].end&&m[0].paused!==!0&&(m[0].pause(),d(),f(),s())}function l(){"waypoint"===o.frames[u].type&&(h.children(".overlay").fadeOut(250),h.children(".label").remove(),h.children(".satCredit").text(o.frames[u].satCredit),d(),f(),m[0].currentTime=o.frames[u].end,s()),c()}function s(){h.children(".flyButton").bind("click",function(){return r(e(this))})}function d(){void 0!==o.frames[u].overlayHead&&h.find(".textOverlay h4").html(o.frames[u].overlayHead),void 0!==o.frames[u].overlayText&&h.find(".textOverlay p").html(o.frames[u].overlayText),(void 0!==o.frames[u].overlayHead||void 0!==o.frames[u].overlayText)&&h.children(".textOverlay").fadeIn(250)}function f(){void 0!==o.frames[u].labels&&e.each(o.frames[u].labels,function(e,t){var r="";r+="<span class='label' style='top: "+o.frames[u].labels[e].y+"; left: "+o.frames[u].labels[e].x+";'>",r+=o.frames[u].labels[e].text,r+="</span>",h.append(r)})}function c(){"image"===o.frames[u].type&&(h.children(".overlay").fadeOut(250),h.children(".label").remove(),h.find(".imageOverlay img").attr("src",o.frames[u].imagePath).attr("alt",o.frames[u].cutline),void 0!==o.frames[u].cutline&&h.find(".imageOverlay .cutline").html(o.frames[u].cutline),h.children(".imageOverlay").fadeIn(250),m[0].currentTime=o.frames[u].end,s())}var o=e.extend({frames:[]},t);0===frames.length&&console.error("Frames must be an array with at least one object.");var m=this.children(".flyVideo"),u=0,h=this;return a(),m[0].controls=!1,m[0].addEventListener("timeupdate",i,!1),this.children(".flyButton").bind("click",function(){return r(e(this))}),this.find(".titleButton").click(function(){h.find(".titleCard").remove(),m[0].currentTime=o.frames[u].end,void 0!==o.frames[u].satCredit&&h.children(".satCredit").text(o.frames[u].satCredit),d(),f(),c()}),this}}(jQuery);
