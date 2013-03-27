$(document).ready(function() {
	$('#nav-home').on('mouseenter', function() {
		$('#nav-home span').show({direction:'right'});
	}).mouseleave(function(){
		$('#nav-home span').fadeOut();
	});
});

var $misc = {};

$misc.eval = function(s) {
	if (typeof s === 'object') {
		//console.log(s);
		return s;
	}
	s = $.parseJSON(s.trim());
	//s = eval(s.trim());
	return $misc.eval(s);
}

$misc.toArgs = function(args) {
	if (typeof args !== 'object') {
		return '';
	}
	var argsOut = '';
	$.each(args, function(k, v) {
		if (v instanceof Date) v = $.datepicker.formatDate('yy-mm-dd', v);
		//if (v == null) v = '';
		if (v == null || v == '') return;
		argsOut += '&'+k+'='+v;
	});
	return argsOut;
}

$misc.c = function (input, seed) {
	if (typeof seed === 'undefined') seed = 1;
	var len = input.length;
	//seed += len;
	var output = "";
	for (var i = 0; i < len; i++) {
		output += String.fromCharCode(input.charCodeAt(i) + seed);
	}
	return output;
}