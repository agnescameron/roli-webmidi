// Enable WEBMIDI.js and trigger the onEnabled() function when ready


var params = {
  fullscreen: true
};


var elem = document.body;
var two = new Two(params).appendTo(elem);

const pitchLower = 48;
const pitchUpper = 96;

const grid_width = 7;

const pitchRange = pitchUpper - pitchLower;

const width = two.width;
const height = two.height;

let x =  0;
let y = 0;
let radius = 0;
let fill = "0xFFFFFF"

WebMidi
  .enable()
  .then(onEnabled)
  .catch(err => alert(err));


function drawLine(data) {
  // console.log(data)
  x = x + (62 - data[1])/10
  // console.log(data[2])
  var circle = two.makeCircle(x, y, radius);

  // The object returned has many stylable properties:
  circle.fill = fill;
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

    roli.addListener("controlchange", e => {
    // console.log(e.rawData)
    // 0 is status, 1 is data 1, 2 is data 2
    // console.log(dec2bin(e.rawData[0]))
    // drawLine(e.rawData)
      const data = e.rawData

      if(data[1] === 107) radius = e.rawData[2]
      else if (data[1] === 109) fill = '#' + (Math.floor(e.rawData[2]*16777215/125)).toString(16)
      else if (data[1] === 111) {
        var rect = two.makeRectangle(width/2, height/2, width, height);

        // The object returned has many stylable properties:
        rect.fill = 'white';
        // And accepts all valid CSS color:
        rect.stroke = 'none';
        rect.linewidth = 0;
        rect.opacity = data[2]/1024;

        two.update();
      }

      // data[1] is mode -- 107, 109, 111
      // data[2] is 8 bit number

  });




  roli.addListener("noteon", e => {
    // console.log(e.rawData)
    // 0 is status, 1 is data 1, 2 is data 2
    // console.log(dec2bin(e.rawData[0]))
    // drawLine(e.rawData)
    // console.log(e.rawData)

    let gridPos = e.rawData[1]-pitchLower // a number between 48 and 96

    x_cell = gridPos%grid_width;
    y_cell = Math.floor(gridPos/grid_width)

    x = x_cell/grid_width * width
    y = y_cell/grid_width * height
    // console.log(x_cell, y_cell)
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

