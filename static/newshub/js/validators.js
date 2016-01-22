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

});