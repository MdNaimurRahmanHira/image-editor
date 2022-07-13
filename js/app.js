const uploadImageBtn = document.getElementById('uploadImage'),
    hiddenInput = document.getElementById('hiddenInput'),
    saveImage = document.getElementById('saveImage'),
    leftAside = document.querySelector('.left-aside'),
    range = document.querySelector('.range'),
    rotateBtns = document.querySelectorAll('.rotate-btns button'),
    filterBtns = document.querySelectorAll('.filter-btn'),
    previewImage = document.getElementById('previewImage'),
    resetFilter = document.getElementById('resetFilter');


//default value of the filters
let brightness = 100,
    saturation = 100,
    inversion = 0,
    grayscale = 0;

let rotate = 0,
    flipHorizontale = 1,
    flipverticle = 1;


function updateRange(btn) {
    let activeBtn = document.querySelector('.filter-btn.active'),
        filterValue = document.querySelector('.filter-value'),
        filtername = document.querySelector('.filter-name');

    // removing the active class from other btn
    activeBtn.classList.remove('active');
    //adding the active class to the clicked btn
    btn.classList.add('active')
    // also updating the filtername according to the clicked btn
    filtername.textContent = btn.textContent;

    // update the range and filter value according to the variables value
    if (btn.id === 'brightness') {
        range.max = '200'
        range.value = brightness;
        filterValue.textContent = brightness + "%";
    } else if (btn.id === 'saturation') {
        range.max = '200'
        range.value = saturation;
        filterValue.textContent = saturation + "%";

    } else if (btn.id === 'inversion') {
        range.max = '100'
        range.value = inversion;
        filterValue.textContent = inversion + "%";

    } else if (btn.id === 'grayscale') {
        range.max = '100'
        range.value = grayscale;
        filterValue.textContent = grayscale + "%";
    }

}

function applyFilter() {
    previewImage.style.filter = `brightness(${brightness}%) 
    saturate(${saturation}%) grayscale(${grayscale}%) invert(${inversion}%)`;
    previewImage.style.transform = `rotate(${rotate}deg) scaleX(${flipHorizontale}) scaleY(${flipverticle})`

}

function uploadimage() {
    let image = hiddenInput.files[0];

    // if no file selected the return
    if (!image) return;
    previewImage.src = URL.createObjectURL(image);

    // remove the disable class from the left item to make them active
    if (leftAside.classList.contains('disable')) {
        leftAside.classList.remove('disable')
    }
    if (saveImage.classList.contains('disable')) {
        saveImage.classList.remove('disable')
    }

}


function updateFilter() {
    let filterValue = document.querySelector('.filter-value'),
        selectedFilter = document.querySelector('.filter-btn.active');


    // set value of the selected filter according to the variables value also update the filter value
    if (selectedFilter.id === 'brightness') {
        brightness = range.value;
        filterValue.textContent = brightness + "%";

    } else if (selectedFilter.id === 'saturation') {
        saturation = range.value;
        filterValue.textContent = saturation + "%";
    } else if (selectedFilter.id === 'inversion') {
        inversion = range.value;
        filterValue.textContent = inversion + "%";

    } else if (selectedFilter.id === 'grayscale') {
        grayscale = range.value;
        filterValue.textContent = grayscale + "%";

    }

    applyFilter();

}

function save() {
    const canvas = document.createElement('canvas');
    const cntx = canvas.getContext('2d');
    canvas.width = previewImage.naturalWidth;
    canvas.height = previewImage.naturalHeight;

    cntx.filter = `brightness(${brightness}%) 
    saturate(${saturation}%) grayscale(${grayscale}%) invert(${inversion}%)`;
    cntx.scale(flipHorizontale, flipverticle);
    if (rotate !== 0) {
        cntx.rotate(rotate * Math.PI / 180)
    }
    cntx.drawImage(previewImage, -canvas.width / 2, -canvas.height / 2, canvas.width, canvas.height);
    cntx.translate(canvas.width / 2, canvas.height / 2);


    let link = document.createElement('a'); //creating <a> tag
    link.href = canvas.toDataURL();
    link.download = 'image.jpg';
    link.click();
}

function reset() {
    brightness = 100;
    saturation = 100;
    inversion = 0;
    grayscale = 0;
    flipHorizontale = 1;
    flipverticle = 1;
    rotate = 0

    updateRange(document.querySelector('.filter-btn.active'));
    applyFilter()
}


filterBtns.forEach(function (btn) {
    btn.onclick = function () {
        updateRange(btn)
    }
})

saveImage.onclick = save;
hiddenInput.onchange = uploadimage;
range.addEventListener('input', updateFilter);
resetFilter.onclick = reset;
uploadImageBtn.onclick = function () {
    hiddenInput.click()
};



rotateBtns.forEach(btn => {
    btn.onclick = function () {
        if (btn.id == 'right') {
            rotate += 90;
            if (rotate >= 360) {
                rotate = 0;
            }
        } else if (btn.id == 'left') {
            rotate += -90;
            if (rotate <= -360) {
                rotate = 0;
            }
        } else if (btn.id == 'horizontal') {
            flipHorizontale = flipHorizontale === 1 ? -1 : 1;
        } else if (btn.id == 'verticle') {
            flipverticle = flipverticle === 1 ? -1 : 1;
        }
        applyFilter()
    };
})