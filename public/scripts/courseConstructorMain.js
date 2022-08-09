let chaptersDB = [];
let materialsDB = [];
let questionsDB = [];
let answersDB = [];
let courseId;

let runCourse = document.getElementById('run-curse');
runCourse.children[0].onclick = function () {
    APIPostJson('/api/courses/' + courseId + '/open', {}, function (result) {
        runCourse.children[1].style.display = 'flex';
        runCourse.children[1].children[1].innerHTML = result.hashe;
        runCourse.children[1].children[0].onclick = function (event) {
            runCourse.children[1].style.display = '';
        }
    });
};

function postChapterToServer() {
    return new Promise(resolve => {
        APIPostJson('/api/courses/' + courseId + '/chapters', {}, function (response) {
            resolve(response);
        });
    });
}

function postMaterialToServer(object) {
    return new Promise(resolve => {
        APIPostJson('/api/courses/' + courseId + '/materials', object, function (response) {
            resolve(response);
        });
    });
}

function postQuestionToServer(object) {
    return new Promise(resolve => {
        APIPostJson('/api/courses/' + courseId + '/questions', object, function (response) {
            resolve(response);
        });
    });
}

function postAnswerToServer(object) {
    return new Promise(resolve => {
        APIPostJson('/api/courses/' + courseId + '/answers', object, function (response) {
            resolve(response);
        });
    });
}

function putChapterToServer(chapterId) {
    return new Promise(resolve => {
        APIPutJson('/api/courses/' + courseId + '/chapters', getDBChapterById(chapterId), function (response) {
            resolve(response);
        });
    });
}

function putMaterialToServer(materialId) {
    return new Promise(resolve => {
        APIPutJson('/api/courses/' + courseId + '/materials', getDBMaterialById(materialId), function (response) {
            resolve(response);
        });
    });
}

function putQuestionToServer(questionId) {
    return new Promise(resolve => {
        APIPutJson('/api/courses/' + courseId + '/questions', getDBQuestionById(questionId), function (response) {
            resolve(response);
        });
    });
}

function putAnswerToServer(answerId) {
    return new Promise(resolve => {
        APIPutJson('/api/courses/' + courseId + '/answers', getDBAnswerById(answerId), function (response) {
            resolve(response);
        });
    });
}

function deleteChapterToServer(chapterId) {
    return new Promise(resolve => {
        APIDeleteJson('/api/courses/' + courseId + '/chapters', getDBChapterById(chapterId), function (response) {
            resolve(response);
        });
    });
}

function deleteMaterialToServer(materialId) {
    return new Promise(resolve => {
        APIDeleteJson('/api/courses/' + courseId + '/materials', getDBMaterialById(materialId), function (response) {
            resolve(response);
        });
    });
}

function deleteQuestionToServer(questionId) {
    return new Promise(resolve => {
        APIDeleteJson('/api/courses/' + courseId + '/questions', getDBQuestionById(questionId), function (response) {
            resolve(response);
        });
    });
}

function deleteAnswerToServer(answerId) {
    return new Promise(resolve => {
        APIDeleteJson('/api/courses/' + courseId + '/answers', getDBAnswerById(answerId), function (response) {
            resolve(response);
        });
    });
}

document.addEventListener('DOMContentLoaded', function () {
    courseId = getCourseIdFromLocation();
    APIGetJson('/api/courses/' + courseId + '/content', function (response) {
        chaptersDB = response.chapters;
        materialsDB = response.materials;
        questionsDB = response.questions;
        answersDB = response.answers;
        currentChapter = chaptersDB[0]._id;
        loadCurseList();
        loadCardsList();

        hideInputUnderLine(document.getElementsByClassName('hide-input-under-line')[0], 700 ,function (value) {
            APIPutJson('/api/courses', {_id: courseId, title: value}, function () {
            })
        });
        let materialsTitle = document.getElementsByClassName('material-title');
        Array.from(materialsTitle).forEach(title => {

        });
        let answersTitle = document.getElementsByClassName('answer-title');
        Array.from(answersTitle).forEach(title => {
            hideInputUnderLine(title.children[0], 600, function () {

            });
        });
        let ta = document.getElementsByClassName('area-autosize');
        Array.from(ta).forEach(t => {
            let height = t.scrollHeight < t.style.minHeight ? t.style.minHeight : t.scrollHeight;
            t.style.height = height + 'px';
        })


    });
})
;

function getCourseIdFromLocation() {
    let url = window.location.href;
    let stuff = url.split('/');
    return stuff[4];
}

function APIGetJson(url, callback) {
    let request = new XMLHttpRequest();
    request.responseType = 'json';
    request.open('GET', url);
    request.onload = function () {
        callback(request.response);
    };
    request.send();
}

function APIPostJson(url, object, callback) {
    return APIRequest(url, 'POST', object, callback);
}

function APIPutJson(url, object, callback) {
    return APIRequest(url, 'PUT', object, callback);
}

function APIDeleteJson(url, object, callback) {
    return APIRequest(url, 'DELETE', object, callback);
}

function APIRequest(url, type, object, callback) {
    const params = JSON.stringify(object);
    let request = new XMLHttpRequest();
    request.responseType = 'json';
    request.open(type, url, true);
    request.setRequestHeader("Content-type", "application/json; charset=utf-8");
    request.onload = function () {
        callback(request.response);
    };
    request.send(params);
}

/*
    HEADER
*/

function hideInputUnderLine(div, width, callback) {
    let input = div.children[0];
    input.style.width = getTextInputWidth(input) + 'px';
    let underline = div.getElementsByClassName('input-under-line')[0];
    input.onfocus = function () {
        underline.style.width = '100%';
        input.onkeydown = function () {
            let iWidth = getTextInputWidth(input);
            if (iWidth < width)
                input.style.width = iWidth + 'px';
        };
        input.onkeyup = function () {
            let iWidth = getTextInputWidth(input);
            if (iWidth < width)
                input.style.width = iWidth + 'px';
        };
    };
    input.onblur = function () {
        underline.style.width = null;
        callback(input.value);
    };
    div.onclick = function () {
        input.focus();
    }
}

function getTextInputWidth(input) {
    let c = document.createElement("canvas");
    let ctx = c.getContext("2d");
    ctx.font = window.getComputedStyle(input).fontSize + ' Inter';
    ctx.fontWeight = window.getComputedStyle(input).fontWeight;
    let width = ctx.measureText(input.value).width;
    return width + 15;
}


/*
let textInput = document.getElementById('set-material-name');

textInput.addEventListener("focusout", function() {
    materialsDB[currentMaterial].name = textInput.value;
});

function getNumberPx(str) {
    return +str.substring(0, str.length - 2);
}

mapBox.onmouseover = function(event){
    mapBox.addEventListener("wheel", onWheel);
};

mapBox.onclick = function (event) {
    let target = document.elementFromPoint(event.clientX, event.clientY);
    if (target.parentElement == mapBlockBox){
        mapBlockFocus(target);
    } else {
        mapBlockUnFocus();
    }
};

function mapBlockUnFocus() {
    if(currentMaterial != -1){
        mapBlockBox.children[currentMaterial].classList.remove('map-block-active');
        focusoutMaterial(getMaterialById());
    }
    currentMaterial = -1;
    textInput.value = '';
}

function mapBlockFocus(target){
    let id = getElementId(target.id);
    if(id == currentMaterial)
        return;

    target.classList.add('map-block-active');
    if(currentMaterial != -1)
        mapBlockBox.children[currentMaterial].classList.remove('map-block-active');

    let chapterId = materialsDB[id].chapter;
    let chapter = getChapterById(chapterId);
    if(listOpenChapters.indexOf(chapterId) == -1){
        openChapter(chapter);
        listOpenChapters.push(chapterId);
        changeSelectedChapter(chapter);
    }
    if(currentChapter != chapterId){
        changeSelectedChapter(chapter);
    }

    changeSelectedMaterial(getMaterialById(id));
    currentMaterial = id;

    // DO somethings else
    textInput.value = materialsDB[id].name;
}

function onWheel(event){
    let delta = event.deltaY || event.detail || event.wheelDelta;
    mapBlockContainer.style.top = getNumberPx(mapBlockContainer.style.top) - delta / 2.5 + 'px';
}


// mapBox.onmousedown = function(event){
//     let startX = event.clientX;
//     let startY = event.clientY;
//     mapBox.onmousemove = function(event){
//         let dX = startX - event.clientX;
//         let dY = startY - event.clientY;
//
//         moveMapBlockContainer(dX, dY);
//
//         startX -= dX;
//         startY -= dY;
//     };
// };
//
// window.onmouseup = function (event){
//     mapBox.onmousemove = null;
// };

let addInfo = document.getElementsByClassName('add-info')[0];
let addTest = document.getElementsByClassName('add-test')[0];

function addNewBlock(block){
    if(currentMaterial == materialsDB.length - 1 || currentMaterial == -1) {
        materialsDB.push(block);
        return appendMaterialBlock(block, materialsDB.length - 1);
    } else {
        materialsDB.splice(currentMaterial + 1, 0, block);
        return insertMaterialBlock(block, currentMaterial + 1)
    }
}

addInfo.onclick = function(event){
    let info = {type: 'info', name: 'New material', chapter: currentChapter};
    let block = addNewBlock(info);
    appendMaterial(info, false);
    mapBlockFocus(block)
};

addTest.onclick = function(event){
    let test = {type: 'test', name: 'New test', chapter: currentChapter};
    let block = addNewBlock(test);
    appendMaterial(test, false);
    mapBlockFocus(block);
};

function createMaterialBlock(materialblock, index) {
    let block = document.createElement('div');
    block.classList.add('map-block');
    block.id = 'b-' + index;

    switch (materialblock.type) {
        case 'info':
            block.classList.add('map-info');
            break;

        case 'test':
            block.classList.add('map-test');
            break;
    }
    return block;
}

function insertMaterialBlock(materialblock, index) {

    let block = createMaterialBlock(materialblock, index);

    mapBlockBox.children[index - 1].after(block);
    setPositionOfBlock(index);

    for(let i=index + 1; i < mapBlockBox.childElementCount; i++){
        let oldblock = mapBlockBox.children[i];
        oldblock.id = 'b-' + (i);
        setPositionOfBlock(i);
    }
    return block;
}

function appendMaterialBlock(materialblock, index){

    let block = createMaterialBlock(materialblock, index);

    mapBlockBox.append(block);

    if(index == 0) {
        block.style.left = 0 + 'px';
        block.style.bottom = 0 + 'px';
        return;
    }

    setPositionOfBlock(index);
    return block;
}

function setPositionOfBlock(index){

    let last = mapBlockBox.children[index - 1];
    let next = mapBlockBox.children[index];

    next.style.left = getNextYPositionBlock(index) + 'px';
    next.style.bottom = getNextXPositionBlock(index, getNumberPx(last.style.bottom)) + 'px';
}

function getNextYPositionBlock(i, x){
    return Math.sin(i / 10  * Math.PI) * 300;
}

function getNextXPositionBlock(i, x) {
    return Math.abs(Math.sin(i / 10 * Math.PI)) * 60  + x;
}

// mapBox.addEventListener('curseListMousedown', moveMouse);
//
//
//window.onmouseup = function(){
//     console.log('UP');
//     mapBox.removeEventListener('curseListMousedown', moveMouse);
// };


// let mapBox  = document.getElementById('map-block-box');
//
//
//
// document.addEventListener("DOMContentLoaded", function(event)
// {
//     window.onresize = function() {
//         updateMapBoxSizes();
//     };
// });
//
// function updateMapBoxSizes(){
//     mapBlocksWidth = document.documentElement.clientWidth - 620;
//     mapBlocks.style.width =  mapBlocksWidth + 'px';
//     mapBlocks.style.height = document.documentElement.clientHeight + 'px';
//
// }
/!*

selector_box.onclick= function (event) {
    let tab = findAncestor(event.target, 'selector');
    if (tab) {

        let oldtab = selector_box.children[active_select_tab];

        oldtab.classList.remove('selector-active');
        oldtab.getElementsByClassName('svgIcon')[0].classList.replace('fill-white', 'fill-blue');
        oldtab.getElementsByClassName('selector-container')[0].classList.remove('sc-active');

        tab.classList.add('selector-active');
        tab.getElementsByClassName('svgIcon')[0].classList.replace('fill-blue', 'fill-white');
        tab.getElementsByClassName('selector-container')[0].classList.add('sc-active');

        for (let i = 0; i < selector_box.childElementCount; i++) {
            if (selector_box.children[i] == tab) {
                active_select_tab = i;
                break;
            }
        }
        let a = active_select_tab - 1;
        let left = 135 + a * 49 + 40 * a;

        selector_pointer.children[0].style.width = left + 'px';
        selector_pointer.children[2].style.width = 270 - left + 'px';
    }
};
*!/*/

function findAncestor(el, cls) {
    while (!el.classList.contains(cls)) {
        el = el.parentElement;
        if (el == document.body) {
            return null;
        }
    }
    return el;
}


function getElementId(id) {
    return id.substring(2, id.length);
}
