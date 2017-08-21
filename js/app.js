'use strict';

var BLOG_ID = 2;

// Hamburger Menu - Animation.
// ----------------------------
(function () {
	$('.hamburger-menu').on('click', function() {
		$('.bar').toggleClass('animate');
	})
})();

// Toggle Comments Container (Open or Closed).
// --------------------------------------------
(function() {
  $('.comments-toggle').on('click', function(event) {
    $(this).parent().next().find('.toggle-container').toggleClass('expand');
    $(this).toggleClass('collapse-img');
  })
})();

// Retrieve comments via Web Service.
// -----------------------------------
$(function () {

	var $comments = $('#comments-ajax');

	// GET INFO FROM DATA FILE
	$.ajax({
		type: 'GET',
		url: 'https://e325wwg595.execute-api.eu-west-1.amazonaws.com/prod/comment?blogId=' + BLOG_ID,
		// url: '/data/comments.json',
		success: function(comments) {
			$.each(comments, function(i, comment) {
				$comments.append('<div class="comments-block"><span class="comment-author">James Dean </span><span class="comment-date">27 April 2017 </span><span class="comment-wrote">- wrote</span><p>' + comment.comment_text + '</p></div>');
			});
		},
		error: function() {
			alert('error loading data from web service');
		}

	}); // end .ajax get DATA

	// ----------------

	$('#post-comment').on('click', function() {

		var comment_input = document.getElementById("comment-input").value;

 		var JSONObject = { "blogId" : 2, "comment_text": comment_input };
        
		$.ajax({
			type: 'POST',
			url: 'https://e325wwg595.execute-api.eu-west-1.amazonaws.com/prod/comment/',
			data: JSON.stringify(JSONObject),
			dataType: 'json',
			success: function(newComment) {

				$comments.append('<div class="comments-block"><span class="comment-author">James Dean </span><span class="comment-date">27 April 2017 </span><span class="comment-wrote">- wrote</span><p>' + newComment.comment_text + '</p></div>');
			},
			error: function(newComment) {

				alert('error saving order');
			}
		});
	});

});
//# sourceMappingURL=app.js.map
