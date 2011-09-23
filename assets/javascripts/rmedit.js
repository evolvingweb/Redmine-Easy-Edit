jQuery(function ($) {
 	
	var highlightOnClick = function(highlightSet) {
		var that = this;
  	// For Alex's irreversible habits...
  	if (event && ! event.ctrlKey) {
  		return;
  	}
		// Make sure multiple clicks don't start a highlight/rehighlight queue.
		if (this.effectRunning) {
			return;
		}
		this.effectRunning = true;
		
		if (!highlightSet) {
			highlightSet = $(this);
		}
		highlightSet.effect("highlight", {}, 2000, function () {that.effectRunning = false;});
	};
	
//	Literally.
	var doWhatRedmineDoes = function (elements) {
		// For Alex's irreversible habits...
		if (! event.ctrlKey) {
			return;
		}
		$(elements).each(
			function (index, element) {
		  	if ($(element).attr('onclick')) {
		  		$(element).click();
		  	}
		  	else {
		  		document.location = $(element).attr('href');
		  	}		
			}
		)
	}
	
// 	Click handler for wiki pages.
  $('body.controller-wiki .wiki')
	  .dblclick(function (event) {
	  	doWhatRedmineDoes('body.controller-wiki #content .contextual a:contains("Edit")');
	  });
  
//  Subtask editing
  $('body.controller-issues #issue_tree')
  	.dblclick(function (event) {
	  	doWhatRedmineDoes($(this).find('.contextual a:contains("Add")'));
	  })
	  .click(function (event) {highlightOnClick.call(this);});
  
//  Issue comments
  $('body.controller-issues .wiki.editable')
    .dblclick(function (event) {
  		doWhatRedmineDoes($(this).find('.contextual a[title="Edit"]'));
    })
    .click(function (event) {highlightOnClick.call(this);});
  
// Update issue 
  $('body.controller-issues .issue.details .attributes')
  	.dblclick(function (event) {
	  	doWhatRedmineDoes('#content .contextual a:contains("Update")');
	  })
	  .click(function (event) {highlightOnClick.call(this);});
  
// Edit description
  var set = $('body.controller-issues .issue.details .wiki').prev().andSelf();
  	set.dblclick(function (event) {
	  	doWhatRedmineDoes('#content .contextual a:contains("Update"), #update .tabular legend a:contains("More")');
	  })
	  .click(function (event) {highlightOnClick.call(this, set);});
  	
// Related issues
  $('body.controller-issues #relations').dblclick(function (event) {
  	doWhatRedmineDoes($(this).find('.contextual a:contains("Add")'));
  })
  .click(function (event) {highlightOnClick.call(this);});
  
});

