
(function(window, Lsec) {
	var navbar = document.querySelectorAll("div.navbar")[0];

	navbar.innerHTML = Lsec.getUrl();
	
})(window, Lsec);