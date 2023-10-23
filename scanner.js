var html5QrCode = null;
function initQRMethod() {

    html5QrCode = new Html5Qrcode("videoScanQR");
    let labels = "";
    Html5Qrcode.getCameras().then(devices => {
        /**
         * devices would be an array of objects of type:
         * { id: "id", label: "label" }
         */
        if (devices && devices.length) {

            for (let index = 0; index < devices.length; index++) {
                labels += devices[index].label + " ----- ";
            }
          var cameraId = devices[0].id;
          // .. use this to start scanning.
        }
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
  }

