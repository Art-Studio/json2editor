// JavaScript Document
/*eslint-disable no-console*/
/*global window app*/

$(function(){
	
	var $node = $('#node');
	
	app.node = {

		current: '',
		
		history: {},
		
		get: function (key){
			
			//console.log('nodeGet ->', key);

			var path = '';
			var output = [];
			var arrPath = [];

			app.node.current += app.node.current ? '.' + key : key;
			arrPath = app.node.current.split('.');

			$.each(arrPath, function(index, thisKey){

				//console.log(key);
				output.push(
					$('<a>', {
						href: '#' + thisKey,
						data: { node: path },
						text: thisKey,
						click: function(){
							app.node.current = $(this).data('node');
							app.node.get(thisKey);
						}
					})
				);

				path += path ? '.' + thisKey : thisKey;
			});
			
			if(!app.node.history[app.node.current]){ app.node.history[app.node.current] = {}; }
			
			$node.html(output);

			//console.log(arrPath);
			app.getObj(arrPath);
		}
	}
	
});