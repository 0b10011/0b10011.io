---
layout: post
title: What's my browser resolution? (Mobile friendly.)
categories: tools
---

<div id="resolutionResult">Loading... <small>(Make sure you have JavaScript enabled.)</small></div>

This tool measures the width and height of your browser. The website is mobile friendly,
so it even gives accurate results for mobile browsers! If you come across any issues,
[fork this site](http://github.com/0b10011/0b10011.io/) and submit a fix! Or, if
you're not sure how to fix it, [submit an issue](http://github.com/0b10011/0b10011.io/issues/)
and I'll take a look.

<script>
function measureResolution(){
	// Create element
	var elt = document.createElement("div");
	// Set styles to stretch element to bounds of screen
	elt.style.position = "absolute";
	elt.style.top = "0";
	elt.style.bottom = "0";
	elt.style.left = "0";
	elt.style.right = "0";
	elt.style.zIndex = "-1";
	// Append element to body
	measureElt = document.body.appendChild(elt);
	// Measure element
	var width = measureElt.offsetWidth;
	var height = measureElt.offsetHeight;
	// Remove element
	measureElt.parentNode.removeChild(measureElt);
	// Update size
	document.getElementById("resolutionResult").innerHTML = "<p>Your browser is <strong>" + width + "px wide</strong> by <strong>" + height + "px tall</strong>.</p>";
	// Update on resize
	if (window.addEventListener) {
		window.addEventListener("resize", measureResolution, false);
	} else if (window.attachEvent) {
		window.attachEvent("onresize", measureResolution);
	} else {
		window["onresize"] = measureResolution;
	}
}
measureResolution();
</script>
