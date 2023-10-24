var html5QrCode = null;
// Init QR scanner
function initQRMethod() {

    html5QrCode = new Html5Qrcode("videoScanQR");
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
    const config = { fps: 10, qrbox: { width: 250, height: 250 } };

    html5QrCode.start({ facingMode: { exact: "environment" } }, config, qrCodeSuccessCallback);
}

// add onclick function to popupCloseButton button with a listener
function stopCamera() {
  html5QrCode.stop().then(ignore => {
    // QR Code scanning is stopped.
  }).catch(err => {
    //console.error(err);
    // Stop failed, handle it.
  });
}


// Get Elements QR Containers
function getDOMElements() {
  // PopUp First
  const cardOne = document.getElementById("cardOne");
  // PopUp Second
  const cardTwo = document.getElementById("cardTwo");
  // Btn close div
  const btnClose = document.getElementById("headerBtnClose");

  // Btn Close Btn
  const btnCloseQrLogin = document.getElementById("btnCloseQrLogin");

  // PopUp First
  const firstContainer = document.getElementById("scanQuestionContainer");
  // PopUp Second
  const secondContainer = document.getElementById("scannerContainer");

  // Loading content
  const loadingContainer = document.getElementById("loadingContainer");

  // Second:
  const video = document.getElementById('videoScanQR');
  const resultContainer = document.getElementById('resultScanQR');

  // Return
  return { cardOne, cardTwo, btnClose, btnCloseQrLogin, firstContainer, secondContainer, video, resultContainer, loadingContainer };
}

// Init QR Btn
function initQR() {
  const { cardOne, cardTwo, btnClose } = getDOMElements();

  if (cardOne && cardTwo) {
    cardOne.classList.add("hideDisplay");
    cardTwo.classList.remove("hideDisplay");
    //btnClose.classList.remove("hideDisplay");
    //btnClose.classList.add("showDisplay");
    getPopUpScanQrHTML();
  }
}

function getPopUpScanQrHTML() {
  const { cardTwo } = getDOMElements();

  fetch("popupScanQr.php")
    .then(res => res.text())
    .then(html => {
      cardTwo.innerHTML = html;
    })
    .catch(err => {
      console.error('Error fetch:', err);
    })
}

// Toggle display class
function toggleDisplayClass(element) {
  if (element.classList.contains("showDisplay")) {
    element.classList.remove("showDisplay");
    element.classList.add("hideDisplay");
  } else if (element.classList.contains("hideDisplay")) {
    element.classList.remove("hideDisplay");
    element.classList.add("showDisplay");
  }
}

// Init first container: QuestionQR Scan
function initQuestionQR() {
  const { firstContainer, secondContainer } = getDOMElements();

  if (firstContainer && secondContainer) {
    toggleDisplayClass(firstContainer);
    toggleDisplayClass(secondContainer);
  }
}

// Hide Scan
function hideScan() {
  const { secondContainer } = getDOMElements();
  if (secondContainer) {
    secondContainer.classList.add("hideDisplay");
  }
}

// Active btn for init first btn
function activebtnQuestButton() {
  initQuestionQR();
  initQRMethod();
}

// showLoading
function showLoading(decodedText) {
  const { resultContainer, loadingContainer, secondContainer, btnClose } = getDOMElements();

  if (resultContainer && loadingContainer && secondContainer && btnClose) {
    btnClose.classList.remove("showDisplay");
    btnClose.classList.add("hideDisplay");
    secondContainer.classList.remove("showDisplay");
    secondContainer.classList.add("hideDisplay");
    resultContainer.classList.add("hideDisplay");
    loadingContainer.classList.add("showDisplay");

    window.location.replace(decodedText);
    stopCamera();
    hideLoading();

    /*
      setTimeout(function () {
      window.location.replace(decodedText);
      stopCamera();
      hideLoading();
    }, 5000); // Time
    */
  }
}

// hideLoading
function hideLoading() {
  const { resultContainer, loadingContainer } = getDOMElements();

  if (resultContainer && loadingContainer) {
    resultContainer.classList.add("showDisplay");
    loadingContainer.classList.add("hideDisplay");
  }
}

// Close Scanner
function closeScanner() {
  try {
    stopCamera();
  } catch (error) {
  }
  initQuestionQR();
}

// Close View One
function closeViewOne(){
  location.reload();
}

function closeScannerAndView1() {
  // Código para cerrar el escáner y cambiar a vista 2
  console.log("view1")
}

function closeScannerAndView2() {
  // Código para cerrar el escáner y cambiar a vista 3
  console.log("view2")
}

function backToView2() {
  // Código para volver a vista 2
  console.log("view3")
}

// qrNot Valid
function qrNotValid() {
  showAlert("resultScanQR", "QR code is not valid");
}



// DOM

/* Btn with crm ID */
// Redirection to the link user put into input
function initContinue() {
  let inputId = document.getElementById("input-crm-id").value;

  if (!inputId || !/^\d+$/.test(inputId)) {
    showAlert("alertContainer", "Please enter a valid ID.");
    return;
  };

  let link = `ll`;
  //ajax request to check if the crm id is valid using jquery
  $.ajax({
    url: 'll', // URL del archivo PHP en tu servidor que procesará la petición
    method: 'POST', // Puedes utilizar GET o POST según lo que necesites
    dataType: 'json', // Especificamos el tipo de datos que esperamos recibir del servidor (en este caso, JSON)
    data: { // Datos que se envían
      crm_id: inputId
    },
    success: function(data) {
      if(data.success == false) {
        showAlert("alertContainer", "Please enter a valid ID.");
        return;
      }else{
        window.location.replace(link);
      }
    },
    error: function() {
        // Esta función se ejecutará si ocurre algún error en la petición AJAX
        console.log("Error in ajax request");
    }
  });
}

// Show Alert
function showAlert(divId, content) {
  const elementDiv = document.getElementById(divId);
  elementDiv.innerHTML = content;
  elementDiv.classList.remove("hideDisplay");
  elementDiv.classList.add("showDisplay");
}

// Hide Alert
const inputId = document.getElementById("input-crm-id");
inputId.addEventListener("input", function event() {
  hideAlert("alertContainer");
});

function hideAlert(divId) {
  let elementDiv = document.getElementById(divId);
  elementDiv.classList.remove("showDisplay");
  elementDiv.classList.add("hideDisplay");
}