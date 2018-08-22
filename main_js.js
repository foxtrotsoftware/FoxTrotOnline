$( document ).ready( function(){

	/**
	 * Hide loader div on page load
	 */
	$(".loader").hide();

	/**
	 * Toggle sidebar
	 */
	$( '.navbar-toggler' ).click( function(){
		var is_shown = $( '.sidebar' ).attr( 'style' );
		if( is_shown == undefined ){
			$( '.sidebar' ).attr( 'style', 'display:block !important' );
		}else{
			$( '.sidebar' ).removeAttr( 'style' );
		}
	} );


	/**
	Disable/Enable the dates input fields according to the checkbox 'checked' state.
	 */
	$( '#all_dates_checkbox' ).click( function(){
		var is_checked = $( '#all_dates_checkbox' )["0"].checked;  //if true - means it became checked after clicking,
		if( is_checked == true ){
			$( '.dates_form input[type=date]' ).prop( "disabled", true );
			$.post( 'junction.php', $( '#activity_form' ).serialize(), function( data ){
				var json_obj = $.parseJSON( data );
				if( json_obj.status == true ){
					$( "#activity_table" ).DataTable().destroy();
					$( "#activity_table tbody" ).html( json_obj.data_arr['activity_table'] );

					var currentDate = new Date();
					var top_massage = 'Created: ' + currentDate.getMonth() + '/' + currentDate.getDate() + '/' + currentDate.getFullYear() + ' ' + currentDate.getHours() + ':' + currentDate.getMinutes();
					const months_names = ["January", "February", "March", "April", "May", "June",
						"July", "August", "September", "October", "November", "December"
					];
					var file_name = 'Transaction Activity ' + currentDate.getDate() + ' ' + months_names[currentDate.getMonth()] + ' ' + currentDate.getFullYear();
					var pdf_title = json_obj.data_arr.pdf_title_first_line + '\n\r' + json_obj.data_arr.pdf_title_second_line;
					var excel_title = json_obj.data_arr.pdf_title_first_line + ' - ' + json_obj.data_arr.pdf_title_second_line;
					$( '#activity_table' ).DataTable( {
						searching: false,
						paging: false,
						info: false,
						dom: 'Bfrtip',
						buttons: [
							{
								extend: 'excelHtml5',
								orientation: 'landscape',
								filename: file_name,
								messageTop: top_massage,
								title: excel_title
							},
							{
								extend: 'pdfHtml5',
								orientation: 'landscape',
								filename: file_name,
								messageTop: top_massage,
								title: pdf_title
							}
						]
					} );

					$( '.buttons-html5' ).addClass( 'btn btn-secondary' );

					$( "#activity_boxes_container_div" ).html( json_obj.data_arr['activity_boxes'] );
					$( ".server_response_div .alert" ).removeClass( 'alert-warning alert-danger' ).addClass( 'alert-success' ).text( 'Table generated successfully.' ).show();
				}else{ //If there is an error
					$( ".server_response_div .alert" ).text( json_obj.error_message ).show();
					if( json_obj.error_level == 0 ){
						$( ".server_response_div .alert" ).removeClass( 'alert-success alert-danger' ).addClass( 'alert-warning' );
					}else{
						$( ".server_response_div .alert" ).removeClass( 'alert-success alert-warning' ).addClass( 'alert-danger' );
					}
				}
			} );
		}else{
			$( '.dates_form input[type=date]' ).prop( "disabled", false );
		}
	} );


	/**
	Changes data attribute of html pdf embed (object) after choosing a pdf to view
	And the buttons Download and Open.
	 */
	$( '#statements_select' ).change( function(){
		var value_of_selected_option = $( this ).find( "option:selected" ).attr( "value" );
		if( value_of_selected_option != "none" ){
			var company_name = window.company_name;
			$( '#statement_pdf_object' ).attr( 'data', company_name + '/data/' + value_of_selected_option + '#view=Fit' );
			$( '.statement_toolbar' ).attr( 'href', company_name + '/data/' + value_of_selected_option );
		}
	} );

	/**
	Log in form submit
	 */
	$( "#log_in_form" ).submit( function(){
		event.preventDefault(); //Prevent the form from submitting normally
		$.post( 'junction.php', $( '#log_in_form' ).serialize(), function( data ){
			var json_obj = $.parseJSON( data );
			if( json_obj.status == true ){
				window.location.replace( "dashboard.php" );
			}else{ //If there is an error
				$( "#log_in_form .server_response_div .alert" ).text( json_obj.error_message ).show();
				if( json_obj.error_level == 0 ){
					$( "#log_in_form .server_response_div .alert" ).removeClass( 'alert-danger' ).addClass( 'alert-warning' );
				}else{
					$( "#log_in_form .server_response_div .alert" ).removeClass( 'alert-warning' ).addClass( 'alert-danger' );
				}
			}
		} );
	} );


	/**
	Autofocus on Select input when forgot_password modal is opened.
	 */
	$( '#forgot_password_modal' ).on( 'shown.bs.modal', function(){
		$( '#forgot_password_modal select' ).trigger( 'focus' )
	} );


	/**
	Forgot password form submit
	 */
	$( "#forgot_password_form" ).submit( function(){
		event.preventDefault(); //Prevent the form from submitting normally
		$.post( 'junction.php', $( '#forgot_password_form' ).serialize(), function( data ){
			var json_obj = $.parseJSON( data );
			if( json_obj.status == true ){
				$( "#forgot_password_form .server_response_div .alert" ).removeClass( 'alert-warning alert-danger' ).addClass( 'alert-success' ).text( 'Password and username sent to your E-mail. Check your inbox for mails from FoxTrot Online.' ).show();
			}else{ //If there is an error
				$( "#forgot_password_form .server_response_div .alert" ).text( json_obj.error_message ).show();
				if( json_obj.error_level == 0 ){
					$( "#forgot_password_form .server_response_div .alert" ).removeClass( 'alert-success alert-danger' ).addClass( 'alert-warning' );
				}else{
					$( "#forgot_password_form .server_response_div .alert" ).removeClass( 'alert-success alert-warning' ).addClass( 'alert-danger' );
				}
			}
		} );
	} );


	/**
	Activity form submit
	 */
	$( "#activity_form" ).submit( function(){
		event.preventDefault(); //Prevent the form from submitting normally
		$.post( 'junction.php', $( '#activity_form' ).serialize(), function( data ){
			var json_obj = $.parseJSON( data );
			if( json_obj.status == true ){
				$( "#activity_table" ).DataTable().destroy();
				$( "#activity_table tbody" ).html( json_obj.data_arr['activity_table'] );

				var currentDate = new Date();
				var top_massage = 'Created: ' + currentDate.getMonth() + '/' + currentDate.getDate() + '/' + currentDate.getFullYear() + ' ' + currentDate.getHours() + ':' + currentDate.getMinutes();
				const months_names = ["January", "February", "March", "April", "May", "June",
					"July", "August", "September", "October", "November", "December"
				];
				var file_name = 'Transaction Activity ' + currentDate.getDate() + ' ' + months_names[currentDate.getMonth()] + ' ' + currentDate.getFullYear();
				var pdf_title = json_obj.data_arr.pdf_title_first_line + '\n\r' + json_obj.data_arr.pdf_title_second_line;
				var excel_title = json_obj.data_arr.pdf_title_first_line + ' - ' + json_obj.data_arr.pdf_title_second_line;
				$( '#activity_table' ).DataTable( {
					searching: false,
					paging: false,
					info: false,
					dom: 'Bfrtip',
					buttons: [
						{
							extend: 'excelHtml5',
							orientation: 'landscape',
							filename: file_name,
							messageTop: top_massage,
							title: excel_title
						},
						{
							extend: 'pdfHtml5',
							orientation: 'landscape',
							filename: file_name,
							messageTop: top_massage,
							title: pdf_title
						}
					]
				} );

				$( '.buttons-html5' ).addClass( 'btn btn-secondary' );

				$( "#activity_boxes_container_div" ).html( json_obj.data_arr['activity_boxes'] );
				$( ".server_response_div .alert" ).removeClass( 'alert-warning alert-danger' ).addClass( 'alert-success' ).text( 'Table generated successfully.' ).show();
			}else{ //If there is an error
				$( ".server_response_div .alert" ).text( json_obj.error_message ).show();
				if( json_obj.error_level == 0 ){
					$( ".server_response_div .alert" ).removeClass( 'alert-success alert-danger' ).addClass( 'alert-warning' );
				}else{
					$( ".server_response_div .alert" ).removeClass( 'alert-success alert-warning' ).addClass( 'alert-danger' );
				}
			}
		} );
	} );


	/**
	Reports form - changed selection.
	 */
	$( '#time_periods_select' ).change( function(){ //On change of drop down list
		var id_of_selected_option = $( this ).find( "option:selected" ).attr( "id" );
		if( id_of_selected_option == 'dates_form_option_all_dates' ){
			$( '#reports_form_dates_radios_div input' ).prop( "disabled", true );
			$( '.hidden_form_div input' ).prop( "disabled", true );
		}else{
			$( '#reports_form_dates_radios_div input' ).prop( "disabled", false );
			if( id_of_selected_option == "dates_form_option_custom" ){ //Check if the selected option was 'Custom'
				$( '.hidden_form_div' ).show(); //If so - show the hidden div with the dates input.
				$( '.hidden_form_div input' ).prop( "disabled", false );
			}else{
				$( '.hidden_form_div' ).hide(); //Hide the hidden div with the dates input.
				$( '.hidden_form_div input' ).prop( "disabled", true );
			}

		}
		// else
		// 	{ //If Option selected is not 'Custom' or 'Choose from the list'
		// $.post( 'junction.php', $( '#reports_form' ).serialize(), function( data ){ //Send the form to the server.
		// 	var json_obj = $.parseJSON( data );
		// 	if( json_obj.status == true ){
		// 		pie_chart.data = $.parseJSON(json_obj.data_arr.pie_chart_data);
		// 		pie_chart.update();
		// 		line_chart.data = $.parseJSON(json_obj.data_arr.line_chart_data);
		// 		line_chart.update();
		// 		$("#reports_table").html(json_obj.data_arr['reports_table_html']);
		// 		$( ".server_response_div .alert" ).removeClass('alert-warning alert-danger').addClass( 'alert-success' ).text( 'Data generated successfully.' ).show();
		// 	}else{ //If there is an error
		// 		$( ".server_response_div .alert" ).text( json_obj.error_message ).show();
		// 		if( json_obj.error_level == 0 ){
		// 			$( ".server_response_div .alert" ).removeClass('alert-success alert-danger').addClass( 'alert-warning' );
		// 		}else{
		// 			$( ".server_response_div .alert" ).removeClass('alert-success alert-warning').addClass( 'alert-danger' );
		// 		}
		// 	}
		// } );
		// }
	} );


	/**
	Reports form submit
	 */
	$( "#reports_form" ).submit( function(){
		event.preventDefault(); //Prevent the form from submitting normally
		$.post( 'junction.php', $( '#reports_form' ).serialize(), function( data ){
			var json_obj = $.parseJSON( data );
			if( json_obj.status == true ){
				pie_chart.data = $.parseJSON( json_obj.data_arr.pie_chart_data );
				pie_chart.update();
				line_chart.data = $.parseJSON( json_obj.data_arr.line_chart_data );
				line_chart.update();
				$( "#reports_table" ).html( json_obj.data_arr['reports_table_html'] );
				$( ".server_response_div .alert" ).removeClass( 'alert-warning alert-danger' ).addClass( 'alert-success' ).text( 'Data generated successfully.' ).show();
			}else{ //If there is an error
				$( ".server_response_div .alert" ).text( json_obj.error_message ).show();
				if( json_obj.error_level == 0 ){
					$( ".server_response_div .alert" ).removeClass( 'alert-success alert-danger' ).addClass( 'alert-warning' );
				}else{
					$( ".server_response_div .alert" ).removeClass( 'alert-success alert-warning' ).addClass( 'alert-danger' );
				}
			}
		} );
	} );


	/**
	Sign out link
	 */
	$( "#sign_out_fake_link" ).click( function(){
		$.post( "junction.php", {func: 'sign_out', class: 'no_class'}, function( data ){
			var json_obj = $.parseJSON( data );
			if( json_obj.status == true ){
				var get_params = '?company_name=' + json_obj.data_arr['company_name'];
				window.location.replace( "login.php" + get_params );
			}
		} );
	} );


	/**
	 * Drill down pie chart
	 * @param evt
	 */
	$( '#' + chart_id )[0].onclick = function( evt ){
		var activePoints = pie_chart.getElementsAtEvent( evt );
		var date_type = $( '#reports_form input[name=choose_date_radio]:checked' ).val();
		if( activePoints[0] ){
			var chartData = activePoints[0]['_chart'].config.data;
			var idx = activePoints[0]['_index'];

			var label = chartData.labels[idx];
			var value = chartData.datasets[0].data[idx];
			var color = chartData.datasets[0].backgroundColor[idx];

			$.post( "junction.php", {
				func: 'drill_down_pie_chart',
				class: 'no_class',
				chart_id: chart_id,
				label: label,
				value: value,
				color: color,
				date_type: date_type
			}, function( server_response_data ){
				$( '#drill_down_pie_chart_modal' ).modal( 'show' );
				var json_obj = $.parseJSON( server_response_data );
				$( "#drill_down_table_div" ).html( json_obj.data_arr['drill_down_table'] );
			} );
		}

	};


	/**
	 * Check if window is small enough, and if so, move down Pie chart legend
	 */
	if( $( document ).width() < 992 ){
		pie_chart.options.legend.position = 'bottom';
		pie_chart.update();
	}


	/**
	Dashboard form submit
      */
	$( "#dashboard_form" ).submit( function(){
		event.preventDefault(); //Prevent the form from submitting normally
		$.post( 'junction.php', $( '#dashboard_form' ).serialize(), function( data ){
			var json_obj = $.parseJSON( data );
			if( json_obj.status == true ){
				pie_chart.data = $.parseJSON( json_obj.data_arr.pie_chart_data );
				pie_chart.update();
				$("#posted_commission_heading").text(json_obj.data_arr.posted_commission);
				$( ".server_response_div .alert" ).removeClass( 'alert-warning alert-danger' ).addClass( 'alert-success' ).text( 'Data generated successfully.' ).show();
			}else{ //If there is an error
				$( ".server_response_div .alert" ).text( json_obj.error_message ).show();
				if( json_obj.error_level == 0 ){
					$( ".server_response_div .alert" ).removeClass( 'alert-success alert-danger' ).addClass( 'alert-warning' );
				}else{
					$( ".server_response_div .alert" ).removeClass( 'alert-success alert-warning' ).addClass( 'alert-danger' );
				}
			}
		} );
	} );

} );

$(document).on({
	ajaxStart: function() { $(".loader").show();    },
	ajaxStop: function() { $(".loader").hide(); }
	// load: function() {  }
});