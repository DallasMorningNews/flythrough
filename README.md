## Intro

This is library is to be used in the building of fly arounds using video exported from Google Earth. In this library, you'll find the html, css and jquary you'll need to build functioning fly arounds. While most of the code is written for you, you will need to be familiar with [JSON (Javascript Object Notation)](http://www.w3schools.com/json/), and a little bit of HTML.

#### Other things you'll need

**JQUERY:** This library relies on jquery. It was built using v2.2.3, but should work fine with the last stable 1. version if you'd like.

**VIDEO:** The animation that is the basis of this plugin is video exported from [Google Earth Pro](http://www.google.com/earth/download/gep/agree.html) and rendered using the HTML5 video tags in the index.html file. For a tutorial on how to build your Google Earth flyaround and export the video, check out this [awesome tutorial](https://github.com/tnurse/gep-flythroughs) by Tom Nurse and Nassos Stylianou from the BBC News Visual Journalism team. Once you have your video from Google Earth, you'll need to be able to convert it into mp4 and ogg formats (I've included a sample video with three waypoints in the videos directory). I use [Miro Video Converter](http://www.mirovideoconverter.com/) to convert the exported mov file to mp4, and [cloudconvert](https://cloudconvert.com/mp4-to-ogg) to convert the mp4 to ogg.

**IMAGES:** If you have any images you want to display within your flyaround, you'll need to supply those yourself. For best results, you'll want to crop your image to be the same aspect ratio as your video. For the purposes of this plugin, video is assumed to be at an aspect ratio of .5625 (1280x720). If you want to use a different aspect ratio, there are a few other things to change. Check the tips and tricks below.

**VIDEO EDITING SOFTWARE:** Video editing software is optional. If you wanted to edit your video to label certain places within your flyaround, you can do so in a program such as After Effects, but it's not necessary. The library allows for including HTML labels.




##Setup

**HTML:** Place the contents of the index.html file anywhere within your html document. The flythrough is designed to be the full width of your viewport, so make any accommodations that you need to within your code.

**CSS and JS:** Copy the flythrough.css and flythrough.js files to your own `css` and `javascript` directories. Be sure to include calls to those files within your html document.

**BUTTON IMAGES:** The next and previous buttons are svg images that should be included within your images directory. If your images directory is names something other than `images`, be sure to change the path for the buttons within the supplied flythrough html.




##Creating your JSON

Flythrough is powered by an array of JSON objects that you'll find on line 4of the flythrough.js file, assigned to the variable `frames`. Each JSON object within the array corresponds to either a waypoint in your flythrough video, or an image that you'd like to display between waypoints. **Think of these as frames, for the purposes of this document** Each of those JSON objects have some required and optional keys and values depending on the whether that JSON object is a waypoint or image. Let's take a look at each:  

#####Required keys for all frames (with value type in bold)
`type`: **(string)** This will be either `waypoint` or `image`, depending on if that frame of your flythrough is a waypoint in the video, or an image you want to display over the flythrough.
`end`: **(integer)** This is the time in seconds in the flythrough that you'd like to pause the flythrough animation at for that frame. On `image` frames, it's recommended that you use the time the next waypoint frame begins.

#####Optional keys for all frames
`number`: **(integer)** The number of the frame (starting at 0).
`start`: **(integer)** The start time of the move for the frame. While this doesn't control anything specifically, it can help you keep track of where frames begin and end.

#####Required keys for Waypoint frames
`satCredit`: **(string)** Google requires attribution for satellite imagery to be displayed. At large screens this credit information is easily readable within the video itself. At smaller sizes, this attribution will be appended below the flythrough animation. Frames that are `type: "image"` do not need the `satCredit` key.

#####Optional keys for Waypoint frames
`overlayHead`: **(string)** Applies a headline to the text overlay that is displayed over that frame
`overlayText`: **(string)** Applies a paragraph of text to the text overlay that is displayed over that frame. Don't go crazy. Two to three sentences is best.
`labels`: **(array of JSON objects)** Applies text labels to supplied positions over the frame. Read more about labels below.

#####Required keys for Image frames
`imagepath`: **(string)** The relative path to the image you want to display in that frame.

#####Optional keys for Image frames
`cutline`: **(string)** A cutline of caption to be displayed below the image. This could be used to describe the image itself, for photo credit attribution, or both


#####Labels
Labels can be used on waypoint frames to point out specific features or locations within the waypoint of that frame. The `labels` key takes the form of a JSON array, with each object in the array requiring three keys (all of which are required): `text`, `x` and `y`. Pro tip: Do not include too many labels on a single frame. It should be find at larger screens, but on smaller screens, things could get crowded.

`text`: **(string)** Text that appears in the label. Shorter = better.
`x`: **(string)** The x position of the label in viewport width (vw) units.
`y`: **(string)** The y position of the label in viewport width (vw) units.

A word about labels: You may be wondering why the `y` position is listed in vw, instead of vh, or why we're using vw instead of percentages. VW is used to for the `y` position to maintain the label's position in respect to the flythrough's aspect ratio. Placing these labels will take some trial and error, so be patient.










##Tips and Tricks
