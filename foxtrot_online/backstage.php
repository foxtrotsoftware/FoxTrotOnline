<?php
session_start();

define('EXCEPTION_WARNING_CODE', 0);
define('EXCEPTION_DANGER_CODE', 1);
define('PIE_CHART_COLORS_ARRAY', [
	'rgb(38, 70, 83)',
	'rgb(42, 157, 143)',
	'rgb(233, 196, 106)',
	'rgb(244, 162, 97)',
	'rgb(231, 111, 81)',
	'rgb(144, 78, 85)',
	'rgb(191, 180, 143)',
	'rgb(50, 50, 50)'
]);

/**
 * Connect to DB
 * If successful, put connection obj in globals
 * If failed, throw an exception
 * @throws Exception
 */
function db_connect(){

	// Create connection
	$conn = new mysqli("127.0.0.1:3304", DB_USERNAME, DB_PASS, DB_NAME);

	// Check connection
	if(!$conn->connect_error){
		$GLOBALS['db_conn'] = $conn;
	} else{
		throw new Exception("Connection failed: {$conn->connect_errno}, {$conn->connect_error}", EXCEPTION_DANGER_CODE);
	}
}

/**
 * Send a query to the DB
 * Return result
 * if failed, throw an exception
 * @param $sql_str
 * @return mysqli_result
 * @throws exception
 */
function db_query($sql_str){

	//Check if query sent successfully
	if($result = $GLOBALS['db_conn']->query($sql_str)){
		return $result;

		//If query failed
	} else{
		throw new Exception("Query failed: {$GLOBALS['db_conn']->errno}, {$GLOBALS['db_conn']->error}", EXCEPTION_DANGER_CODE);
	}
}

/**
 * Gets and array with the company name, and changes the constants db_username, db_pass and db_name to the right values.
 * @param $post
 * @throws Exception
 */
function db_choose($post){
	switch($post['company_name']){
		case 'company_a':
			define('DB_USERNAME', 'root');
			define('DB_PASS', 'alonba2358');
			define('DB_NAME', 'company_a_foxtrot_online');
			break;
		default:
			throw new Exception('There are no DB credentials defined for the chosen company. Contact a system admin.', EXCEPTION_DANGER_CODE);
	}
}

/**
 * An object used to return data from the server to the client.
 * Class json_obj
 */
class json_obj{
	public $status;
	public $data_arr;
	public $error_message;
	public $error_level;
}

function show_top_navigation_bar(){

	$html_return_str = <<<HEREDOC_STRING
	<nav class="navbar-dark d-xs-block d-md-none">
		<button class="navbar-toggler" style="position: fixed; top: 7px; right: 7px; z-index: 2000;" type="button">
			<span class="navbar-toggler-icon"></span>
		</button>
	</nav>
	<nav class="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">

		<a class="navbar-brand col-sm-4 col-md-2 col-xs-1 mr-0" href="dashboard.php" style="padding-top: 7px; padding-bottom: 7px;">
			<img src="lib/logo.png" alt="LOGO" style="height: 40px; padding: 0;">
			FoxTrot Online
		</a>
	</nav>
HEREDOC_STRING;

	return $html_return_str;
}

/**
 * Gets the current page as an argument, and returns an HTML string with the side navigation bar, showing the current page as active.
 * @param $current_page
 * @return string
 */
function show_sidebar($current_page){
	${$current_page."_active"} = 'active';
	$html_return_str           = '
		<nav class="col-md-2 d-none d-md-block bg-light sidebar">
			<ul class="nav flex-column">
				<li class="nav-item">
					<a class="nav-link '.$dashboard_active.'" href="dashboard.php">
						'.show_sidebar_icon('home').'
						Dashboard
					</a>
				</li>
				<li class="nav-item">
					<a class="nav-link '.$statements_active.'" href="statements.php">
						'.show_sidebar_icon('paper').'
						Statements
					</a>
				</li>
				<li class="nav-item">
					<a class="nav-link '.$activity_active.'" href="activity.php">
						'.show_sidebar_icon('bar_chart').'
						Activity
					</a>
				</li>
				<li class="nav-item">
					<a class="nav-link '.$reports_active.'" href="reports.php">
						'.show_sidebar_icon('pie_chart').'
						Reports
					</a>
				</li>
				<li class="nav-item">
					<a class="nav-link '.$documents_active.'" href="documents.php">
						'.show_sidebar_icon('document').'
						Documents
					</a>
				</li>
				<li class="nav-item">
					<a class="nav-link '.$messages_active.'" href="messages.php">
						'.show_sidebar_icon('envelope').'
						Messages
					</a>
				</li>
				<li class="nav-item">
						<a id="sign_out_link" class="nav-link" href="login.php">
						'.show_sidebar_icon('sign_out').'
						Sign out
					</a>
				</li>
			</ul>
		</nav>
';

	return $html_return_str;

}

/**
 * Gets an icon as a parameter and returns the HTML string to output the specific icon
 * The HTML is a SVG tag.
 * @param $icon
 * @return string
 */
function show_sidebar_icon($icon){
	switch($icon){
		case 'home':
			return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="sidebar_icon">
					<path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
					<polyline points="9 22 9 12 15 12 15 22"></polyline>
				</svg>';
		case 'paper':
			return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="sidebar_icon">
					<path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path>
					<polyline points="13 2 13 9 20 9"></polyline>
				</svg>';
		case 'bar_chart':
			return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="sidebar_icon">
							<line x1="18" y1="20" x2="18" y2="10"></line>
							<line x1="12" y1="20" x2="12" y2="4"></line>
							<line x1="6" y1="20" x2="6" y2="14"></line>
						</svg>';
		case 'pie_chart':
			return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="sidebar_icon">
								<path d="M21.21 15.89A10 10 0 1 1 8 2.83"></path>
								<path d="M22 12A10 10 0 0 0 12 2v10z"></path>
							</svg>';
		case 'document':
			return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="sidebar_icon">
								<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
								<polyline points="14 2 14 8 20 8"></polyline>
								<line x1="16" y1="13" x2="8" y2="13"></line>
								<line x1="16" y1="17" x2="8" y2="17"></line>
								<polyline points="10 9 9 9 8 9"></polyline>
							</svg>';
		case 'envelope':
			return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="sidebar_icon">
							<path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
							<polyline points="22,6 12,13 2,6"></polyline>
							</svg>';
		case 'sign_out':
			return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="sidebar_icon">
							<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
							<polyline points="16 17 21 12 16 7"/>
							<line x1="21" y1="12" x2="9" y2="12"/>
							</svg>';
		default:
			return false;
	}
}

class statement{
	public $pdf_name;
	public $pdf_url;
	public $year;
	public $month;
	public $payroll_sequence;
	public $broker_id;
	public $date;

	function __construct($pdf_name = null, $pdf_url = null){
		$this->pdf_name         = $pdf_name;
		$this->pdf_url          = $pdf_url;
		$this->year             = substr($pdf_name, 15, 4);
		$this->month            = date('F', strtotime(substr($pdf_name, 19, 3))); //Replace the 3 letter month with the full month name
		$payroll_sequence_int   = ord(substr($pdf_name, 22, 1)) - ord('A') + 1; //Replace the letter with a number
		$this->payroll_sequence = number_to_ordinal($payroll_sequence_int); //Replace the number with an word
		$this->broker_id        = substr($pdf_name, 23, 5);
		$this->date             = strtotime($this->month.' '.$this->year);
	}

	/**
	 * Gets the directory of the PDFs.
	 * Creates an array of objects of all the files.
	 * Sorts the array from most recent to oldest.
	 * Checks which files the user is authorized to see.
	 * Returns the list of statements as a string representing HTML Options objects.
	 * @param $dir
	 * @return string
	 */
	static function statements_list($dir){
		$files_array = scandir($dir);

		//Remove unnecessary array items.
		unset($files_array[array_search('.', $files_array, true)]);
		unset($files_array[array_search('..', $files_array, true)]);

		foreach($files_array as $file){
			$file_obj_array [] = new statement($file, "company_abc/data/$file");
		}
		$file_obj_array = self::sort_pdf_array_by_date($file_obj_array);

		foreach($file_obj_array as $file_obj){
			if(self::is_authorized()){
				$option_content  = "{$file_obj->month} {$file_obj->year} {$file_obj->payroll_sequence} Payroll";
				$html_return_str .= "<option value='{$file_obj->pdf_name}'>$option_content</option>";
			}
		}

		return $html_return_str;
	}

	/**
	 * Gets a file name, and returns true/false if the logged in user is authorized to view the file.
	 */
	static function is_authorized(){
		//TODO: change when user data is available
		return true;
	}

	/**
	 * Very not efficient sorting.
	 * Gets an array of PDF names, and bubble sorts from newest to oldest.
	 * @param $file_obj_array
	 * @return array
	 */
	static function sort_pdf_array_by_date($file_obj_array){
		for($j = 0; $j < count($file_obj_array); $j++){
			for($i = 0; $i < count($file_obj_array) - 1; $i++){ //Will run on all items except the last one
				if($file_obj_array[$i]->date < $file_obj_array[$i + 1]->date){
					array_splice($file_obj_array, $i + 2, 0, array($file_obj_array[$i]));
					unset($file_obj_array[$i]);
					$file_obj_array = array_values($file_obj_array);
				}
			}
		}

		return $file_obj_array;
	}

}

class user{
	public $id;
	public $email;
	public $company;

	function __construct($post){
		//escape user input for protection against sql injection
		foreach($post as $key => $value){
			$post[$key] = mysqli_real_escape_string($GLOBALS['db_conn'], $value);
		}
	}

	/**
	 * Checks if the users exists, if so - redirect to dashboard.
	 * @return bool
	 */
	function log_in(){
		return true;
	}

	/**
	 * Check if email exists, if so - send a mail to the user with the password.
	 * @return bool
	 */
	function forgot_password(){
		return true;
	}

	function sign_out(){

	}
}

/**
 * Gets the chart name as a parameter.
 * Outputs the chart data and labels as javascript variables (arrays) inside a script html tag
 * @param $chart_name
 */
function pie_chart_data_and_labels($chart_name){
	switch($chart_name){
		case 'dashboard_pie_chart':
			$pie_chart_data   = json_encode([
				1,
				2,
				3,
				4,
				5,
				6,
				7,
				8
			]);
			$pie_chart_labels = json_encode([
				"Dashboard",
				"Dashboard",
				"Dashboard",
				"Dashboard",
				"Dashboard",
				"Dashboard",
				"Dashboard",
				"Dashboard"
			]);
			$script           = "
			<script type='text/javascript'>
				var pie_chart_data = $pie_chart_data;
				var pie_chart_labels = $pie_chart_labels;
			";
			echo $script;
			break;
		case 'reports_pie_chart':
			$pie_chart_data   = json_encode([
				1,
				2,
				3,
				4,
				5,
				6,
				7,
				8
			]);
			$pie_chart_labels = json_encode([
				"Reports",
				"Reports",
				"Reports",
				"Reports",
				"Reports",
				"Reports",
				"Reports",
				"Reports"
			]);
			$script           = "
			<script type='text/javascript'>
				var pie_chart_data = $pie_chart_data;
				var pie_chart_labels = $pie_chart_labels;
			";
			echo $script;
			reports_table_html($pie_chart_data, $pie_chart_labels);
			break;
	}
	echo 'var pie_chart_colors = '.json_encode(PIE_CHART_COLORS_ARRAY).'</script>';
}

/**
 * Gets the chart name as a parameter.
 * Outputs the chart data and labels as javascript variables (arrays) inside a script html tag
 * @param $chart_name
 */
function line_chart_data_and_labels($chart_name){
	$line_chart_data   = json_encode([
		15339,
		21345,
		18483,
		24003,
		23489,
		24092,
		12034
	]);
	$line_chart_labels = json_encode([
		"Sunday",
		"Monday",
		"Tuesday",
		"Wednesday",
		"Thursday",
		"Friday",
		"Saturday"
	]);
	$script            = "
			<script type='text/javascript'>
				var line_chart_data = $line_chart_data;
				var line_chart_labels = $line_chart_labels;
			</script>
			";
	echo $script;
}

/**
 * Gets as parameters the charts data and labels
 * Creates the required HTML table as a string.
 * Defines the string as a constant, for later use.
 * @param $chart_data
 * @param $chart_labels
 */
function reports_table_html($chart_data, $chart_labels){
	$html_table_string = '
				<div class="row mt-5 mb-5">
				<div class="col-lg-6">
					<table class="table table-sm">
						<thead>
						<tr>
							<th>COLOR</th>
							<th>COMMISSION</th>
							<th>TOTAL</th>
							<th>LAST</th>
							<th>DIFFERENCE</th>
						</tr>
						</thead>
						<tbody>
						<tr>
							<td>
								<ul class="graph_legend">
									<li style="color: magenta;"></li>
								</ul>
							</td>
							<td>Mutual Funds</td>
							<td></td>
							<td></td>
							<td></td>
						</tr>
						<tr>
							<td>
								<ul class="graph_legend">
									<li style="color: deeppink;"></li>
								</ul>
							</td>
							<td>Stocks</td>
							<td></td>
							<td></td>
							<td></td>
						</tr>
						<tr>
							<td>
								<ul class="graph_legend">
									<li style="color: purple;"></li>
								</ul>
							</td>
							<td>Bonds</td>
							<td></td>
							<td></td>
							<td></td>
						</tr>
						<tr>
							<td>
								<ul class="graph_legend">
									<li style="color: maroon;"></li>
								</ul>
							</td>
							<td>Options</td>
							<td></td>
							<td></td>
							<td></td>
						</tr>
						<tr>
							<td>
								<ul class="graph_legend">
									<li style="color: red;"></li>
								</ul>
							</td>
							<td>CD\'s</td>
							<td></td>
							<td></td>
							<td></td>
						</tr>
						<tr>
							<td>
								<ul class="graph_legend">
									<li style="color: orange;"></li>
								</ul>
							</td>
							<td>UIT\'s</td>
							<td></td>
							<td></td>
							<td></td>
						</tr>
						<tr>
							<td>
								<ul class="graph_legend">
									<li style="color: yellow;"></li>
								</ul>
							</td>
							<td>Variable Annuities</td>
							<td></td>
							<td></td>
							<td></td>
						</tr>
						<tr>
							<td>
								<ul class="graph_legend">
									<li style="color: lime;"></li>
								</ul>
							</td>
							<td>Fixed Annuities</td>
							<td></td>
							<td></td>
							<td></td>
						</tr>
						<tr>
							<td>
								<ul class="graph_legend">
									<li style="color: green;"></li>
								</ul>
							</td>
							<td>Life Insurance</td>
							<td></td>
							<td></td>
							<td></td>
						</tr>
						<tr>
							<td>
								<ul class="graph_legend">
									<li style="color: cyan;"></li>
								</ul>
							</td>
							<td>Investment Banking</td>
							<td></td>
							<td></td>
							<td></td>
						</tr>
						<tr>
							<td>
								<ul class="graph_legend">
									<li style="color: teal;"></li>
								</ul>
							</td>
							<td>RIA\'s</td>
							<td></td>
							<td></td>
							<td></td>
						</tr>
						<tr>
							<td>
								<ul class="graph_legend">
									<li style="color: blue;"></li>
								</ul>
							</td>
							<td>Limited Partnerships</td>
							<td></td>
							<td></td>
							<td></td>
						</tr>
						<tr>
							<td>
								<ul class="graph_legend">
									<li style="color: navy;"></li>
								</ul>
							</td>
							<td>Alternative Investments</td>
							<td></td>
							<td></td>
							<td></td>
						</tr>
						<tr>
							<td>
								<ul class="graph_legend">
									<li style="color: black;"></li>
								</ul>
							</td>
							<td>Cryptocurrency</td>
							<td></td>
							<td></td>
							<td></td>
						</tr>
						<tr>
							<td>
								<ul class="graph_legend">
									<li style="color: grey;"></li>
								</ul>
							</td>
							<td>Miscellaneous/Other</td>
							<td></td>
							<td></td>
							<td></td>
						</tr>
						</tbody>
					</table>
				</div>
			</div>
	';
	define('REPORTS_TABLE_HTML', $html_table_string);
}

/**
 * Returns a string representing the total commissions posted.
 */
function dashboard_posted_commissions(){
	$posted_commissions = 3415.10;

	return "Posted Commisions: $posted_commissions\$";
}

/**
 * Gets an integer as a parameter and transform it to a string (1 => first, 2 => second, etc.)
 * @param $num
 * @return string
 */
function number_to_ordinal($num){
	$first_word  = array(
		'eth',
		'First',
		'Second',
		'Third',
		'Fourth',
		'Fifth',
		'Sixth',
		'Seventh',
		'Eighth',
		'Ninth',
		'Tenth',
		'Eleventh',
		'Twelfth',
		'Thirteenth',
		'Fourteenth',
		'Fifteenth',
		'Sixteenth',
		'Seventeenth',
		'Eighteenth',
		'Nineteenth',
		'Twentieth'
	);
	$second_word = array(
		'',
		'',
		'Twenty',
		'Thirty',
		'Forty',
		'Fifty'
	);

	if($num <= 20)
		return $first_word[$num];

	$first_num  = substr($num, -1, 1);
	$second_num = substr($num, -2, 1);

	return $string = str_replace('y-eth', 'ieth', $second_word[$second_num].' '.$first_word[$first_num]);

}