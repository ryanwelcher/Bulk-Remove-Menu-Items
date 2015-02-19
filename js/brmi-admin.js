var RW_BRMI;

(function($){

	RW_BRMI = {

		/**
		 * Init
		 */
		init: function() {

			this.generateButtonMarkup();
			this.addInteractivity();
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
				'class' : 'button button remove-checked-items',
				'value' : BRMI_TEXTS.button_text,
				'style'	: 'margin-right:5px;padding:0 0 0 20px;',
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


			/**
			 * Responding to the core event
			 */
			$( document ).on('nav-menu-item-added-to-bottom', function( event, new_item ) {

				var menu = $( document.getElementById( 'menu-to-edit' )),
					checked_li = menu.find('.awpm-check:checked').parents('li');

				if( checked_li.length > 0 ) {
					menu.find( '.awpm-check:checked' ).parents('li').after( new_item.clone() );
					new_item.after( $( '#menu-to-edit li:last-child' ) ).remove();
				}
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
		}
	};

	//start the show
	jQuery(document).ready(function($) { RW_BRMI.init(); });
})(jQuery);