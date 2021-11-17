// JavaScript Document
/*eslint-disable no-console*/
/*global window app*/

$(function(){
	
	var $nextNode = $('#nextNode');
	var $prop = $('#prop');
	
	app.getObj = function(arrPath){
		
		//console.log('getObj ->');

		var prop = [];
		var node = [];
		
		var memNode = app.node.history[app.node.current].node;
		if(memNode){ node = memNode; }

		$nextNode.hide();
		$prop.hide();

		// get object from arrPath
		var obj = arrPath.reduce(function(obj, i){ return obj[i]; }, app.data);

		$.each(obj, function(key, value){

			var objType = Array.isArray(value) ? 'array' : typeof value;

			if ((objType === 'array' || objType === 'object') && value !== null){

				if(!memNode){
					node.push({key: key});
				}

			} else {

				value = value === null ? 'null' : value;
				prop.push({key: key, val: value});
			}

			//console.log(key, value);
		});

		// sort by name
		function sortByName(arr){
			arr.sort(function(a, b){
				return new Intl.Collator(undefined, {
					numeric: true,
					sensitivity: 'base'
				}).compare(a.key, b.key);
			});
		}

		if(node.length){
			var page = app.node.history[app.node.current].needPage;
			page = page ? page : 1;

			if(!memNode){
				sortByName(node);
				app.node.history[app.node.current].node = node;
			}
			
			app.paginate.init(node, 500, page);
			$nextNode.show();
		}

		if(prop.length){
			sortByName(prop);
			
			var output = [];
			prop.forEach(function(el) {
				output.push(
					$('<label>', {
						click: function(){
							app.tools.showPopup(el.key, el.val);
						}
					})
					.append( $('<var>', { text: el.key }) )
					.append( $('<var>', { text: el.val }) )
				);
			});
			
			$('div', $prop).html(output);
			
			$prop.show();
		}

	}
	
});