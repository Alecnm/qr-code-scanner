
function initQRMethod() {

    html5QrCode = new Html5Qrcode("videoScanQR");
    const config = { fps: 10, qrbox: { width: 250, height: 250 } };
  
    html5QrCode.start({ facingMode: { exact: "environment" } }, config, () => {});
    // Html5Qrcode.getCameras().then(devices => {
    //   /**
    //    * devices would be an array of objects of type:
    //    * { id: "id", label: "label" }
    //    */
    //   if (devices && devices.length) {
  
    //     if (typeof devices[1] === 'undefined') {
    //       var cameraId = devices[0].id;
    //     } else {
    //       var cameraId = devices[1].id;
    //     }
    //     console.log(devices);
        
    //   }
    // }).catch(err => {
    //   //console.error(err);
    // });
    
  }

  