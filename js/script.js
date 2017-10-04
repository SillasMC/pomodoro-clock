$(document).ready(function() {

	// Decrease break time
	$("#break-down-id").on("click", function () {
		let break_value = Number($("#break-value-id").text());

		if (break_value > 0) {
			$("#break-value-id").text(break_value - 1);
		}
	});

	// Increase break time
	$("#break-up-id").on("click", function () {
		let break_value = Number($("#break-value-id").text());

		$("#break-value-id").text(break_value + 1);
	});

	// Decrease break time
	$("#session-down-id").on("click", function () {
		let session_value = Number($("#session-value-id").text());

		if (session_value > 0) {
			$("#session-value-id").text(session_value - 1);
		}
	});

	// Increase break time
	$("#session-up-id").on("click", function () {
		let session_value = Number($("#session-value-id").text());

		$("#session-value-id").text(session_value + 1);
	});
});
