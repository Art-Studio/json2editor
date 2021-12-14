// JavaScript Document
/*eslint-disable no-console*/
/*global window app*/

$(function(){
	
	var _key = '';
	var _val = '';
	var _type = '';
	
	var $window = $(window);
	var $popUp = $('#popUpBox');
	
	app.tools = {
		
		exec: function(key, val, type){
			
			_key = key;
			_val = val;
			_type = type;
			
			if(_type === 'newNode'){
				$('#info2', $popUp).text('Create a node in JSON format:');
			} else {
				$('#info2', $popUp).text('Value:');
			}
			
			if(_type === 'newProp' || _type === 'newNode'){
				$('input', $popUp).prop('disabled', false);
			} else {
				$('input', $popUp).prop('disabled', true);
			}
			
			$('input', $popUp)
				.val(key)
				.on('change keyup paste', function(){
					if(_type === 'newProp' || _type === 'newNode'){
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
					_val = $(this).val();
				});
			
			$popUp.show();
		}
	}
	
	function newObj(key, val){
			
        var obj = app.data;
        var path = (app.node.current + '.' + key).split('.');

        while(path.length > 1){ obj = obj[path.shift()]; }

        obj[path.shift()] = val;
    }
	
	// close popUp
	$('.popUpClose', $popUp).click(function(){
		
		if(_type === 'newNode' && _key !== 'node_name' && _key){
			//newObj(_key, JSON.parse($('textarea', $popUp).val()));
			newObj(_key, $.parseJSON($('textarea', $popUp).val()));
			//app.node.history = {};
			app.node.history[app.node.current] = {}; // update
		}else{
			if(_key !== 'prop_name' && _key !== 'node_name' && _key){
				newObj(_key, _val);
			}
		}
		
		$('textarea', $popUp).off();
        $('a:last', '#node').trigger('click'); // update
        $popUp.hide();
	});
	
	// new node
	$('#newNode').click(function(){
        app.tools.exec('node_name', '{}', 'newNode');
        console.log('createNode');
    });
	
	// new prop
	$('#newProp').click(function(){
        app.tools.exec('prop_name', 'propValue', 'newProp');
        console.log('createProp');
    });
	
});