(function ($) {

	$.fn.flythrough = function(frameObj) {

	  // configure your flythrough frames below
		var settings = $.extend({
			frames: []
		}, frameObj);

		if (frames.length === 0) {
			console.error("Frames must be an array with at least one object.");
		}

		//replace all refrences to frames to settings.frame

		var video = this.children(".flyVideo");
		var frame = 0;

		var self = this;


		// determine if we are going forward or backwards

		function checkDirection(thisObj) {
			// unbind the click function from the buttons to prevent clicks in mid animation
			self.children(".flyButton").unbind("click");

			//check for direction based on button id
			if (thisObj.hasClass("play") === true) {
				frame++;	// advance frame count
				checkButtons(); // check buttons to see if we need to hide any
				advanceFrames(); // run advance frame functions
			} else {
				frame--; // rewind frame count
				checkButtons(); // check buttons to see if we need to hide any
				rewindFrames(); // run rewind frame functions
			}

		}


		// if we are at the beginning or end of the flythrough, we're going to hide the corresponding buttons

		function checkButtons() {
			if (frame === 0) {
				self.children(".rewind").hide(); // hide the rewind button on the first frame
			} else if (frame === (settings.frames.length - 1)) {
				self.children(".play").hide(); // hide the play button on the last frame
			} else {
				self.children(".flyButton").show(); //if on any frame other than the first or last, show both buttons
			}
		}


		//advance the flythrough
		function advanceFrames() {

			// if the frame is a waypoint, play the video to the next waypoint
			if (settings.frames[frame].type === "waypoint") {
				self.children(".overlay").fadeOut(250); // hide all the overlays before the animation starts
				self.children(".label").remove(); // remove all labels
				self.children(".satCredit").text(settings.frames[frame].satCredit); // update satelitte imagery credit
				video[0].play(); // start the animation
			}

			checkImage(); // if the frame is an image, display that frame

		}

		// this function runs as the video is playing. it controls the pausing of the animation at the correct times
		// along with displaying the correct overlays and labels
		function frameControl() {

			// check to see if animation has hit the current frames end time, and that video isn't already paused
			// we check to see if it's paused because time is funny, and sometimes this event fires after that time has passed but the video hasn't paused yet
			if (video[0].currentTime >= settings.frames[frame].end && video[0].paused !== true) {
				video[0].pause();

				checkOverlays(); // if that frame has an overlay, build it and show it
				checkLabels(); // if the frame has labels, construct each label and append it to the flythrough

				// rebind the click function to the flythrough labels
				bindClick();
			}
		}



		function rewindFrames() {
			if (settings.frames[frame].type === "waypoint") {
				self.children(".overlay").fadeOut(250); // hide all the overlays before the animation starts
				self.children(".label").remove(); // remove all labels
				self.children(".satCredit").text(settings.frames[frame].satCredit); // update satelitte imagery credit

				checkOverlays(); // if that frame has an overlay, build it and show it
				checkLabels(); // if the frame has labels, construct each label and append it to the flythrough

				video[0].currentTime = settings.frames[frame].end; // set the flythrough the current frames end time, so it's ready to go forward

				bindClick();

			}

			checkImage();	// if the frame is an image, display that frame

		}

		//binding clicks
		function bindClick() {
			self.children(".flyButton").bind("click", function() {
				return checkDirection($(this));
			});
		}

		// checking if current frame has overlays and building out the overlays
		function checkOverlays() {
			if (settings.frames[frame].overlayHead !== undefined ) {
				self.find(".textOverlay h4").html(settings.frames[frame].overlayHead);
			}

			if (settings.frames[frame].overlayText !== undefined) {
				self.find(".textOverlay p").html(settings.frames[frame].overlayText);
			}

			if (settings.frames[frame].overlayHead !== undefined || settings.frames[frame].overlayText !== undefined) {
				self.children(".textOverlay").fadeIn(250);
			}
		}

		// checking if the current frame has labels, and building out those labels
		function checkLabels() {
			if (settings.frames[frame].labels !== undefined) {
				$.each(settings.frames[frame].labels, function(k,v) {
					var label = "";
					label +="<span class='label' style='top: " + settings.frames[frame].labels[k].y + "; left: " + settings.frames[frame].labels[k].x + ";'>";
					label += settings.frames[frame].labels[k].text;
					label += "</span>";
					self.append(label);
				});
			}
		}

		// checking if the current frame is an image
		function checkImage() {
			if (settings.frames[frame].type === "image") {
					self.children(".overlay").fadeOut(250); // hide all the overlays
					self.children(".label").remove(); //remove all labels

					self.find(".imageOverlay img").attr("src", settings.frames[frame].imagePath).attr("alt", settings.frames[frame].cutline); // update the image overlay img tag with the src path and alt text

					if (settings.frames[frame].cutline !== undefined) {
						self.find(".imageOverlay .cutline").html(settings.frames[frame].cutline); // update the image overlay cutline
					}

					self.children(".imageOverlay").fadeIn(250); // display the image overlay

					video[0].currentTime = settings.frames[frame].end; // jump the video's current time to the current frame's end

					//reattach the click event
					bindClick();
			}
		}

		// check the buttons for the first time
		checkButtons();

		video[0].controls = false; // remove the video controls
		video[0].addEventListener("timeupdate", frameControl, false); // add a listener for when the video is playing


		// attach the click event to the flythrough buttons that adavances or rewinds the flythrough
		this.children(".flyButton").bind("click", function() {
			return checkDirection($(this));
		});

		// clicking into the flythrough through the titlecard
		this.find(".titleButton").click(function() {

			self.find(".titleCard").remove(); // remove title card

			video[0].currentTime = settings.frames[frame].end; // set the video to the end of the first frame so it's ready to move when the play button is clicked

			if (settings.frames[frame].satCredit !== undefined) {
				self.children(".satCredit").text(settings.frames[frame].satCredit); // update the sat credit with the first slide
			}
			checkOverlays(); // add overlays, if any
			checkLabels(); // add labels, if any
			checkImage(); // add image, if any
		});


		return this;

	};

}(jQuery));
