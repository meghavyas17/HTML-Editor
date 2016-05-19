
$( document ).ready(function() {
	var index = 1; // this is used to create unique id for new parapgraphs added
	var state = "completed"; // this variable is used to see if the editor is in editable mode or uneditable mode
	
	/* Handle click on edit button that allows us to edit the paragraphs or bring back non editable state*/
	$(".editor-state").click(function(ev){
		if(state == "completed"){
			state = "editing"; 
			$(".para").first().focus();
			$(this).text("Done");
			// the logic to revert the conversion of <a></a> tags to html links 
			$('.para').attr("contenteditable", "true").text(function(){return  $(this).html()});
			$("body").addClass("editing");
			// disabling sortable
			$('#editor-section').sortable({disabled: true}); 
		} else {
			state = "completed"
			$(this).text("Start Editing");
			// the logic to convert <a></a> tags to html links
			$('.para').attr("contenteditable", "false").html(function(){return  $(this).text()});
			// this sortable function allows us to drag and drop paragraphs under editor-section
			$("#editor-section").sortable({disabled: false});
			$("body").removeClass("editing");
		}
	});

	// on enter create new papragraph by appending to the html
	$('body').on('keyup', '.para', function(event){
		$("#tooltip").hide();
		if (event.which == 13) {
			event.preventDefault();
			var editorSection = $('#editor-section');
			index = index + 1;
			var pTag = '<div class="para-wrapper"><p class="para para'+ index + '" contenteditable="true">  </p></div>';
			$(event.target).closest('.para-wrapper').after(pTag);
			$(".para" + index).focus();
			return false;
		}
	});

	// the bold, italic and red color functionality of tooltip
	$("#tooltip span").click(function(ev){
		console.log("clicked");
		var textFormatValue = ev.target.className;
		console.log(textFormatValue.trim());

		if( textFormatValue.trim() =="red"){
			document.execCommand("ForeColor", false, "red");
		}else{
			document.execCommand(textFormatValue, false, null);
		}
	});

	// to show tooltip and set its position at the place where text is highlighted or double clicked
	var showToolTip = function (){
		selection = window.getSelection();
		range = selection.getRangeAt(0); 
		rect = range.getBoundingClientRect();
		
		$("#tooltip").css({	left:rect.left,
							top: rect.top - 35
						});

		$("#tooltip").show();
	};

	$("#tooltip span").mousedown(function(event){
		// this is to successfully use execCommand otherwise highlight/selection on text after double click goes way
		event.preventDefault();  
	});
		

	// handling of double click on word in paragraph
	$(document).dblclick(function(e) {
		showToolTip(); // showtooltip function called
	});

});