

(function(window, Lsec) {
	var username = document.querySelectorAll("div.username")[0];

	username.innerHTML = Lsec.getName();
	
})(window, Lsec);
