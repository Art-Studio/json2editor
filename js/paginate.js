// JavaScript Document
/*eslint-disable no-console*/
/*global window app*/

$(function(){
	
	var _maxSize;
	var _arr = [];
	
	var $nextNode = $('#nextNode');
	var $paginate = $('#paginate');
	
	app.paginate = {
		
		needPage: '',
		
		init: function(arr, maxSize, page){
			
			//console.log('paginateInit ->', page);
			
			var pages = [];
			var len = Math.round( arr.length / maxSize ) + 1;
			
			_arr = arr;
			_maxSize = maxSize;
			
			if (len > 2){
				
				for(var i = 1; i < len; i++){
					pages.push(
						$('<input>', {
							type: 'button',
							value: i,
							click: function(){
								var page = $(this).val();
								app.node.history[app.node.current].needPage = page;
								app.paginate.getPage(page);
							}
						})
					);
				}
				$('div', $paginate).html(pages).parent().show();
				
			} else {
				$('div', $paginate).html('').parent().hide();
			}
			
			app.paginate.getPage(page);
		},
		
		getPage: function(page){
			
			//console.log('paginateGetPage ->', page);
			
			var output = '';
			var arr = _arr.slice((page - 1) * _maxSize, page * _maxSize);
			
			arr.forEach(function(el) {
				output += '<input type="button" value="' + el.key + '">';
			});
			
			$('div', $nextNode).html(output);
			
			$('input', $nextNode).click(function(){
				app.node.get( $(this).val() );
			})
			
			$('input.now', $paginate).removeAttr('class');
			$('input', $paginate).eq(page - 1).addClass('now');
			
		}
	}
});