// JavaScript Document
/*eslint-disable no-console*/
/*global window app*/

$(function(){
	
	var _key = '';
	var _val = '';
	
	var $window = $(window);
	var $popUp = $('#popUpBox');
	
	app.tools = {
		
		getObj: function(key, val){
			
			_key = key;
			_val = val;
			
			$('input', $popUp)
				.val(key)
				.on('change keyup paste', function(){
					_key = $(this).val();
				});
			
			$('textarea', $popUp)
				.val(val)
				.css({
					maxWidth: $window.width() - 100,
					maxHeight: $window.height() / 1.8
				})
				.on('change keyup paste', function(){
					_val = $(this).val();
				});
			
			$popUp.show();
		}
	}
	
	function setObj(key, val){
			
        var obj = app.data;
        var path = (app.node.current + '.' + key).split('.');

        while(path.length > 1){ obj = obj[path.shift()]; }

        obj[path.shift()] = val;
    }
	
	function updateData(){
		
		if(isNaN(_val)){
			try{
				_val = $.parseJSON(_val);
				// update node
				//app.node.history = {};
				app.node.history[app.node.current] = {};
			} catch(e) {
				//return false;
			}
		}
		
		setObj(_key, _val);
		
		$('input, textarea', $popUp).off();
		
		// update prop
        $('a:last', '#node').trigger('click');
	}
	
	// close popUp
	$('.popUpClose', $popUp).click(function(){
		
		updateData();
        $popUp.hide();
	});
	
	// new node
	$('#newObj').click(function(){
		
        app.tools.getObj('key_name', '{}');
        console.log('createObj');
    });
	
});