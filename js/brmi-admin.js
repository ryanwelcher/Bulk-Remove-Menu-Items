var RW_BRMI;

(function($){

	RW_BRMI = {

		function_holder : {

		},

		/**
		 * Init
		 */
		init: function() {

			this.generateButtonMarkup();
			this.addInteractivity();

			////save the old methods we're over-ridding
			//this.function_holder.addMenuItemToBottom = wpNavMenu.addMenuItemToBottom;
			//
			////replace current functionality with custom
			//wpNavMenu.addMenuItemToBottom = this.bmriAddMenuToBottom;
		},

		/**
		 * Generates the remove button and adds it to the html
	
		 */
		generateButtonMarkup : function() {
			var div, button;
			div = $('<div/>',{
				'class' : 'publishing-action'
			});

			button = $('<input/>',{
				'class' : 'button button-primary remove-checked-items',
				'value' : BRMI_TEXTS.button_text,
				'style'	: 'margin-right:10px;',
				'disabled' : 'disabled'
			});
			div.append( button  );

			$('.major-publishing-actions').append( div );
		},

		/**
		 * Recursively checks child items for checked menu item
		 * @todo Currently only works on top level items
		 */
		
		addInteractivity : function() {
			var that = this;

			$('#menu-to-edit').on('change','.awpm-check', function(){
				var parent_li = $(this).parents('li'),
				classes = parent_li.attr('class').split(" ");
				if( $.inArray( 'menu-item-depth-0', classes ) !== -1 ) {
					$.each( parent_li.nextAll(), function( index, element ){
						if( $(element).hasClass( 'menu-item-depth-0' ) ) {
							return false;
						}else{
							$(element).find('.awpm-check').prop('checked', true);
						}
					});
				}
				that.setButtonStatus();
			});

			$(document).on('click', '.remove-checked-items', function(e){
				e.preventDefault();
				$.each( $('.awpm-check:checked'), function( index, element) {
					$(element).parents('li').find('a.item-delete').trigger('click');
				});

				$('.remove-checked-items').prop('disabled', true);
			});

			$( document ).on('nav-menu-item-added-to-bottom', function( event, new_item ) {

				checked_li = $('#menu-to-edit').find('.awpm-check:checked').parents('li');

				if( checked_li.length > 0 ) {
					//new_item.removeClass( 'menu-item-depth-0' ).addClass( 'menu-item-depth-1' );
					$('#menu-to-edit').find('.awpm-check:checked').parents('li').after( new_item.clone() );
					new_item.after( $('#menu-to-edit li:last-child') ).remove();
				}




				//$('#menu-to-edit').find('.awpm-check:checked').parents('li').after(new_item.remove() );

				//$checked_li = $('#menu-to-edit').find('.awpm-check:checked').parents('li');
				//
				//console.log( $checked_li  );
				//
				////new_item.remove();
				//
				//new_item.insertAfter( $('#menu-to-edit').find('.awpm-check:checked').parents('li') );
				//new_item.remove();
				//console.log ( 'did you just add a menu item?', new_item );
			});
		},

		/**
		 * Enable/disable the button based on checked items
		 */
		setButtonStatus : function(){
			var button = $('.remove-checked-items');

			if( $('.awpm-check:checked').length > 0 ) {
				button.prop('disabled', false);
			}else{
				button.prop('disabled', true);
			}
		},

		/**
		 * Overrides the built in addMenuToBottom method
		 */
		bmriAddMenuToBottom : function ( menuMarkup ) {

			console.log( wpNavMenu.targetList.find('.awpm-check:checked').parents('li') );

			//$(menuMarkup).hideAdvancedMenuItemFields().appendTo( wpNavMenu.targetList.find('.awpm-check:checked').parents('#menu-to-edit') );
			$(menuMarkup).hideAdvancedMenuItemFields().insertAfter( wpNavMenu.targetList.find('.awpm-check:checked').parents('li') );
			wpNavMenu.refreshKeyboardAccessibility();
			wpNavMenu.refreshAdvancedAccessibility();
		}
	};

	//start the show
	jQuery(document).ready(function($) { RW_BRMI.init(); });
})(jQuery);