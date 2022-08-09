let curseList = document.getElementById('curse-list');
let listOpenChapters = [];
let currentMaterial = -1;
let currentChapter;

function loadCurseList() {
    appendChaptersInList();
    changeSelectedChapter(curseList.children[0]);
}

function appendChaptersInList() {
    chaptersDB.sort(function (a, b) {
        return a.index - b.index;
    }).forEach(chapterDB => {
        let chapter = createChapter(chapterDB);
        curseList.append(chapter);
    });
}

function getChapterSigns() {
    return '<span class="chapter-opener">' +
        '<svg class="svgIcon fill-gray" width="6" height="6" viewBox="5 5 4 8"><path d="M4 5v8l6-4z"/></svg></span>' +
        '<span class="chapter-sign usn">§</span>';
}

function getStaticChapter(title) {
    return getChapterSigns() +
        '<span class="list-elem chapter-name usn">' + getShortName(title, 305) + '</span>';
}

function createChapter(chapterDB) {
    let chapter = document.createElement('div');
    chapter.classList.add('chapter-box', 'list-box-elem');
    chapter.id = 'p-' + chapterDB._id;
    chapter.innerHTML = getStaticChapter(chapterDB.title);

    chooseChapter(chapter);
    return chapter;
}

function getShortName(name, maxWidth) {
    let c = document.createElement("canvas");
    let ctx = c.getContext("2d");
    ctx.font = '12px Inter';

    let i = 0;
    for (; i < name.length; i++) {
        let width = ctx.measureText(name.substring(0, i)).width + 15.5;
        if (width >= maxWidth) {
            break;
        }
    }
    if (i == name.length)
        return name;
    else
        return name.substring(0, i - 3) + ' ...';
}

function modeChangeChapterName(chapter) {
    chapter.innerHTML = getChapterSigns();
    let input = createChapterInput(chapter);
    chapter.append(input);
    input.focus();
    input.select();
    changeSelectedChapter(chapter);
}

function createChapterInput(chapter) {
    let input = document.createElement('input');
    input.classList.add('editChapterName', 'list-elem', 'chapter-name');
    input.type = 'text';

    const id = getElementId(chapter.id);
    input.value = getDBChapterById(id).title;

    input.onblur = function(event) {
        input.onkeyup = null;
        deleteChapterInput(chapter, id, input.value);
    };

    input.onkeyup = function (event) {
        if (event.which == 13){
            input.onblur = null;
            deleteChapterInput(chapter, id, input.value);
        }
    };
    return input;
}

function deleteChapterInput(chapter, id, value) {
    let chapterDB = getDBChapterById(id);
    chapterDB.title = value.replace(/\s+/g, ' ').trim();
    putChapterToServer(id);
    updateCardChapterTitle(getBlockById(), chapterDB.title);
    chapter.innerHTML = getStaticChapter(chapterDB.title);
}

function focusChapter(chapter) {
    chapter.classList.add('chapter-focus');
    if (chapter.classList.contains('chapter-open')) {
        materialsDB.forEach(m => {
            if (m.mode != 'delete' && m.chapterId == getDBChapterById(getElementId(chapter.id))._id) {
                getMaterialById(m._id).classList.add('chapter-material-focus');
            }
        })
    }
}

function focusoutChapter(chapter) {
    chapter.classList.remove('chapter-focus');
    if (chapter.classList.contains('chapter-open')) {
        materialsDB.forEach(m => {
            if (m.mode != 'delete' && m.chapterId == getDBChapterById(getElementId(chapter.id))._id) {
                getMaterialById(m._id).classList.remove('chapter-material-focus');
            }
        })
    }
}

function changeSelectedChapter(chapter) {
    focusoutChapter(getChapterById());
    currentChapter = getElementId(chapter.id);
    focusChapter(chapter);
}

function scrollToBlock() {
    let block = getBlockById();
    if (block != null)
        block.scrollIntoView();
}

function scrollToCard(materialId) {
    let card = getCardById(materialId);
    if (card != null) {
        card.scrollIntoView();
    }
}

function getBlockById(id) {
    if (typeof id == 'undefined') {
        return document.getElementById('c-' + currentChapter);
    } else {
        return document.getElementById('c-' + id);
    }
}

function getChapterById(id) {
    if (typeof id == 'undefined') {
        return document.getElementById('p-' + currentChapter);
    } else {
        return document.getElementById('p-' + id);
    }
}

function getMaterialById(id) {
    if (typeof id == 'undefined') {
        return document.getElementById('p-' + currentMaterial);
    } else {
        return document.getElementById('p-' + id);
    }
}

let curseListMousedown = false;
let move = false;
let lastTarget = null;
let timerId = null;
curseList.onmousedown = function (event) {
    curseListMousedown = true;
    contextMenuDown();
    let target = document.elementFromPoint(event.clientX, event.clientY);
    if (findAncestor(target, 'chapter-box') != null) {
        target = findAncestor(target, 'chapter-box');
        changeSelectedChapter(target);
        currentMaterial = -1;
        scrollToBlock();
        timerId = setTimeout(function () {
            if (curseListMousedown && lastTarget == target) {
                move = true;
                listOpenChapters.forEach(c => closeChapter(getChapterById(c)));
                moveChapter(target);
            }
        }, 500);
        lastTarget = target;
        return;
    }
    if (findAncestor(target, 'material-box')) {
        target = findAncestor(target, 'material-box');
        let materialId = getElementId(target.id);
        currentMaterial = materialId;
        let chapterId = getDBMaterialById(materialId).chapterId;
        changeSelectedChapter(getChapterById(chapterId));
        scrollToCard(materialId)
    }
};

function stopMoveChapter() {
    curseListMousedown = false;
    clearTimeout(timerId);
    curseList.onmousemove = null;
    curseList.onmouseup = function () {
        if(curseListMousedown)
            stopMoveChapter();
    };
    let cChapter = getChapterById();
    cChapter.removeAttribute('style');
    if (listOpenChapters.length != 0) {
        listOpenChapters.forEach(c => {
            let chapter = getChapterById(c);
            if (!chapter.classList.contains('chapter-open')) {
                openChapter(chapter);
            }
        });
    }
    focusChapter(cChapter);
}

function spliceChapters() {
    let chapters = curseList.getElementsByClassName('chapter-box');
    for (let i = 0; i < chapters.length; i++) {
        getDBChapterById(getElementId(chapters[i].id)).index = i;
    }
}

curseList.onmouseleave = function (event) {
    if (curseListMousedown)
        stopMoveChapter();
};

curseList.onmouseup = function () {
    if(curseListMousedown)
        stopMoveChapter();
};

curseList.onclick = function (event) {
    let target = document.elementFromPoint(event.clientX, event.clientY);
    if ((target = findAncestor(target, 'chapter-opener')) != null) {
        clickChapterOpener(target.parentElement);
    }
};

curseList.ondblclick = function (event) {
    let target = document.elementFromPoint(event.clientX, event.clientY);
    if (findAncestor(target, 'chapter-name') != null) {
        target = findAncestor(target, 'chapter-name');
        modeChangeChapterName(target.parentElement);
        return;
    }
    if (findAncestor(target, 'material-name') != null) {
        target = findAncestor(target, 'material-box');
        modeChangeMaterialName(target, getDBMaterialById(getElementId(target.id)));
        return;
    }
};

function clickChapterOpener(chapter) {
    let id = getElementId(chapter.id);
    if (chapter.classList.contains('chapter-open')) {
        closeChapter(chapter);
        let index = listOpenChapters.indexOf(id);
        if (index !== -1) listOpenChapters.splice(index, 1);
    } else {
        openChapter(chapter);
        listOpenChapters.push(id);
    }
    focusChapter(chapter);
}

function chooseChapter(chapter) {
    chapter.onclick = function (event) {
        changeSelectedChapter(chapter);
    };
}

function moveChapter(chapter) {
    chapter.style.opacity = '0.5';
    curseList.onmousemove = function (event) {
        let target = document.elementFromPoint(event.clientX, event.clientY);
        if ((target = findAncestor(target, 'chapter-box')) != null) {
            let nodes = Array.prototype.slice.call(curseList.children);
            let siblingId = nodes.indexOf(target);
            let currentId = nodes.indexOf(chapter);
            if (siblingId != currentId) {
                curseList.onmouseup = stopMove;
                if (siblingId - currentId > 0)
                    moveItemListForward(chapter);
                else
                    moveItemListBackward(chapter);
                spliceChapters();
                deleteCardsList();
                loadCardsList();
                scrollToBlock();
            }
        }
    }
}

function stopMove() {
    putChapterToServer(currentChapter);
    stopMoveChapter();
}

function moveItemListForward(item) {
    item.nextSibling.after(item);
    spliceChapters();
    deleteCardsList();
    loadCardsList();
    scrollToBlock();
}

function moveItemListBackward(item) {
    item.previousSibling.before(item);
    spliceChapters();
    deleteCardsList();
    loadCardsList();
    scrollToBlock();
}

async function addNewChapter() {
    let chapterDB = await postChapterToServer();
    chaptersDB.push(chapterDB);

    cardsContainer.append(createCardChapter(chapterDB._id));
    calcCardSpace();

    let chapter = createChapter(chapterDB);
    curseList.append(chapter);
    modeChangeChapterName(chapter);
}

function deleteChapter() {
    if (chaptersDB.filter(c => c.mode != 'delete').length > 1) {
        let chapter = getChapterById();
        getBlockById().remove();
        getDBChapterById(currentChapter).mode = 'delete';
        deleteChapterToServer(currentChapter);
        spliceChapters();
        if (chapter.classList.contains('chapter-open')) {
            closeChapter(chapter);
            let index = listOpenChapters.indexOf(currentChapter);
            if (index !== -1) listOpenChapters.splice(index, 1);
        }
        if (chapter.nextSibling != null)
            changeSelectedChapter(chapter.nextSibling);
        else
            changeSelectedChapter(chapter.previousSibling);
        chapter.remove();
    }
}

function getElementIndexOfList(element) {
    if (element != 'undefined')
        element = getChapterById();
    let nodes = Array.prototype.slice.call(curseList.children);
    return nodes.indexOf(element);
}

function getMaterialCount(chapterId) {
    return materialsDB.filter(elem => elem.chapterId == chapterId && elem.mode != 'delete').length;
}

function openChapter(chapter) {
    let opener = chapter.children[0].children[0];
    opener.style.transform = "rotate(90deg)";
    chapter.classList.add('chapter-open');
    let id = getElementId(chapter.id);
    let target = chapter;
    materialsDB.forEach(m => {
            if (m.chapterId == getDBChapterById(id)._id && m.mode != 'delete') {
                let material = createMaterial(m);
                target.after(material);
                target = material;
            }
        }
    );
}

function closeChapter(chapter) {
    let opener = chapter.children[0].children[0];
    opener.removeAttribute('style');
    chapter.classList.remove('chapter-open');
    let id = getElementId(chapter.id);
    for (let i = 0; i < getMaterialCount(id); i++) {
        chapter.nextSibling.remove();
    }
}

function getMaterialSigns(type) {
    let sign = type == 'info' ? 'i' : '?';
    return '<span class="material-sign usn">' + sign + '</span>';
}

function getStaticMaterial(title, type) {
    return getMaterialSigns(type) +
        '<span class="list-elem material-name usn">' + getShortName(title, 285) + '</span>';
}

function modeChangeMaterialName(material, materialDB) {
    material.innerHTML = getMaterialSigns(materialDB.type);
    let input = createMaterialInput(material, materialDB);
    material.append(input);
    input.focus();
    input.select();
}

function createMaterialInput(material, materialDB) {
    let input = document.createElement('input');
    input.classList.add('editMaterialName', 'list-elem', 'material-name');
    input.type = 'text';

    input.value = materialDB.title;

    input.onblur = function(){
        input.onkeyup = null;
        deleteMaterialInput(material, materialDB, input.value);
    };

    input.onkeyup = function (event) {
        if (event.which == 13){
            input.onblur = null;
            deleteMaterialInput(material, materialDB, input.value);
        }
    };
    return input;
}

function getDBMaterialById(id) {
    return materialsDB.filter(material => material._id == id)[0];
}

function deleteMaterialInput(material, materialDB, value) {
    materialDB.title = value.replace(/\s+/g, ' ').trim();
    putMaterialToServer(materialDB._id);
    updateCardMaterialTitle(getCardById(materialDB._id), materialDB.title);
    material.innerHTML = getStaticMaterial(materialDB.title, materialDB.type);
}

function createMaterial(materialDB) {
    let material = document.createElement('div');
    material.classList.add('material-box', 'list-box-elem', 'chapter-material-focus');
    material.id = 'p-' + materialDB._id;
    material.innerHTML = getStaticMaterial(materialDB.title, materialDB.type);
    return material;
}

function appendMaterial(materialDB) {
    //let count = materialsDB.filter( m => m.mode != 'delete' && m.chapterId == getDBChapterById(currentChapter)._id).length;
    let target = getChapterById();
    for (let i = 0; i < getMaterialCount(currentChapter); i++) {
        target = target.nextSibling;
    }
    let material = createMaterial(materialDB);
    target.after(material);
    focusChapter(getChapterById());
    modeChangeMaterialName(material, materialDB);
}

function deleteMaterial() {
    let material = getMaterialById();
    getCardById().remove();
    getDBMaterialById(currentMaterial).mode = 'delete';
    deleteMaterialToServer(currentMaterial);
    currentMaterial = -1;
    material.remove();
}

let contextMenu = document.getElementById('context-menu');
let contextMenuTarget = '';

contextMenu.onclick = function (event) {
    let target = document.elementFromPoint(event.clientX, event.clientY);
    if ((target = findAncestor(target, 'context-menu-item')) != null) {
        let key = target.children[1].innerText;
        let block = target.classList.contains('ctm-block');
        if (!block) {
            switch (key) {
                case 'Delete':
                    if (contextMenuTarget == 'chapter')
                        deleteChapter();
                    else
                        deleteMaterial();
                    break;
                case 'Ctrl + G':
                    addNewChapter();
                    break;
                case 'Ctrl + ↑':
                    if (contextMenuTarget == 'chapter') {
                        listOpenChapters.forEach(c => closeChapter(getChapterById(c)));
                        moveItemListBackward(getChapterById());
                        putChapterToServer(currentChapter);
                        stopMoveChapter();
                    } else {

                    }
                    break;
                case 'Ctrl + ↓':
                    if (contextMenuTarget == 'chapter') {
                        listOpenChapters.forEach(c => closeChapter(getChapterById(c)));
                        moveItemListForward(getChapterById());
                        putChapterToServer(currentChapter);
                        stopMoveChapter();
                    } else {
                        moveItemListForward(getMaterialById());
                    }
                    break;
                case 'Ctrl + R':
                    if (contextMenuTarget == 'chapter')
                        modeChangeChapterName(getChapterById());
                    else
                        modeChangeMaterialName(getMaterialById());
                    break;
                case 'Ctrl + T':
                    addNewTest();
                    break;
                case 'Ctrl + M':
                    addNewInfo();
                    break;
            }
        }
    }
};

async function addNewInfo() {
    let materialDB = await postMaterialToServer({chapterId: getDBChapterById(currentChapter)._id, type: 'info'});
    addNewMaterial(materialDB);
    materialsDB.push(materialDB);
}

async function addNewTest() {
    let materialDB = await postMaterialToServer({chapterId: getDBChapterById(currentChapter)._id, type: 'test'});
    addNewMaterial(materialDB);
    materialsDB.push(materialDB);
}

function openChapterAndRemember() {
    if (listOpenChapters.indexOf(currentChapter) == -1) {
        listOpenChapters.push(currentChapter);
        openChapter(getChapterById());
        return true;
    }
}

function addNewMaterial(materialDB) {
    openChapterAndRemember();
    appendMaterial(materialDB);
    cardsContainer.children[getDBChapterById(currentChapter).index].append(createCard(materialDB, materialsDB.length));
    calcCardSpace();
    scrollToCard(materialsDB.length)
}

function setContextMenuContent(event) {
    let target = document.elementFromPoint(event.clientX, event.clientY);
    if (findAncestor(target, 'chapter-box') != null) {
        contextMenuTarget = 'chapter';
        contextMenu.innerHTML =
            createContextMenuItem('Добавить тест', 'Ctrl + T') +
            createContextMenuItem('Добавить материал', 'Ctrl + M') +
            createContextMenuItem('Добавить главу', 'Ctrl + G', true) +
            createContextMenuItem('Переместить выше', 'Ctrl + ↑') +
            createContextMenuItem('Переместить ниже', 'Ctrl + ↓', true) +
            createContextMenuItem('Удалить', 'Delete') +
            createContextMenuItem('Переименовать', 'Ctrl + R') +
            createContextMenuItem('Вознаграждение', 'Ctrl + F');
        if (chaptersDB.filter(c => c.mode != 'delete').length == 1)
            contextMenu.children[7].classList.add('ctm-block');
        if (getElementIndexOfList() == 0)
            contextMenu.children[4].classList.add('ctm-block');
        if (getElementIndexOfList() == curseList.childElementCount - 1)
            contextMenu.children[5].classList.add('ctm-block');
        return;
    }
    if (findAncestor(target, 'material-box') != null) {
        contextMenuTarget = 'material';
        contextMenu.innerHTML =
            createContextMenuItem('Добавить тест', 'Ctrl + T') +
            createContextMenuItem('Добавить материал', 'Ctrl + M', true) +
            createContextMenuItem('Переместить выше', 'Ctrl + ↑') +
            createContextMenuItem('Переместить ниже', 'Ctrl + ↓', true) +
            createContextMenuItem('Удалить', 'Delete') +
            createContextMenuItem('Переименовать', 'Ctrl + R');
        return;
    }
    if (findAncestor(target, 'list-box') != null) {
        contextMenuTarget = 'list';
        contextMenu.innerHTML =
            createContextMenuItem('Добавить главу', 'Ctrl + G');
        return;
    }
}

function createContextMenuItem(text, key, border) {
    let item = '<li class="context-menu-item"><span class="menu-text usn">' + text +
        '</span><span class="menu-text-key usn">' + key + '</li>';
    if (border) {
        item += '<li class="context-menu-br"></li>'
    }
    return item;
}

function showMenu(x, y) {
    contextMenu.style.left = x + 5 + 'px';
    contextMenu.style.top = y + 5 - 54 + 'px';
    contextMenu.classList.add('show-menu');
}

function hideMenu() {
    contextMenu.classList.remove('show-menu');
    contextMenu.style.left = -230 + 'px';
}

function onContextMenu(event) {
    event.preventDefault();
    setContextMenuContent(event);
    let height = contextMenu.clientHeight;
    let y = event.clientY;
    if (y + height > document.documentElement.clientHeight - 20)
        y = document.documentElement.clientHeight - height - 20;
    showMenu(event.clientX, y);
    document.addEventListener('click', contextMenuDown, false);
}

function contextMenuDown(event) {
    hideMenu();
    document.removeEventListener('click', contextMenuDown);
}

curseList.addEventListener('contextmenu', onContextMenu, false);