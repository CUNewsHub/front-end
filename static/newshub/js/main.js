$(document).ready(function(){
	$(".follow-button").click(function(){
		$this = $(this);
		$.ajax({
			url: '/action/follow/',
			dataType: 'json',
			data: {'author': $this.parent().attr("data-author-id")},
			method: 'GET',
			success: function(data){
				if(data.created){
					$this.html('Followed').addClass('btn-active');
				} else {
					$this.html('Follow').removeClass('btn-active');
				}
			}
		})
	});
	$(".endorse-button").click(function(){
		$this = $(this);
		$.ajax({
			url: '/action/endorse/',
			dataType: 'json',
			data: {'author': $this.parent().attr("data-author-id")},
			method: 'GET',
			success: function(data){
				if(data.created){
					$this.html('Endorsed').addClass('btn-active');
				} else {
					$this.html('Endorse').removeClass('btn-active');
				}
			}
		});
	});

	$(".like-button h3").click(function(){
		$this = $(this);
		$.ajax({
			url: '/action/like/',
			dataType: 'json',
			data: {'article': $this.attr("data-article-id")},
			method: 'GET',
			success: function(data){
				if(data.created){
					$this.children('.like-text').html('LIKED').parent().addClass('active');
				} else {
					$this.children('.like-text').html('LIKE').parent().removeClass('active');
				}
			}
		});
	});

	if (location.hash !== '') $('a[href="' + location.hash + '"]').tab('show');
    $('a[data-toggle="pill"]').on('click', function(e) {
      return location.hash = $(e.target).attr('href').substr(1);
    });
});