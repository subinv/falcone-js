(function () {
    var selectTag = document.querySelectorAll('select');
    var vehicleNames = document.getElementById('vehicleVal');
    var loaderTeag = document.querySelector('.showLoader');
    var vehicleNamesArray = [],
        planetsArray = [];
    requestFunction("planets", "https://findfalcone.herokuapp.com/planets");
    requestFunction("vehicles", "https://findfalcone.herokuapp.com/vehicles");


    function requestFunction(callType, url) {
        var xmlHttpRequest = new XMLHttpRequest();
        if (!loaderTeag.classList.contains('overlay')) {
            loaderTeag.classList.add('overlay');
        }

        // return new Promise((resolve, reject) => {
        //     const xhr = new XMLHttpRequest();
        //     xhr.open("GET", url);
        //     xhr.onload = () => {resolve(xhr.responseText);
        //         buildFunction(JSON.parse(xhr.responseText),callType);
        //     }
        //     xhr.onerror = () => {reject(xhr.statusText);
        //     alert(xhr.statusText)}
        //     xhr.send();
        //   });

        xmlHttpRequest.onload = function () {
            // if (this.readyState == 4 && this.status == 200) {
            buildFunction(JSON.parse(xmlHttpRequest.responseText), callType);
            // }
        }
        xmlHttpRequest.onerror = function (err) {
            alert("error");
        }
        xmlHttpRequest.open("GET", url, true);
        xmlHttpRequest.send();
    }

    function buildFunction(res, type) {
        console.log(type, res);
        if (type === "planets" && res) {
            planetsArray = res;
            for (var i of res) {
                for (var j = 0; j < 4; j++) {
                    createOption(i.name, j);
                }
            }
            bindClickEventOption();
        } else if (type === "vehicles" && res) {
            vehicleNamesArray = res;
            for (var i of res) {
                for (var j = 0; j < 4; j++) {
                    createVehicleRadio(i.name, j);
                }
            }
        }
        loaderTeag.classList.remove('overlay');
    }

    function createOption(val, count) {
        var planetEachElem = document.getElementById('value' + count);
        var optionTag = document.createElement('option');
        optionTag.value = val;
        optionTag.text = val;
        planetEachElem.appendChild(optionTag);
    }

    function createVehicleRadio(val, count) {
        var vehicleEachElem = document.getElementById('vehicleVal' + count);
        var optionTag = document.createElement('input');
        optionTag.value = val;
        optionTag.type = "radio";
        optionTag.name = "vehicle" + count;
        // optionTag.appendChild(val);

        vehicleEachElem.appendChild(optionTag);
        var textDis = document.createElement('span');
        textDis.textContent = val;
        vehicleEachElem.appendChild(textDis);
        vehicleEachElem.appendChild(document.createElement('br'));

        //vehicleNames.appendChild(optionTag);
    }

    function bindClickEventOption() {
        for (var select of selectTag) {
            select.addEventListener('change', function (event) {
                console.log(event.target.value);
            });
        }
    }
}());