var RW_BRMI;

(function($){

	RW_BRMI = {

		function_holder : null,
		/**
		 * Init
		 */
		init: function() {

			this.generateButtonMarkup();
			this.addInteractivity();

			//save the old methods we're over-ridding
			this.function_holder = wpNavMenu.addMenuItemToBottom;

			//replace current functionality with custom
			wpNavMenu.addMenuItemToBottom = this.bmriAddMenuToBottom;
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


		addInteractivity : function() {
			var that = this;

			$('#menu-to-edit').on('change','.awpm-check', function(){
				that.setButtonStatus();
			});

			$(document).on('click', '.remove-checked-items', function(e){
				e.preventDefault();
				$.each( $('.awpm-check:checked'), function( index, element) {
					$(element).parents('li').find('a.item-delete').trigger('click');
				});

				$('.remove-checked-items').prop('disabled', true);
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

			$(menuMarkup).hideAdvancedMenuItemFields().insertAfter( wpNavMenu.targetList.find( '.awpm-check:checked' ).parents( 'li' ) );
			wpNavMenu.refreshKeyboardAccessibility();
			wpNavMenu.refreshAdvancedAccessibility();
		}
	};

	//start the show
	jQuery(document).ready(function($) { RW_BRMI.init(); });
})(jQuery);