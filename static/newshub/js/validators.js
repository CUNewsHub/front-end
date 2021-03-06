$(document).ready(function(){
	validators_feedback_icons = {
		valid: 'glyphicon glyphicon-ok',
		invalid: 'glyphicon glyphicon-remove',
		validating: 'glyphicon glyphicon-refresh'
	};

	not_empty_validator = {
		validators:{
			notEmpty:{
				message: 'This field is required'
			}
		}
	}
	$("#add_new_tag_form").bootstrapValidator({
		feedbackIcons: validators_feedback_icons,
		fields:{
			'name':not_empty_validator,
			'category': not_empty_validator
		}
	});

	$("#society_login_form").bootstrapValidator({
		feedbackIcons: validators_feedback_icons,
		fields:{
			'username': not_empty_validator,
			'password': not_empty_validator
		}
	});

	$("#update_profile").bootstrapValidator({
		feedbackIcons: validators_feedback_icons,
		fields: {
			'display_name': not_empty_validator
		}
	});

	$("#article_comment_form").bootstrapValidator({
		feedbackIcons: validators_feedback_icons,
		fields:{
			'text': {
				validators:{
					notEmpty:{
						message: 'You cannot post an empty comment'
					}
				}
			}
		}
	}).on('submit.form.bv', function(e){
		var $form = $(e.target);

	    // Get the BootstrapValidator instance
	    var bv = $form.data('bootstrapValidator');
	    bv.resetForm();
	});

	$("#add_new_poll_form").bootstrapValidator({
		feedbackIcons: validators_feedback_icons,
		fields:{
			'title': not_empty_validator
		}
	});

});