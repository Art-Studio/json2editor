// JavaScript Document
/*eslint-disable no-console*/
/*global window app*/

$(function(){
	
	var _fileName = '';

	app.file = {
		
		init: function(){
			// openFile
			$('#openFile').click(function(){

				$('input#jsonFile')
				.trigger('click')
				.change(function(){
					// uploadFile($(this).prop('files')[0]);
					var file = $(this).prop('files')[0];
					if(file){ app.file.read(file); }
					$(this).off();
				});

			});

			// saveFile
			$('#saveFile').click(function(){
				app.file.save( JSON.stringify(app.data.root, null, 4), _fileName, 'text/plain' );
			});
		},
		
		save: function(data, fileName, type){
			var a = document.createElement('a');
			var file = new Blob([data], {type: type});
			a.href = URL.createObjectURL(file);
			a.download = fileName;
			a.click();
		},

		// readFile
		read: function (file){
			console.log('readFile ->');
			console.log(file);

			var fileReader = new FileReader();
			fileReader.readAsText(file);
			fileReader.onload = function(data){

				var result = data.target.result;
				
				try{
					result = $.parseJSON(result);
				} catch(e) {
					result = {};
					alert('JSON ERROR!');
					return false;
				}

				console.log('readFile:', 'success');
				app.processing(result);
				
				$('#saveFile').removeAttr('disabled');
				_fileName = file.name;
			};
		},

		// uploadFile
		upload: function (file){
			var formData = new FormData();

			file.tmpName = file.lastModified + file.size + '.json';
			file.append('file', file, file.tmpName);

			console.log('uploadFile ->', file);
			$.ajax({
				url: 'php/uploadFile.php',
				dataType: 'text',
				cache: false,
				contentType: false,
				processData: false,
				data: formData,
				type: 'post',
				success: function(){
					console.log('uploadFile:', 'success');
					app.file.getJson(file.tmpName);
				}
			});
		},

		// deleteFile
		delete: function (fileName, callback){
			console.log('deleteFile ->');
			$.ajax({
				url: 'php/deleteFile.php',
				data: {fileName: fileName},
				type: 'post',
				success: function(){
					console.log('deleteFile:', 'success');
					if (typeof callback === "function") { callback(); }
				}
			});
		},

		// getJsonFile
		getJson: function (fileName){
			console.log('getJson ->');
			$.getJSON('tmp/' + fileName, function(data) {
				console.log('getJson:', 'success');
				app.file.delete(fileName, function(){
					app.processing(data);
				});
			}).fail(function() {
				console.error('getJson:', 'error');
				app.file.delete(fileName);
			});
		}

	};
	
	app.file.init();
	
});