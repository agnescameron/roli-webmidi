// Enable WEBMIDI.js and trigger the onEnabled() function when ready
var elem = document.body;
var two = new Two(params).appendTo(elem);

const pitchLower = 48;
const pitchUpper = 96;

const pitchRange = pitchUpper - pitchLower;

const width = two.width;
const height = two.height;

let x =  0;
let y = 0;

WebMidi
  .enable()
  .then(onEnabled)
  .catch(err => alert(err));


var params = {
  fullscreen: true
};


function drawLine(data) {
  // console.log(data)
  x = x + (62 - data[1])/10

  var radius = 10;
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


  roli.addListener("noteon", e => {
    // console.log(e.rawData)
    // 0 is status, 1 is data 1, 2 is data 2
    // console.log(dec2bin(e.rawData[0]))
    // drawLine(e.rawData)
    console.log(e.rawData)

    x = (e.rawData[1] - pitchLower)/pitchRange * width
    y = e.rawData[2]/125 * height
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

