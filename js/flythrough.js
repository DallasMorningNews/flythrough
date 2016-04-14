$(document).ready(function() {

  // configure your flythrough frames below
	var frames = [
		{
			number: 0,
			type: "waypoint or image",
			start: 0,
			end: 0,
			overlayHead: "<<overlay head>>",
			overlayText: "<<overlay text>>",
			satCredit: "<<sat imagery credit>>"
		},
		{
			number: 1,
			type: "waypoint",
			start: 0,
			end: 0,
      overlayHead: "<<overlay head>>",
			overlayText: "<<overlay text>>",
			labels: [{text: "<<label text>", x: "<<x position in vw, ex: 50vw>>", y: "<<y position in vw, ex: 25vw>>"}, {text: "<<label text>", x: "<<x position in vw, ex: 50vw>>", y: "<<y position in vw, ex: 25vw>>"}],
			satCredit: "<<sat imagery credit>>"
		},
		{
			number: 2,
			type: "image",
			imagePath: "<<image path>>",
			cutline: "<<image cutline>>",
			start: 0,
			end: 0
		}
	];


	var video = $("#video");
	var frame = 0;


	// determine if we are going forward or backwards

	function checkDirection(thisObj) {
		// unbind the click function from the buttons to prevent clicks in mid animation
		$(".flyButton").unbind("click");

		//check for direction based on button id
		if (thisObj.attr("id") === "play") {
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
			$("#rewind").hide(); // hide the rewind button on the first frame
		} else if (frame === (frames.length - 1)) {
			$("#play").hide(); // hide the play button on the last frame
		} else {
			$(".flyButton").show(); //if on any frame other than the first or last, show both buttons
		}
	}


	//advance the flythrough
	function advanceFrames() {

		// if the frame is a waypoint, play the video to the next waypoint
		if (frames[frame].type === "waypoint") {
			$(".overlay").fadeOut(250); // hide all the overlays before the animation starts
			$(".label").remove(); // remove all labels
			$(".satCredit").text(frames[frame].satCredit); // update satelitte imagery credit
			video[0].play(); // start the animation
		}

		checkImage(); // if the frame is an image, display that frame

	}

	// this function runs as the video is playing. it controls the pausing of the animation at the correct times
	// along with displaying the correct overlays and labels
	function frameControl() {

		// check to see if animation has hit the current frames end time, and that video isn't already paused
		// we check to see if it's paused because time is funny, and sometimes this event fires after that time has passed but the video hasn't paused yet
		if (video[0].currentTime >= frames[frame].end && video[0].paused !== true) {
			video[0].pause();

			checkOverlays(); // if that frame has an overlay, build it and show it
			checkLabels(); // if the frame has labels, construct each label and append it to the flythrough

			// rebind the click function to the flythrough labels
			bindClick();
		}
	}



	function rewindFrames() {
		if (frames[frame].type === "waypoint") {
			$(".overlay").fadeOut(250); // hide all the overlays before the animation starts
			$(".label").remove(); // remove all labels
			$(".satCredit").text(frames[frame].satCredit); // update satelitte imagery credit

			checkOverlays(); // if that frame has an overlay, build it and show it
			checkLabels(); // if the frame has labels, construct each label and append it to the flythrough

			video[0].currentTime = frames[frame].end; // set the flythrough the current frames end time, so it's ready to go forward

			bindClick();

		}

		checkImage();	// if the frame is an image, display that frame

	}

	//binding clicks
	function bindClick() {
		$(".flyButton").bind("click", function() {
			return checkDirection($(this));
		});
	}

	// checking if current frame has overlays and building out the overlays
	function checkOverlays() {
		if (frames[frame].overlayHead !== undefined) {
			$(".textOverlay h4").html(frames[frame].overlayHead);
			$(".textOverlay p").html(frames[frame].overlayText);
			$(".textOverlay").fadeIn(250);
		}
	}

	// checking if the current frame has labels, and building out those labels
	function checkLabels() {
		if (frames[frame].labels !== undefined) {
			$.each(frames[frame].labels, function(k,v) {
				var label = "";
				label +="<span class='label' style='top: " + frames[frame].labels[k].y + "; left: " + frames[frame].labels[k].x + ";'>";
				label += frames[frame].labels[k].text;
				label += "</span>";
				$(".flythrough").append(label);
			});
		}
	}

	// checking if the current frame is an image
	function checkImage() {
		if (frames[frame].type === "image") {
				$(".overlay").fadeOut(250); // hide all the overlays
				$(".label").remove(); //remove all labels

				$(".imageOverlay img").attr("src", frames[frame].imagePath).attr("alt", frames[frame].cutline); // update the image overlay img tag with the src path and alt text
				$(".imageOverlay .cutline").html(frames[frame].cutline); // update the image overlay cutline
				$(".imageOverlay").fadeIn(250); // display the image overlay

				video[0].currentTime = frames[frame].end; // jump the video's current time to the current frame's end

				//reattach the click event
				bindClick();
		}
	}

	// check the buttons for the first time
	checkButtons();

	video[0].controls = false; // remove the video controls
	video[0].addEventListener("timeupdate", frameControl, false); // add a listener for when the video is playing


	// attach the click event to the flythrough buttons that adavances or rewinds the flythrough
	$(".flyButton").bind("click", function() {
		return checkDirection($(this));
	});



	// clicking into the flythrough through the titlecard
	$(".titleButton").click(function() {

		$(".titleCard").remove(); // remove title card

		video[0].currentTime = frames[frame].end; // set the video to the end of the first frame so it's ready to move when the play button is clicked

		if (frames[frame].satCredit !== undefined) {
			$(".satCredit").text(frames[frame].satCredit); // update the sat credit with the first slide
		}
		checkOverlays(); // add overlays, if any
		checkLabels(); // add labels, if any
		checkImage(); // add image, if any
	});


});
