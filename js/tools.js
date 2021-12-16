// JavaScript Document
/*eslint-disable no-console*/
/*global window app*/

$(function(){
	
	var _key = '';
	var _val = '';
	var _action = '';
	
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
		
		if(_action === 'deleteObj'){
			delete obj[path.shift()];
		}else{
			obj[path.shift()] = val;
		}
    }
	
	function updateData(action){
		
		_action = action;
		
		if(isNaN(_val) && _action === 'updateObj'){
			try{
				_val = $.parseJSON(_val);
				//app.paginate.init(app.data.root, 500, 1);
			} catch(e) {
				//return false;
			}
		}
		
		if(_action){
			// update node
            //app.node.history = {};
            app.node.history[app.node.current] = {};
			setObj(_key, _val);
		}
		
		$('input, textarea', $popUp).off();
		
		// update prop
        $('a:last', '#node').trigger('click');
	}
	
	// close popUp
	$('.popUpClose', $popUp).click(function(){
		
		updateData();
        $popUp.hide();
	});
	
	// update object
	$('#updateObj', $popUp).click(function(){
		
		updateData('updateObj');
        $popUp.hide();
	});
	
	// delete object
	$('#deleteObj', $popUp).click(function(){
		
		updateData('deleteObj');
        $popUp.hide();
	});
	
	// new node
	$('#newObj').click(function(){
		
        app.tools.getObj('key_name', '{}');
        console.log('createObj');
    });
	
});