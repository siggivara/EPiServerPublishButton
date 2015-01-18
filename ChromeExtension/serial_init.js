// Initialize communication with the contentscript
var PORT;
chrome.runtime.onConnect.addListener(function(port) {
  console.assert(port.name == "arduinopublish");
  PORT = port;
  port.onMessage.addListener(function(msg) {
	console.log(msg);
  });
});




// Serial code
var ser;
function plugin0()
{
  return document.getElementById('plugin0');
}
plugin = plugin0;

var startByte = 'Q';
var stopByte = 'X';
var readData = '';
var value = '';
function recv(bytes, size)
{
  for(var i=0;i<size;++i)
  {
	readData += String.fromCharCode(bytes[i]);	// Hvis ikke 'X' finnes, append og gjør ingenting.
  }
  
  // Hent substring fra 'Q' til 'X'
  var startIndex = readData.indexOf(startByte);
  var stopIndex = readData.indexOf(stopByte);
  
  if (startIndex >= 0 && stopIndex >= 0) {
	value = readData.substring(startIndex+1, stopIndex);			
	readData = readData.substring(stopIndex, readData.length-1);	// Fjern alt opp til og med X
	
	document.getElementById('result').innerHTML += (value +'<br />');
	PORT.postMessage({command : value});
  }
}

function pluginLoaded() 
{
  ser = plugin().Serial;// Get a Serial object
  ser.open('COM8');// Open a port
  ser.set_option(9600,0,8,0,1);// Set port options 
  ser.recv_callback(recv); // Callback function for recieve data
}

function pluginValid()
{
  if(plugin().valid){
	alert(plugin().echo('This plugin seems to be working!'));
  } else {
	alert('Plugin is not working :(');
  }
}