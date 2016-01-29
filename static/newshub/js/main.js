function delete_comment_fun(elem){
  elem.ajaxForm({success: function(data){
    if(data.success){
      toastr.success('Success!');
      $('#delete_comment_modal_'+data.comment_pk).modal('hide');
      $('#article_comment_'+data.comment_pk).slideUp('1000', function(){
        $(this).remove();
          delete_comment_fun($('.delete-comment-form'));
          edit_comment_fun($('.edit-comment-form'));
      });
    }
  }, clearForm: true});
}

function edit_comment_fun(elem){
  data_parent_modal = elem.attr('data-parent-modal');
  data_parent_section = elem.attr('data-parent-section');
  elem.ajaxForm({success:function(data){
    toastr.success('Success!');
    $.when($(data_parent_modal).modal('hide').remove()).then(function(){ 
      $('body').removeClass('modal-open');
      $('.modal-backdrop').remove();
      $(data_parent_section).replaceWith(data);
      delete_comment_fun($('.delete-comment-form'));
      edit_comment_fun($('.edit-comment-form'));
    });
  }});
}

$(document).ready(function(){
  toastr.options = {
    "closeButton": true,
    "debug": false,
    "newestOnTop": false,
    "progressBar": false,
    "positionClass": "toast-top-right",
    "preventDuplicates": false,
    "onclick": null,
    "showDuration": "300",
    "hideDuration": "1000",
    "timeOut": "2000",
    "extendedTimeOut": "1000",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
  }

  delete_comment_fun($('.delete-comment-form'));
  edit_comment_fun($('.edit-comment-form'));

	$(".follow-button").click(function(){
		$this = $(this);
    $author_id = $this.parent().attr("data-author-id");
		$.ajax({
			url: '/action/follow/',
			dataType: 'json',
			data: {'author': $author_id},
			method: 'GET',
			success: function(data){
				if(data.created){
          $('[data-author-id='+$author_id+'] .follow-button').addClass('btn-active').html('Followed');
				} else {
          $('[data-author-id='+$author_id+'] .follow-button').removeClass('btn-active').html('Follow');
				}
			}
		})
	});
	$(".endorse-button").click(function(){
		$this = $(this);
    $author_id = $this.parent().attr("data-author-id");
		$.ajax({
			url: '/action/endorse/',
			dataType: 'json',
			data: {'author': $author_id},
			method: 'GET',
			success: function(data){
				if(data.created && data.success){
          $('div[data-author-id='+$author_id+'] .endorse-button').addClass('btn-active').html('Endorsed');
				} else {
          $('div[data-author-id='+$author_id+'] .endorse-button').removeClass('btn-active').html('Endorse');
				}
			}
		});
	});

	$(".like-button p").click(function(){
		$this = $(this);
		$.ajax({
			url: '/action/like/',
			dataType: 'json',
			data: {'article': $this.attr("data-article-id")},
			method: 'GET',
			success: function(data){
				if(data.created){
					$this.children('.like-text').html('LIKED').parent().addClass('active');
          $this.children('.like-liked').hide();
          $this.children('.like-like').show();
				} else {
					$this.children('.like-text').html('LIKE').parent().removeClass('active');
          $this.children('.like-like').hide();
          $this.children('.like-liked').show();
				}
			}
		});
	});

	if (location.hash !== '') $('a[href="' + location.hash + '"]').tab('show');
    $('a[data-toggle="pill"]').on('click', function(e) {
      return location.hash = $(e.target).attr('href').substr(1);
    });

  $('#article_comment_form').ajaxForm({success: function(data) { 
    $('.article-comments-section').prepend(data);
    var new_elem = $('.article-comments-section div:first-child');
    delete_comment_fun($('.delete-comment-form'));
    edit_comment_fun($('.edit-comment-form'));
  }, clearForm: true}); 

  $('#add_new_tag_form').ajaxForm({success:function(data){
    if(data.success){
      toastr.success('Success!');
      s2val = $("#id_tags").select2('val');
      if (s2val === null) s2val = [];
      s2val = s2val.concat(data.tag.id);
      $('#id_tags')
         .append($("<option></option>")
         .attr("value",data.tag.id)
         .text(data.tag.name)); 
      $("#id_tags").select2('val', s2val);
    }
    else{
      toastr.error(data.error_msg);
    }
  }, clearForm: true});

  $('.feature-article-form').ajaxForm({success: function(data){
    if(data.success){
      toastr.success('Success!');
      if(data.feature){
        $('button[form="feature_article_form_'+data.id_article+'"]').html('Unfeature').addClass('btn-active');
      }
      else{
        $('button[form="feature_article_form_'+data.id_article+'"]').html('Feature').removeClass('btn-active');
      }
    }
    else{
      toastr.error(data.error);
    }
  }, clearForm: true});

  $('.feedback-pill a').click(function(e){
    e.preventDefault();
    $url = $(this).attr("href");
    $this = $(this);
    $.ajax({
      'method': 'get',
      'url': $url,
      'success': function(data){
        if(data=='success'){
          $('p.no-comment').remove();
          if($this.hasClass('active')){
            $this.removeClass('active').blur();
          }
          else{
            $this.addClass('active').blur();
          }
        }
      }
    });
  });
});
$('.nav-stacked > li').hover(function() {
    $(this).siblings().addClass("sibling-hover");
}, function() {
    $(this).siblings().removeClass("sibling-hover");
});

function debounce(func, wait, immediate) {
  var timeout;
  return function() {
    var context = this, args = arguments;
    var later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
};

var myEfficientFn = debounce(function() {
  if($(window).width() > 768){
    $('.affixed-sidebar').stop().animate({
      top: $(this).scrollTop()
    });
  }
}, 250);

window.addEventListener('scroll', myEfficientFn);
/* $(window).scroll(function() {
  $('.affixed-sidebar').stop().animate({
    marginTop: $(this).scrollTop()
  });
}); */
/*!
 * jQuery Plugin: Are-You-Sure (Dirty Form Detection)
 * https://github.com/codedance/jquery.AreYouSure/
 *
 * Copyright (c) 2012-2014, Chris Dance and PaperCut Software http://www.papercut.com/
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * Author:  chris.dance@papercut.com
 * Version: 1.9.0
 * Date:    13th August 2014
 */
(function($) {
  
  $.fn.areYouSure = function(options) {
      
    var settings = $.extend(
      {
        'message' : 'You have unsaved changes!',
        'dirtyClass' : 'dirty',
        'change' : null,
        'silent' : false,
        'addRemoveFieldsMarksDirty' : false,
        'fieldEvents' : 'change keyup propertychange input',
        'fieldSelector': ":input:not(input[type=submit]):not(input[type=button])"
      }, options);

    var getValue = function($field) {
      if ($field.hasClass('ays-ignore')
          || $field.hasClass('aysIgnore')
          || $field.attr('data-ays-ignore')
          || $field.attr('name') === undefined) {
        return null;
      }

      if ($field.is(':disabled')) {
        return 'ays-disabled';
      }

      var val;
      var type = $field.attr('type');
      if ($field.is('select')) {
        type = 'select';
      }

      switch (type) {
        case 'checkbox':
        case 'radio':
          val = $field.is(':checked');
          break;
        case 'select':
          val = '';
          $field.find('option').each(function(o) {
            var $option = $(this);
            if ($option.is(':selected')) {
              val += $option.val();
            }
          });
          break;
        default:
          val = $field.val();
      }

      return val;
    };

    var storeOrigValue = function($field) {
      $field.data('ays-orig', getValue($field));
    };

    var checkForm = function(evt) {

      var isFieldDirty = function($field) {
        var origValue = $field.data('ays-orig');
        if (undefined === origValue) {
          return false;
        }
        return (getValue($field) != origValue);
      };

      var $form = ($(this).is('form')) 
                    ? $(this)
                    : $(this).parents('form');

      // Test on the target first as it's the most likely to be dirty
      if (isFieldDirty($(evt.target))) {
        setDirtyStatus($form, true);
        return;
      }

      $fields = $form.find(settings.fieldSelector);

      if (settings.addRemoveFieldsMarksDirty) {              
        // Check if field count has changed
        var origCount = $form.data("ays-orig-field-count");
        if (origCount != $fields.length) {
          setDirtyStatus($form, true);
          return;
        }
      }

      // Brute force - check each field
      var isDirty = false;
      $fields.each(function() {
        $field = $(this);
        if (isFieldDirty($field)) {
          isDirty = true;
          return false; // break
        }
      });
      
      setDirtyStatus($form, isDirty);
    };

    var initForm = function($form) {
      var fields = $form.find(settings.fieldSelector);
      $(fields).each(function() { storeOrigValue($(this)); });
      $(fields).unbind(settings.fieldEvents, checkForm);
      $(fields).bind(settings.fieldEvents, checkForm);
      $form.data("ays-orig-field-count", $(fields).length);
      setDirtyStatus($form, false);
    };

    var setDirtyStatus = function($form, isDirty) {
      var changed = isDirty != $form.hasClass(settings.dirtyClass);
      $form.toggleClass(settings.dirtyClass, isDirty);
        
      // Fire change event if required
      if (changed) {
        if (settings.change) settings.change.call($form, $form);

        if (isDirty) $form.trigger('dirty.areYouSure', [$form]);
        if (!isDirty) $form.trigger('clean.areYouSure', [$form]);
        $form.trigger('change.areYouSure', [$form]);
      }
    };

    var rescan = function() {
      var $form = $(this);
      var fields = $form.find(settings.fieldSelector);
      $(fields).each(function() {
        var $field = $(this);
        if (!$field.data('ays-orig')) {
          storeOrigValue($field);
          $field.bind(settings.fieldEvents, checkForm);
        }
      });
      // Check for changes while we're here
      $form.trigger('checkform.areYouSure');
    };

    var reinitialize = function() {
      initForm($(this));
    }

    if (!settings.silent && !window.aysUnloadSet) {
      window.aysUnloadSet = true;
      $(window).bind('beforeunload', function() {
        $dirtyForms = $("form").filter('.' + settings.dirtyClass);
        if ($dirtyForms.length == 0) {
          return;
        }
        // Prevent multiple prompts - seen on Chrome and IE
        if (navigator.userAgent.toLowerCase().match(/msie|chrome/)) {
          if (window.aysHasPrompted) {
            return;
          }
          window.aysHasPrompted = true;
          window.setTimeout(function() {window.aysHasPrompted = false;}, 900);
        }
        return settings.message;
      });
    }

    return this.each(function(elem) {
      if (!$(this).is('form')) {
        return;
      }
      var $form = $(this);
        
      $form.submit(function() {
        $form.removeClass(settings.dirtyClass);
      });
      $form.bind('reset', function() { setDirtyStatus($form, false); });
      // Add a custom events
      $form.bind('rescan.areYouSure', rescan);
      $form.bind('reinitialize.areYouSure', reinitialize);
      $form.bind('checkform.areYouSure', checkForm);
      initForm($form);
    });
  };
})(jQuery);