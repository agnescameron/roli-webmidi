// Enable WEBMIDI.js and trigger the onEnabled() function when ready


WebMidi
  .enable()
  .then(onEnabled)
  .catch(err => alert(err));


var params = {
  fullscreen: true
};


var elem = document.body;
var two = new Two(params).appendTo(elem);


function drawLine(data) {
  console.log(data)

  var radius = data[1];
  var x = two.width * 0.5;
  var y = two.height * 0.5 - radius * 1.25;
  var circle = two.makeCircle(x, y, radius);

  // The object returned has many stylable properties:
  circle.fill = '#FF8000';
  // And accepts all valid CSS color:
  circle.stroke = 'white';
  circle.linewidth = 5;

  two.update();
}

// Function triggered when WEBMIDI.js is ready
function onEnabled() {

  // Display available MIDI input devices
  // if (WebMidi.inputs.length < 1) {
  //   document.body.innerHTML+= "No device detected.";
  // } else {
  //   WebMidi.inputs.forEach((device, index) => {
  //     document.body.innerHTML+= `${index}: ${device.name} <br>`;
  //   });
  // }

  const roli = WebMidi.inputs[0]
  // console.log(roli.eventNames)

  // roli.addListener("midimessage", e => {
  //   // document.body.innerHTML+= `${e} <br>`;
  //   console.log(e.rawData)
  // }, {channels: [1, 2, 3]});

  // roli.addListener("noteon", e => {
  //   // document.body.innerHTML+= `${e} <br>`;
  //   console.log(e)
  // }, {channels: [1, 2, 3]});

  // roli.addListener("pitchbend", e => {
  //   // document.body.innerHTML+= `${e} <br>`;
  //   console.log(e)
  // }, {channels: [1, 2, 3]});

  // const mySynth = WebMidi.inputs[0];
  // // const mySynth = WebMidi.getInputByName("TYPE NAME HERE!")
  
  // roli.addListener("noteon", e => {
  //   document.body.innerHTML+= `${e.note.name} <br>`;
  // });


  roli.addListener("onnote", e => {
    // console.log(e.rawData)
    // 0 is status, 1 is data 1, 2 is data 2
    // console.log(dec2bin(e.rawData[0]))
    drawLine(e.rawData)
  })

    roli.addListener("pitchbend", e => {
    // console.log(e.rawData)
    // 0 is status, 1 is data 1, 2 is data 2
    // console.log(dec2bin(e.rawData[0]))
    drawLine(e.rawData)
  });

}

function dec2bin(dec) {
  return (dec >>> 0).toString(2);
}

