// JavaScript Document
/*eslint-disable no-console*/
/*global window app*/

$(function(){
	
	var _key = '';
	var _type = '';
	
	var $window = $(window);
	var $popUp = $('#popUpBox');
	
	app.tools = {
		
		exec: function(key, val, type){
			
			_key = key;
			_type = type;
			
			if(_type === 'newProp'){
				$('input', $popUp).prop('disabled', false);
			} else {
				$('input', $popUp).prop('disabled', true);
			}
			
			$('input', $popUp)
				.val(key)
				.on('change keyup paste', function(){
					if(_type === 'newProp'){
						_key = $(this).val();
					}
				});
			
			$('textarea', $popUp)
				.val(val)
				.css({
					maxWidth: $window.width() - 100,
					maxHeight: $window.height() / 1.8
				})
				.on('change keyup paste', function(){
					if(_type === 'setProp' || _type === 'newProp' && _key !== 'prop_name'){
						setProp(_key, $(this).val());
					}
				});
			
			$popUp.show();
		},
		
		newNode: function(key, val){
			console.log(key, val);
		},
		
		newProp: function(key, val){
			console.log(key, val);
		}
	}
	
	function setProp(key, val){
			
        var obj = app.data;
        var path = (app.node.current + '.' + key).split('.');

        while(path.length > 1){ obj = obj[path.shift()]; }

        obj[path.shift()] = val;
    }
	
	// close popUp
	$('.popUpClose', $popUp).click(function(){
		
		$('textarea', $popUp).off();
        $('a:last', '#node').trigger('click'); // update
        $popUp.hide();
	});
	
	// new node
	$('#newNode').click(function(){
        app.tools.exec('Node name:', 'node_name', 'newNode');
        console.log('createNode');
    });
	
	// new prop
	$('#newProp').click(function(){
        app.tools.exec('prop_name', 'prop value', 'newProp');
        console.log('createProp');
    });
	
});