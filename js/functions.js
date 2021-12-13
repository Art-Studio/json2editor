// JavaScript Document
/*eslint-disable no-console*/
/*global window app*/

var app = {
	
	data: {
		root: '' // save json here
	},
	
	// processing
	processing: function (data){
		app.data.root = data;
		
		console.log('processing ->');
		console.log(app);
		
		app.node.history = {};
		app.node.current = '';
		app.node.get('root');
		
		$('#nodeBox').show();

		$('#mainBox').addClass('ready');
		$('#saveFile').removeAttr('disabled');
		console.log('processing:', 'success');
	}
	
};

$(function(){

	// ready
	console.log('app Ready');
	
	// close menu after click
    $('.menu').off().click(function(){
        var $this = $(this);
        $this.addClass('hide');
        setTimeout(function(){ $this.removeClass('hide'); }, 99);
    });
});