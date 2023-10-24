var html5QrCode = null;
function initQRMethod() {

    html5QrCode = new Html5Qrcode("videoScanQR");
    let labels = "";
    Html5Qrcode.getCameras().then(devices => {
        /**
         * devices would be an array of objects of type:
         * { id: "id", label: "label" }
         */
        console.log(devices);
        devices.forEach(device => {
            alert(device.label);
        });
      }).catch(err => {
        // handle err
      });
    const qrCodeSuccessCallback = (decodedText, decodedResult) => {
        /* handle success */
    };
    const config = { fps: 10, qrbox: { width: 250, height: 250 } };

    alert(labels);
    
    // If you want to prefer front camera
    html5QrCode.start({ facingMode: { exact: "environment"} }, config, qrCodeSuccessCallback);

      // Check if the browser supports WebRTC
if (navigator.mediaDevices && navigator.mediaDevices.enumerateDevices) {
    // Get a list of available devices
    navigator.mediaDevices.enumerateDevices()
      .then(function(devices) {
        // Filter devices to get only video input devices (cameras)
        const cameras = devices.filter(device => device.kind === 'videoinput');
   
        if (cameras.length > 0) {
          let maxResolutionCamera = null;
          let maxResolution = 0;
   
          // Cameras are available, you can use them
          cameras.forEach(camera => {
            getCameraResolution(camera.deviceId, function(resolution) {
              alert('Camera: ' + camera.label);
              alert( resolution);
   
              if (resolution.width * resolution.height > maxResolution) {
                maxResolution = resolution.width * resolution.height;
                maxResolutionCamera = camera.label;
              }
            });
          });
   
         alert('Camera with Max Resolution: ' + maxResolutionCamera);
        } else {
          alert('No cameras available.');
        }
      })
      .catch(function(err) {
        alert('Error enumerating devices: ' + err);
      });
  } else {
    alert('WebRTC is not supported in this browser.');
  }
  }


function getCameraResolution(deviceId, callback) {
  // Get the camera stream
  navigator.mediaDevices.getUserMedia({ video: { deviceId: deviceId } })
    .then(function(stream) {
      const track = stream.getVideoTracks()[0];
      const settings = track.getSettings();
 
      // Stop the stream
      stream.getVideoTracks()[0].stop();
 
      callback({ width: settings.width, height: settings.height });
    })
    .catch(function(err) {
      alert('Error getting camera resolution: ' + err);
    });
}