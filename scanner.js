
function initQRMethod() {

    html5QrCode = new Html5Qrcode("videoScanQR");
    Html5Qrcode.getCameras().then(devices => {
      /**
       * devices would be an array of objects of type:
       * { id: "id", label: "label" }
       */
      if (devices && devices.length) {
  
        if (typeof devices[1] === 'undefined') {
          var cameraId = devices[0].id;
        } else {
          var cameraId = devices[1].id;
        }
        console.log(devices);
        const config = { fps: 10, qrbox: { width: 250, height: 250 } };
  
        html5QrCode.start({ deviceId: { exact: cameraId } }, config, qrCodeSuccessCallback);
      }
    }).catch(err => {
      //console.error(err);
    });
    const qrCodeSuccessCallback = (decodedText, decodedResult) => {
  
      let urlObject = new URL(decodedText);
  
      if (urlObject.searchParams.get("token") && urlObject.searchParams.get("u_id") && urlObject.searchParams.get("onlyqr")) {
        showLoading(decodedText);
        //console.log(decodedText);
      } else {
        qrNotValid();
        //console.log("QR code is not valid"); // TODO - Show error message to user that QR code is not valid and try again
      }
    };
  }