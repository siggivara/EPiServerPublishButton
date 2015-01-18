// Sender code

// Connect to Port
var port = chrome.runtime.connect({name: "arduinopublish"});

// Add listener to receive messages from Port
port.onMessage.addListener(function(msg) {
  console.log(msg.command);
  if (msg.command === 'Publish')
	document.getElementById('dijit_form_Button_2_label').click();
});

