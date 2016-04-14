## Intro

This is library is to be used in the building of fly arounds using video exported from Google Earth. In this library, you'll find the html, css and jquary you'll need to build functioning fly arounds. While most of the code is written for you, you will need to be familiar with <a href="http://www.w3schools.com/json/" target="_blank">JSON (Javascript Object Notation) </a>, and a little bit of HTML.

#### Other things you'll need

**VIDEO:** The animation that is the basis of this plugin is video exported from <a href="http://www.google.com/earth/download/gep/agree.html" target="_blank">Google Earth Pro</a> and rendered using the HTML5 video tags in the index.html file. For a tutorial on how to build your Google Earth flyaround and export the video, check out this <a href="https://github.com/tnurse/gep-flythroughs" target="_blank">awesome tutorial</a> by Tom Nurse and Nassos Stylianou from the BBC News Visual Journalism team.

**IMAGES:** If you have any images you want to display within your flyaround, you'll need to supply those yourself. For best results, you'll want to crop your image to be the same aspect ratio as your video. For the purposes of this plugin, video is assumed to be at an aspect ratio of .5625 (1280x720). If you want to use a different aspect ratio, there are a few other things to change. Check the tips and tricks below.

**VIDEO EDITING SOFTWARE:** Video editing software is optional. If you wanted to edit your video to label certain places within your flyaround, you can do so in a program such as After Effects, but it's not necessary. The library allows for including HTML labels.
