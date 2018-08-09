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
			var company_name = window.company_name;
			$( '#statement_pdf_object' ).attr( 'data', company_name + '/data/' + value_of_selected_option + '#view=Fit' );
			var x = $( '.statement_toolbar button' );
			$( '.statement_toolbar button' ).prop( "disabled", false );
			$( '.statement_toolbar' ).attr( 'href', company_name + '/data/' + value_of_selected_option );
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
				$( "#log_in_form .server_response_div .alert" ).text( json_obj.error_message ).show();
				if( json_obj.error_level == 0 ){
					$( "#log_in_form .server_response_div .alert" ).removeClass('alert-danger').addClass( 'alert-warning' );
				}else{
					$( "#log_in_form .server_response_div .alert" ).removeClass('alert-warning').addClass( 'alert-danger' );
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
				$( "#forgot_password_form .server_response_div .alert" ).removeClass('alert-warning alert-danger').addClass( 'alert-success' ).text( 'Password and username sent to your E-mail. Check your inbox for mails from FoxTrot Online.' ).show();
			}else{ //If there is an error
				$( "#forgot_password_form .server_response_div .alert" ).text( json_obj.error_message ).show();
				if( json_obj.error_level == 0 ){
					$( "#forgot_password_form .server_response_div .alert" ).removeClass('alert-success alert-danger').addClass( 'alert-warning' );
				}else{
					$( "#forgot_password_form .server_response_div .alert" ).removeClass('alert-success alert-warning').addClass( 'alert-danger' );
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
				$("#activity_table tbody").html(json_obj.data_arr['activity_table']);
				$("#activity_boxes_container_div").html(json_obj.data_arr['activity_boxes']);
				$( ".server_response_div .alert" ).removeClass('alert-warning alert-danger').addClass( 'alert-success' ).text( 'Table generated successfully.' ).show();
			}else{ //If there is an error
				$( ".server_response_div .alert" ).text( json_obj.error_message ).show();
				if( json_obj.error_level == 0 ){
					$( ".server_response_div .alert" ).removeClass('alert-success alert-danger').addClass( 'alert-warning' );
				}else{
					$( ".server_response_div .alert" ).removeClass('alert-success alert-warning').addClass( 'alert-danger' );
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
		// }else if( id_of_selected_option == "dates_form_option_choose" ){ //If selected option was 'Choose from the list'
		// 	$( '.hidden_form_div' ).hide(); //Hide the hidden div with the dates input.
		}else{ //If Option selected is not 'Custom' or 'Choose from the list'
			$( '.hidden_form_div' ).hide(); //Hide the hidden div with the dates input.
			$.post( 'junction.php', $( '#reports_form' ).serialize(), function( data ){ //Send the form to the server.
				var json_obj = $.parseJSON( data );
				if( json_obj.status == true ){
					$( ".server_response_div .alert" ).removeClass('alert-warning alert-danger').addClass( 'alert-success' ).text( 'Graphs generated successfully.' ).show();
				}else{ //If there is an error
					$( ".server_response_div .alert" ).text( json_obj.error_message ).show();
					if( json_obj.error_level == 0 ){
						$( ".server_response_div .alert" ).removeClass('alert-success alert-danger').addClass( 'alert-warning' );
					}else{
						$( ".server_response_div .alert" ).removeClass('alert-success alert-warning').addClass( 'alert-danger' );
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
				$( ".server_response_div .alert" ).removeClass('alert-warning alert-danger').addClass( 'alert-success' ).text( 'Graphs generated successfully.' ).show();
			}else{ //If there is an error
				$( ".server_response_div .alert" ).text( json_obj.error_message ).show();
				if( json_obj.error_level == 0 ){
					$( ".server_response_div .alert" ).removeClass('alert-success alert-danger').addClass( 'alert-warning' );
				}else{
					$( ".server_response_div .alert" ).removeClass('alert-success alert-warning').addClass( 'alert-danger' );
				}
			}
		} );
	} );


	/*
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
							labels: {
								generateLabels: function(chart) {
									var data = chart.data;
									if (data.labels.length && data.datasets.length) {
										return data.labels.map(function(label, i) {
											var meta = chart.getDatasetMeta(0);
											var ds = data.datasets[0];
											var arc = meta.data[i];
											var custom = arc && arc.custom || {};
											var getValueAtIndexOrDefault = Chart.helpers.getValueAtIndexOrDefault;
											var arcOpts = chart.options.elements.arc;
											var fill = custom.backgroundColor ? custom.backgroundColor : getValueAtIndexOrDefault(ds.backgroundColor, i, arcOpts.backgroundColor);
											var stroke = custom.borderColor ? custom.borderColor : getValueAtIndexOrDefault(ds.borderColor, i, arcOpts.borderColor);
											var bw = custom.borderWidth ? custom.borderWidth : getValueAtIndexOrDefault(ds.borderWidth, i, arcOpts.borderWidth);

											// We get the value of the current label
											var value = chart.config.data.datasets[arc._datasetIndex].data[arc._index];

											return {
												// Instead of `text: label,`
												// We add the value to the string
												text: label + ": $" + value,
												fillStyle: fill,
												strokeStyle: stroke,
												lineWidth: bw,
												hidden: isNaN(ds.data[i]) || meta.data[i].hidden,
												index: i
											};
										});
									} else {
										return [];
									}
								}
							}
						},
						scales: {
							yAxes: [{
								ticks: {
									beginAtZero: true
								}
							}]
						},
						tooltips: {
							callbacks: {
								label: function(tooltipItem, data) {
									var dataset = data.datasets[tooltipItem.datasetIndex];
									var meta = dataset._meta[Object.keys(dataset._meta)[0]];
									var total = meta.total;
									var currentValue = dataset.data[tooltipItem.index];
									var percentage = parseFloat((currentValue/total*100).toFixed(1));
									return currentValue + ' (' + percentage + '%)';
								},
								title: function(tooltipItem, data) {
									return data.labels[tooltipItem[0].index];
								}
							}
						}
					}
				};
				var drill_down_pie_chart = new Chart( ctx, config );
			} );
		}

	};


	/**
	 * Check if window is small enough, and if so, move down Pie chart legend
	 */
	if($( document ).width() < 992){
		pie_chart.options.legend.position = 'bottom';
		pie_chart.update();
	}


} );