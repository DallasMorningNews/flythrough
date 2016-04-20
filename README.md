Created by John Hancock. By all means, have your way with any of this code. Lastly, don't hesitate to submit bug reports or fix requests. Thanks!


## Intro

This plugin is to be used in the building of fly arounds using video exported from Google Earth. In this plugin, you'll find the sample html setup, css and javascript you'll need to build functioning fly arounds. While most of the code is written for you, you will need to be familiar with [JSON (Javascript Object Notation)](http://www.w3schools.com/json/), and a little bit of HTML.

#### Other things you'll need

**JQUERY:** This library relies on jquery. It was built using v2.2.3, but should work fine with the last stable 1. version if you'd like.

**VIDEO:** The animation that is the basis of this plugin is video exported from [Google Earth Pro](http://www.google.com/earth/download/gep/agree.html) and rendered using the HTML5 video tags in the index.html file. For a tutorial on how to build your Google Earth flyaround and export the video, check out this [awesome tutorial](https://github.com/tnurse/gep-flythroughs) by Tom Nurse and Nassos Stylianou from the BBC News Visual Journalism team. Once you have your video from Google Earth, you'll need to be able to convert it into mp4 and ogg formats (I've included a sample video with three waypoints in the videos directory). I use [Miro Video Converter](http://www.mirovideoconverter.com/) to convert the exported mov file to mp4, and [cloudconvert](https://cloudconvert.com/mp4-to-ogg) to convert the mp4 to ogg.

**IMAGES:** If you have any images you want to display within your flyaround, you'll need to supply those yourself. For best results, you'll want to crop your image to be the same aspect ratio as your video. For the purposes of this plugin, video is assumed to be at an aspect ratio of .5625 (1280x720). If you want to use a different aspect ratio, there are a few other things to change. Check the tips and tricks below.

**VIDEO EDITING SOFTWARE:** Video editing software is optional. If you wanted to edit your video to label certain places within your flyaround, you can do so in a program such as After Effects, but it's not necessary. The library allows for including HTML labels.


##Setup

**HTML:** Place the contents of the index.html file anywhere within your html document. The flythrough is designed to be the full width of your viewport, so make any accommodations that you need to within your code.

**CSS and JS:** Copy the flythrough.css and flythrough.js files (or the minified versions) to your own `css` and `javascript` directories. Be sure to include calls to those files within your html document.

**BUTTON IMAGES:** The next and previous buttons are svg images that should be included within your images directory. If your images directory is named something other than `images`, be sure to change the path for the buttons within the supplied flythrough html.


##Creating your JSON

Flythrough is powered by an array of JSON objects defined in your javascript file (in the sample below, this array is assigned to the variable name `sampleJSON`). Each JSON object within the array corresponds to either a waypoint in your flythrough video, or an image that you'd like to display between waypoints. **Think of these as frames, for the purposes of this document.**

######Sample JSON

```javascript
var sampleJSON = [
		{
			number: 0,
			type: "waypoint",
			start: 0,
			end: 6,
			overlayHead: "This is overlayHead 1",
			overlayText: "This is overlay text 1",
			satCredit: "Satelitte imagery: 2016 Digital Globe; 2016 Cnes/Spot Image; Data SIO, NOAA, U.S. Navy, NGA, GEBCO; Image Landsat"
		},
		{
			number: 1,
			type: "waypoint",
			start: 6,
			end: 9,
			overlayHead: "This is overlayHead 2",
			overlayText: "This is overlay text 2",
			labels: [{text: "Ranchhouse", x: "48vw", y: "33vw"}, {text: "Road", x: "10vw", y: "37.5vw"}],
			satCredit: "Satelitte imagery: 2016 Digital Globe"
		},
		{
			number: 2,
			type: "image",
			imagePath: "/images/_testImage.jpg",
			cutline: "This is the image cutline",
			start: 8,
			end: 12
		},
		{
			number: 2,
			type: "waypoint",
			start: 12,
			end: 16,
			overlayHead: "This is overlayHead 3",
			overlayText: "This is overlay text 3",
			satCredit: "Satelitte imagery: 2016 Digital Globe; 2016 Cnes/Spot Image; Image Landsat"
		}
	];

```

Once you have your JSON set up, all you need to do is call ``.flythrough` on your flythrough container, passing the variable name of your JSON array as the value of the frames key within an object. For example:

```javascript
$("#yourid").flythrough({frames: sampleJSON});
```

##JSON COMPONENTS

Each of those JSON objects have some required and optional keys and values depending on the whether that JSON object is a waypoint or image. Let's take a look at each:  

<br />

#####Required keys for all frames (with value type in bold)
`type`: **(string)** This will be either `waypoint` or `image`, depending on if that frame of your flythrough is a waypoint in the video, or an image you want to display over the flythrough.

`end`: **(integer)** This is the time in seconds in the flythrough that you'd like to pause the flythrough animation for that frame. On `image` frames, it's recommended that you use the time the next waypoint frame begins.

<br />

#####Optional keys for all frames
`number`: **(integer)** The number of the frame (starting at 0). This is used mainly to maintain sanity on long JSON arrays.

`start`: **(integer)** The start time of the move for the frame. While this doesn't control anything specifically, it can help you keep track of where frames begin and end.

<br />

#####Required keys for Waypoint frames
`satCredit`: **(string)** Google requires attribution for satellite imagery to be displayed. At large screens this credit information is easily readable within the video itself. At smaller sizes, this attribution will be appended below the flythrough animation. Frames that are `type: "image"` do not need the `satCredit` key.

<br />

#####Optional keys for Waypoint frames
`overlayHead`: **(string)** Applies a headline to the text overlay that is displayed over that frame.

`overlayText`: **(string)** Applies a paragraph of text to the text overlay that is displayed over that frame. Don't go crazy. Two to three sentences is best.

`labels`: **(array of JSON objects)** Applies text labels to supplied positions over the frame. Read more about labels below.

<br />

#####Required keys for Image frames
`imagepath`: **(string)** The relative path to the image you want to display in that frame.

<br />

#####Optional keys for Image frames
`cutline`: **(string)** A cutline of caption to be displayed below the image. This could be used to describe the image itself, for photo credit attribution, or both

<br />

#####Labels
Labels can be used on waypoint frames to point out specific features or locations within the waypoint of that frame. The `labels` key takes the form of a JSON array, with each object in the array requiring three keys (all of which are required): `text`, `x` and `y`. Pro tip: Do not include too many labels on a single frame. It should be fine at larger screens, but on smaller screens, things could get crowded.

`text`: **(string)** Text that appears in the label. Shorter = better.

`x`: **(string)** The x position of the label in viewport width (vw) units.

`y`: **(string)** The y position of the label in viewport width (vw) units.

**A word about labels:** You may be wondering why the `y` position is listed in vw, instead of vh, or why we're using vw instead of percentages. VW is used to for the `y` position to maintain the label's position in respect to the flythrough's aspect ratio. Placing these labels will take some trial and error, so be patient.





##Tips and Tricks
*Google Earth's fly throughs will "wait" at each waypoint for a number of seconds before moving on to the other. To have overlays appear shortly after the waypoint is reached, list the `end` time for each waypoint the moment the animation pauses at that location.

*In the tutorial listed above by Tom Nurse and Nassos Stylianou, these fine fellows instruct you on how to change the time your animation waits between each waypoint. They suggest four seconds, but I would recommend one or two, to prevent what are perceived delays of your animation playing but not actually doing anything as it waits at each waypoint.

*If you use a video size with an aspect ratio different than .5625, there are a couple lines you can change in flythrough.css that will fix any issues you may be experiencing. First, convert your aspect ratio to vw by multiplying by 100. On line 36, change the `height` of ``.titleCard` to your new value in vw. Likewise, on line 241, sub the 56.25vw for your value.
