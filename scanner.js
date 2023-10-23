
function initQRMethod() {

    html5QrCode = new Html5Qrcode("videoScanQR");
    const qrCodeSuccessCallback = (decodedText, decodedResult) => {
        /* handle success */
    };
    const config = { fps: 10, qrbox: { width: 250, height: 250 } };
    
    // If you want to prefer front camera
    html5QrCode.start({ facingMode: { exact: "environment"} }, config, qrCodeSuccessCallback);
  }

