// JavaScript Document
/*eslint-disable no-console*/
/*global window app*/

$(function(){
	
	var $popUp = $('#popUpBox');
	
	app.tools = {
		
		showPopup: function(key, val){
			
			$('i', $popUp).text(key);
			
			$('textarea', $popUp)
				.val(val)
				.on('change keyup paste', function(){
				
					app.tools.setProp(key, $(this).val());
				});
			
			$popUp.show();
		},

		hidePopup: function(){
			
			$('textarea', $popUp).off();
			$('a:last', '#node').trigger('click');
			$popUp.hide();
		},
		
		setProp: function(key, val){
			
			var obj = app.data;
			var path = (app.node.current + '.' + key).split('.');
				
			while(path.length > 1){ obj = obj[path.shift()]; }
				
			obj[path.shift()] = val;
		}
	}
});