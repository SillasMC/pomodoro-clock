$(document).ready(function() {

	// Set Global Variables
	let clockStatus		= false;
	let sessionStatus	= true;
	let interval;

	// Decrease break time
	$("#break-down-id").on("click", function () {
		let break_value = Number($("#break-value-id").text());

		if (break_value > 1) {
			break_value -= 1;
			$("#break-value-id").text(break_value);

			if(!clockStatus && !sessionStatus){
				$("#time-id").text(break_value + ':00');
			}
		}
	});

	// Increase break time
	$("#break-up-id").on("click", function () {
		let break_value = Number($("#break-value-id").text());

		break_value += 1;
		$("#break-value-id").text(break_value);

		if(!clockStatus && !sessionStatus){
			$("#time-id").text(break_value + ':00');
		}
	});

	// Decrease session time
	$("#session-down-id").on("click", function () {
		let session_value = Number($("#session-value-id").text());

		if (session_value > 1) {
			session_value -= 1;
			$("#session-value-id").text(session_value);

			if(!clockStatus && sessionStatus){
				$("#time-id").text(session_value + ':00');
			}
		}
	});

	// Increase session time
	$("#session-up-id").on("click", function () {
		let session_value = Number($("#session-value-id").text());

		session_value += 1;
		$("#session-value-id").text(session_value);

		if(!clockStatus && sessionStatus){
			$("#time-id").text(session_value + ':00');
		}
	});

	// Play & Pause Clock
	$("#play-pause-clock-id").on("click", function () {
		let content = '';

		if(!clockStatus){
			content = 'Pause <i class="fa fa-pause" aria-hidden="true"></i>';
			interval = setInterval(runClock, 1000);
		}
		else {
			content = 'Play <i class="fa fa-play" aria-hidden="true"></i>';
			clearInterval(interval);
		}

		$("#play-pause-clock-id").html(content);
		clockStatus = !clockStatus;
	});

	// Action of reset
	$("#reset-clock-id").on("click", function () {
		clockStatus = false;
		sessionStatus = true;
		clearInterval(interval);

		$("#play-pause-clock-id").html('Play <i class="fa fa-play" aria-hidden="true"></i>');
		$("#time-type-id").text('Session');
		$("#time-id").text($("#session-value-id").text() + ':00');
	});

	// Run the clock
	function runClock () {
		let time = $("#time-id").text();

		let timeArray = time.split(':');

		if (timeArray[1] == 0) {
			timeArray[1] = 60;
			timeArray[0] = Number(timeArray[0]) - 1;
		}

		timeArray[1] = Number(timeArray[1]) - 1;

		// Change turn
		if (timeArray[0] == 0 && timeArray[1] == 0) {
			let sessionKind = sessionStatus ? 'Break' : 'Session';
			sessionStatus = !sessionStatus;

			$("#time-type-id").text(sessionKind);
			$("#time-id").text($("#" + sessionKind.toLowerCase() + "-value-id").text() + ':00');
			
			//TODO Insert notification
		}
		else {
			let formattedNumber = ("0" + timeArray[1]).slice(-2);

			$("#time-id").text(timeArray[0] + ':' + formattedNumber);
		}

	}
});
