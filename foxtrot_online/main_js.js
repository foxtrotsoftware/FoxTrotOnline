$( document ).ready( function(){
	//Toggle sidebar
	$( '.navbar-toggler' ).click( function(){
		var is_shown = $( '.sidebar' ).attr( 'style' );
		if( is_shown == undefined ){
			$( '.sidebar' ).attr( 'style', 'display:block !important' );
		}else{
			$( '.sidebar' ).removeAttr( 'style' );
		}
	} );


	/*
	Disable/Enable the dates input fields according to the checkbox 'checked' state.
	 */
	$( '#all_dates_checkbox' ).click( function(){
		var is_checked = $( '#all_dates_checkbox' )["0"].checked;  //if true - means it became checked after clicking,
		if( is_checked == true ){
			$( '.dates_form input[type=date]' ).prop( "disabled", true );
		}else{
			$( '.dates_form input[type=date]' ).prop( "disabled", false );
		}
	} );


	/*
	Changes data attribute of html pdf embed (object) after choosing a pdf to view
	And the buttons Download and Open.
	 */
	$( '#statements_select' ).change( function(){
		var value_of_selected_option = $( this ).find( "option:selected" ).attr( "value" );
		if( value_of_selected_option != "none" ){
			$( '#statement_pdf_object' ).attr( 'data', 'company_abc/data/' + value_of_selected_option + '#view=Fit' );
			var x = $( '.statement_toolbar button' );
			$( '.statement_toolbar button' ).prop( "disabled", false );
			$( '.statement_toolbar' ).attr( 'href', 'company_abc/data/' + value_of_selected_option );
		}else{
			$( '#statement_pdf_object' ).attr( 'data', 'none' );
			$( '.statement_toolbar button' ).prop( "disabled", true );
		}
	} );

	/*
	Log in form submit
	 */
	$( "#log_in_form" ).submit( function(){
		event.preventDefault(); //Prevent the form from submitting normally
		$.post( 'junction.php', $( '#log_in_form' ).serialize(), function( data ){
			var json_obj = $.parseJSON( data );
			if( json_obj.status == true ){
				window.location.replace( "dashboard.php" );
			}else{ //If there is an error
				$( ".server_response_div .alert" ).text( json_obj.error_message ).show();
				if( json_obj.error_level == 0 ){
					$( ".server_response_div .alert" ).addClass( 'alert-warning' );
				}else{
					$( ".server_response_div .alert" ).addClass( 'alert-danger' );
				}
			}
		} );
	} );


	/*
	Autofocus on Select input when forgot_password modal is opened.
	 */
	$( '#forgot_password_modal' ).on( 'shown.bs.modal', function(){
		$( '#forgot_password_modal select' ).trigger( 'focus' )
	} );


	/*
	Forgot password form submit
	 */
	$( "#forgot_password_form" ).submit( function(){
		event.preventDefault(); //Prevent the form from submitting normally
		$.post( 'junction.php', $( '#forgot_password_form' ).serialize(), function( data ){
			var json_obj = $.parseJSON( data );
			if( json_obj.status == true ){
				$( ".server_response_div .alert" ).addClass( 'alert-success' ).text( 'Password sent to your E-mail. Check your inbox for mails from FoxTrot Online.' ).show();
			}else{ //If there is an error
				$( ".server_response_div .alert" ).text( json_obj.error_message ).show();
				if( json_obj.error_level == 0 ){
					$( ".server_response_div .alert" ).addClass( 'alert-warning' );
				}else{
					$( ".server_response_div .alert" ).addClass( 'alert-danger' );
				}
			}
		} );
	} );


	/*
	Activity form submit
	 */
	$( "#activity_form" ).submit( function(){
		event.preventDefault(); //Prevent the form from submitting normally
		$.post( 'junction.php', $( '#activity_form' ).serialize(), function( data ){
			var json_obj = $.parseJSON( data );
			if( json_obj.status == true ){
				$( ".server_response_div .alert" ).addClass( 'alert-success' ).text( 'Table generated successfully.' ).show();
			}else{ //If there is an error
				$( ".server_response_div .alert" ).text( json_obj.error_message ).show();
				if( json_obj.error_level == 0 ){
					$( ".server_response_div .alert" ).addClass( 'alert-warning' );
				}else{
					$( ".server_response_div .alert" ).addClass( 'alert-danger' );
				}
			}
		} );
	} );


	/*
	Reports form - changed selection.
	 */
	$( '#time_periods_select' ).change( function(){ //On change of drop down list
		var id_of_selected_option = $( this ).find( "option:selected" ).attr( "id" );
		if( id_of_selected_option == "dates_form_option_custom" ){ //Check if the selected option was 'Custom'
			$( '.hidden_form_div' ).show(); //If so - show the hidden div with the dates input.
		}else if( id_of_selected_option == "dates_form_option_choose" ){ //If selected option was 'Choose from the list'
			$( '.hidden_form_div' ).hide(); //Hide the hidden div with the dates input.
		}else{ //If Option selected is not 'Custom' or 'Choose from the list'
			$( '.hidden_form_div' ).hide(); //Hide the hidden div with the dates input.
			$.post( 'junction.php', $( '#reports_form' ).serialize(), function( data ){ //Send the form to the server.
				var json_obj = $.parseJSON( data );
				if( json_obj.status == true ){
					$( ".server_response_div .alert" ).addClass( 'alert-success' ).text( 'Graphs generated successfully.' ).show();
				}else{ //If there is an error
					$( ".server_response_div .alert" ).text( json_obj.error_message ).show();
					if( json_obj.error_level == 0 ){
						$( ".server_response_div .alert" ).addClass( 'alert-warning' );
					}else{
						$( ".server_response_div .alert" ).addClass( 'alert-danger' );
					}
				}
			} );
		}
	} );


	/*
	Reports form submit
	 */
	$( "#reports_form" ).submit( function(){
		event.preventDefault(); //Prevent the form from submitting normally
		$.post( 'junction.php', $( '#reports_form' ).serialize(), function( data ){
			var json_obj = $.parseJSON( data );
			if( json_obj.status == true ){
				$( ".server_response_div .alert" ).addClass( 'alert-success' ).text( 'Graphs generated successfully.' ).show();
			}else{ //If there is an error
				$( ".server_response_div .alert" ).text( json_obj.error_message ).show();
				if( json_obj.error_level == 0 ){
					$( ".server_response_div .alert" ).addClass( 'alert-warning' );
				}else{
					$( ".server_response_div .alert" ).addClass( 'alert-danger' );
				}
			}
		} );
	} );


	/*
	Sign out link
	 */
	$( "#sign_out_fake_link" ).click( function(){
		$.post( "junction.php", {func: 'sign_out', class: 'permrep'}, function( data ){
			var json_obj = $.parseJSON( data );
			if( json_obj.status == true ){
				window.location.replace( "login.php" );
			}
		} );
	} );


	/**
	 * Drill down pie chart
	 * @param evt
	 */
	$( '#' + chart_id )[0].onclick = function( evt ){
		var activePoints = pie_chart.getElementsAtEvent( evt );
		if( activePoints[0] ){
			var chartData = activePoints[0]['_chart'].config.data;
			var idx = activePoints[0]['_index'];

			var label = chartData.labels[idx];
			var value = chartData.datasets[0].data[idx];
			var color = chartData.datasets[0].backgroundColor[idx];

			$.post( "junction.php", {
				func: 'drill_down_pie_chart',
				class: 'no_class',
				label: label,
				value: value,
				color: color
			}, function( server_response_data ){
				$( '#drill_down_pie_chart_modal' ).modal( 'show' );
				var json_obj = $.parseJSON( server_response_data );

				//Create a new chart in the modal
				var ctx = $( '#drill_down_pie_chart' );
				var config = {
					type: 'pie',
					data: json_obj.data_arr['drill_down_pie_chart_data'],
					options: {
						legend: {
							position: 'right',
						},
						scales: {
							yAxes: [{
								ticks: {
									beginAtZero: true
								}
							}]
						}
					}
				};

				var drill_down_pie_chart = new Chart( ctx, config );


				// pie_chart.data = json_obj.data_arr['drill_down_pie_chart_data'];
				// pie_chart.update();
			} );
		}

	};

} );