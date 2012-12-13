---
layout: post
title: What's my IP?
categories: tools
---

Your public IP address is:

<p><output id="ipResult">Loading... <small>(Make sure you have JavaScript enabled.)</small></output></p>

This script pings <http://jsonip.appspot.com/?callback=getip> to find your IP address.
(Thanks to [@Zach](http://stackoverflow.com/users/9128/zach) on Stack Overflow for
[providing this solution](http://stackoverflow.com/a/102681/526741)!)

<script type="application/javascript">
function getip(json){
	var elt = document.getElementById("ipResult");
	elt.innerHTML = "";
	elt.appendChild(document.createTextNode(json.ip));
}
</script>

<script type="application/javascript" src="http://jsonip.appspot.com/?callback=getip"> </script>