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
		
		console.log('processing:', 'success');
	}
	
};

$(function(){
	
	// ready
	console.log('app Ready');
	
	// openFile
	$('#openFile').click(function(){
		
		$('input#jsonFile')
        .trigger('click')
        .change(function(){
            // uploadFile($(this).prop('files')[0]);
            app.file.read($(this).prop('files')[0]);
			$(this).off();
        });
		
	});
	
	// saveFile
	$('#saveFile').click(function(){
		app.file.save( JSON.stringify(app.data.root, null, 4), 'yourFile.json', 'text/plain' );
	});

});