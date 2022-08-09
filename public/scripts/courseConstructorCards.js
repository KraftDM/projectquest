let cardsContainer = document.getElementById('cards-container');
let cards = document.getElementById('cards');
let cardTop = cards.getBoundingClientRect().top;
let cardBottom = cards.getBoundingClientRect().bottom;

let SVGModels = {
    three_dots: "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"19.2\" height=\"19.2\" viewBox=\"0 0 24 24\" fill=\"#5f6368\" stroke=\"#5f6368\" stroke-width=\"1.95\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><circle cx=\"12\" cy=\"12\" r=\"1\"></circle><circle cx=\"12\" cy=\"5\" r=\"1\"></circle><circle cx=\"12\" cy=\"19\" r=\"1\"></circle></svg>",
    score: "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"19.2\" height=\"19.2\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"#5f6368\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z\"></path></svg>",
    calendar: " <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"19.2\" height=\"19.2\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"#5f6368\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><rect x=\"3\" y=\"4\" width=\"18\" height=\"18\" rx=\"2\" ry=\"2\"></rect><line x1=\"16\" y1=\"2\" x2=\"16\" y2=\"6\"></line><line x1=\"8\" y1=\"2\" x2=\"8\" y2=\"6\"></line><line x1=\"3\" y1=\"10\" x2=\"21\" y2=\"10\"></line></svg>",
    delete: "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"19.2\" height=\"19.2\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"#5f6368\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><polyline points=\"3 6 5 6 21 6\"></polyline><path d=\"M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2\"></path><line x1=\"10\" y1=\"11\" x2=\"10\" y2=\"17\"></line><line x1=\"14\" y1=\"11\" x2=\"14\" y2=\"17\"></line></svg>",
    copy: "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"19.2\" height=\"19.2\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"#5f6368\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><rect x=\"9\" y=\"9\" width=\"13\" height=\"13\" rx=\"2\" ry=\"2\"></rect><path d=\"M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1\"></path></svg>",
    radio_checked: "<svg width=\"19.2\" height=\"19.2\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z\" stroke=\"#5F6368\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/><circle cx=\"12\" cy=\"12\" r=\"5\" fill=\"#5F6368\"/></svg>",
    radio: "<svg width=\"19.2\" height=\"19.2\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z\" stroke=\"#5F6368\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/></svg>",
    checkbox_checked: "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"19.2\" height=\"19.2\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"#5f6368\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><polyline points=\"9 11 12 14 22 4\"></polyline><path d=\"M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11\"></path></svg>",
    checkbox: "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"19.2\" height=\"19.2\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"#5f6368\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><rect x=\"3\" y=\"3\" width=\"18\" height=\"18\" rx=\"2\" ry=\"2\"></rect></svg>",
    text: "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"19.2\" height=\"19.2\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"#5f6368\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><polyline points=\"4 7 4 4 20 4 20 7\"></polyline><line x1=\"9\" y1=\"20\" x2=\"15\" y2=\"20\"></line><line x1=\"12\" y1=\"4\" x2=\"12\" y2=\"20\"></line></svg>",
    x: "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"19.2\" height=\"19.2\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"#5f6368\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><line x1=\"18\" y1=\"6\" x2=\"6\" y2=\"18\"></line><line x1=\"6\" y1=\"6\" x2=\"18\" y2=\"18\"></line></svg>"
};

function createConstructorButton(svg, css, alt) {
    let div = document.createElement('div');
    div.classList.add('constructor-btn', 'cursor-pointer', 'flex-center', css);
    div.innerHTML = svg;
    if (typeof alt != 'undefined') {
        let altdiv = document.createElement('div');
        altdiv.classList.add('constructor-button-alt');
        altdiv.innerHTML = '<div class="relative" style="text-align: center">' + alt + '</div>';
        div.append(altdiv);
        div.addEventListener('mouseenter', function () {
            altdiv.classList.add('constructor-button-alt-show');
        });
        div.addEventListener('mouseleave', function () {
            altdiv.classList.remove('constructor-button-alt-show');
        });
    }
    return div;
}

function loadCardsList() {
    sortChapters().forEach(chapter => {
        cardsContainer.append(createCardChapter(chapter._id));
    });
    materialsDB.forEach(material => {
        if (material.mode != 'delete')
            cardsContainer.children[getDBChapterById(material.chapterId).index].append(createCard(material));
    });
    calcCardSpace();
}

function getDBChapterById(id) {
    return chaptersDB.filter(chapter => chapter._id == id)[0];
}

function getDBQuestionById(id) {
    return questionsDB.filter(question => question._id == id)[0];
}

function sortChapters() {
    return chaptersDB.sort((prev, next) => prev.index - next.index);
}

function getDBAnswerById(id) {
    return answersDB.filter(answer => answer._id == id)[0];
}

function getCardById(id) {
    if (typeof id == 'undefined')
        return document.getElementById('c-' + currentMaterial);
    else
        return document.getElementById('c-' + id);
}

function calcCardSpace() {
    let last = true;
    for (let i = chaptersDB.length - 1; i >= 0; i--) {
        let block = cardsContainer.children[i];
        block.classList.remove('block-bottom');
        if (block.childElementCount == 0) {
            block.classList.add('block-bottom');
        } else {
            if (last)
                block.classList.add('block-bottom');
            last = false;
        }
    }
}

function deleteCardsList() {
    while (cardsContainer.firstChild)
        cardsContainer.firstChild.remove();
}

function createCardChapter(chapterId) {
    let chapter = document.createElement('div');
    chapter.classList.add('block');
    chapter.id = 'c-' + chapterId;
    return chapter;
}

function createCard(materialDB) {
    let card = document.createElement('div');
    card.classList.add('card', 'usn');
    card.id = 'c-' + materialDB._id;

    card.append(createCardTopSector(materialDB.chapterId));
    card.append(createCardMiddleSector(materialDB));
    card.append(createCardBottomSector(materialDB));

    return card;
}

/*
    TOP SECTOR
*/

function createCardTopSector(chapterId) {
    let cardTopSector = document.createElement('div');
    cardTopSector.classList.add('card-top-sector', 'flex-center');

    let cardTopSectorContainer = document.createElement('div');
    cardTopSectorContainer.classList.add('flex-between', 'card-top-sector-container');
    cardTopSectorContainer.append(createCardChapterTitle(chapterId));
    cardTopSectorContainer.append(createConstructorButton(SVGModels.three_dots, 'l', 'Дополнительно'));

    cardTopSector.append(cardTopSectorContainer);
    return cardTopSector;
}

function createCardChapterTitle(chapterId) {
    let chapter = getDBChapterById(chapterId);
    let div = document.createElement('div');
    div.classList.add('flex-center');
    div.innerHTML = '<div class="card-chapter-number flex-center">' + (chapter.index + 1) + '</div>' +
        '<div class=\"card-chapter-title\">' + chapter.title + '</div>';
    return div;
}

function updateCardChapterTitle(block, title) {
    for (let i = 0; i < block.childElementCount; i++) {
        let ti = block.children[i].getElementsByClassName('card-chapter-title')[0];
        ti.innerText = title;
    }
}

/*
    MIDDLE SECTOR
*/

function createCardMiddleSector(materialDB) {
    let cardMiddleSector = document.createElement('div');
    cardMiddleSector.classList.add('card-middle-sector', 'flex-center');

    cardMiddleSector.append(createCardMaterialTitleRect(materialDB));
    cardMiddleSector.append(createCardMaterialInformationRect(materialDB));
    return cardMiddleSector;
}

function createCardMaterialTitleRect(materialDB) {
    let titleRect = document.createElement('div');
    titleRect.classList.add('material-title-rect');
    titleRect.append(createCardMaterialTitle(materialDB));
    return titleRect;
}

function createCardMaterialTitle(materialDB) {
    let div = document.createElement('div');
    div.classList.add('flex', 'material-title');
    div.append(createInputWithLine(materialDB.title, 'material-title-input', 'material-title-line'));
    div.getElementsByClassName('input')[0].addEventListener('blur', function () {
        materialDB.title = this.value;
        putMaterialbToServer(materialDB._id);
    });
    return div;
}

function updateCardMaterialTitle(card, title) {
    let input = card.getElementsByClassName('material-title-input')[0];
    input.value = title;
}

function createCardMaterialInformationRect(materialDB) {
    let informationRect = document.createElement('div');
    informationRect.classList.add('material-information-rect');
    informationRect.append(createCardInformation(SVGModels.score, materialDB.score,  'Баллы за прохождение'));
    let inputScore = informationRect.getElementsByTagName('input')[0];
    informationRect.children[0].addEventListener('click', function () {
        inputScore.focus();
    });
    inputScore.addEventListener('blur', function () {
        materialDB.score = inputScore.value;
        putMaterialToServer(materialDB._id);
    });
    informationRect.append(createCardInformation(SVGModels.calendar, materialDB.days, 'Время прохождения в днях'));
    let inputDays = informationRect.getElementsByTagName('input')[1];
    informationRect.children[1].addEventListener('click', function () {
        inputDays.focus();
    });
    inputDays.addEventListener('blur', function () {
        materialDB.days = inputDays.value;
        putMaterialToServer(materialDB._id);
    });
    informationRect.children[1].addEventListener('click', function () {

    });
    return informationRect;
}

function createCardInformation(svg, value, alt) {
    let div = document.createElement('div');
    div.classList.add('flex-center');
    div.append(createConstructorButton(svg, 'q', alt));

    let number = document.createElement('input');
    number.classList.add('curse-number-information-rect', 'flex-center');
    number.type = 'number';
    number.value = value;
    div.append(number);
    return div;
}

/*
    BOTTOM SECTOR
*/

function createCardBottomSector(materialDB) {
    let cardBottomSector = document.createElement('div');
    cardBottomSector.classList.add('card-bottom-sector', 'flex');

    if (materialDB.type == 'test') {
        cardBottomSector.append(createMaterialTestTools(materialDB._id));
        cardBottomSector.append(crateMaterialTestContent(materialDB._id));
    } else {
        cardBottomSector.append(createMaterialInfoTools(materialDB._id));
        cardBottomSector.append(createMaterialInfoContent(materialDB));
    }
    return cardBottomSector;
}

function createMaterialInfoTools(materialId) {
    let materialInfoTools = document.createElement('div');
    materialInfoTools.classList.add('material-test-tool', 'flex-column');

    materialInfoTools.append(createConstructorButton(SVGModels.delete, 'question-tool-btn', 'Удалить'));
    materialInfoTools.children[0].addEventListener('click', async function () {
        deleteMaterialToServer(materialId);
        findAncestor(this, 'card').remove();
    });
    return materialInfoTools;
}

function createMaterialTestTools(materialId) {
    let materialTestTools = document.createElement('div');
    materialTestTools.classList.add('material-test-tool', 'flex-column');

    materialTestTools.append(createConstructorButton(SVGModels.text, 'question-tool-btn', 'Строка'));
    materialTestTools.append(createConstructorButton(SVGModels.checkbox_checked, 'question-tool-btn', 'Несколько\nиз  списка'));
    materialTestTools.append(createConstructorButton(SVGModels.radio_checked, 'question-tool-btn', 'Один\nиз списка'));

    materialTestTools.children[0].addEventListener('click', async function () {
        let questionDB = await postQuestionToServer({materialId: materialId, type: 'text'});
        questionsDB.push(questionDB);

        let answerDB = await postAnswerToServer({questionId: questionDB._id, right: false});
        answersDB.push(answerDB);

        materialTestTools.parentElement
            .getElementsByClassName('material-content')[0].append(createCardQuestion(questionDB));

    });
    materialTestTools.children[1].addEventListener('click', async function () {
        let questionDB = await postQuestionToServer({materialId: materialId, type: 'checkbox'});
        questionsDB.push(questionDB);

        let answerDB = await postAnswerToServer({questionId: questionDB._id, right: false});
        answersDB.push(answerDB);

        materialTestTools.parentElement
            .getElementsByClassName('material-content')[0].append(createCardQuestion(questionDB));
    });
    materialTestTools.children[2].addEventListener('click', async function () {
        let questionDB = await postQuestionToServer({materialId: materialId, type: 'radio'});
        questionsDB.push(questionDB);

        let answerDB = await postAnswerToServer({questionId: questionDB._id, right: true});
        answersDB.push(answerDB);

        materialTestTools.parentElement
            .getElementsByClassName('material-content')[0].append(createCardQuestion(questionDB));
    });

    let line = document.createElement('div');
    line.classList.add('tool-horiz-line');
    materialTestTools.append(line);

    materialTestTools.append(createConstructorButton(SVGModels.delete, 'question-tool-btn', 'Удалить'));
    materialTestTools.children[4].addEventListener('click', async function () {
        deleteMaterialToServer(materialId);
        findAncestor(this, 'card').remove();
    });
    return materialTestTools;
}

function createMaterialInfoContent(materialDB) {
    let content = document.createElement('div');
    content.classList.add('material-content', 'flex-column');

    let question = document.createElement('div');
    question.classList.add('card-question');
    question.append(createMaterialTextInput(materialDB));
    content.append(question);
    return content;
}

function createMaterialTextInput(materialDB) {
    let input = document.createElement('textarea');
    input.classList.add('card-text', 'area-autosize');
    autosize(input);
    input.value = materialDB.text;
    input.style.minHeight = 188.8 + 'px';
    input.addEventListener('blur', function () {
        materialDB.text = this.value;
        putMaterialToServer(materialDB._id);
    });
    return input;
}

function crateMaterialTestContent(materialId) {
    let content = document.createElement('div');
    content.classList.add('material-content', 'flex-column');

    questionsDB.forEach(questionDB => {
        if (questionDB.materialId == materialId) {
            content.append(createCardQuestion(questionDB));
        }
    });

    return content;
}

function createCardQuestion(questionDB) {
    let question = document.createElement('div');
    question.classList.add('card-question');
    question.id = 'c-' + questionDB._id;

    if (questionDB.type != 'text') {
        question.append(createQuestion(questionDB));
    } else {
        question.append(createQuestionText(questionDB));
    }
    return question;
}

function createQuestion(questionDB) {
    let div = document.createElement('div');
    div.classList.add('card-question-top', 'flex-between');

    let questionContent = document.createElement('div');
    questionContent.classList.add('flex-column', 'card-question-content');
    div.append(questionContent);

    questionContent.append(createQuestionTitle(questionDB));
    questionContent.append(createQuestionAnswers(questionDB));
    div.append(createQuestionTools(questionDB._id));
    return div;
}

function createQuestionTitle(questionDB) {
    let div = document.createElement('div');
    div.classList.add('card-question-title');

    let materialTitle = document.createElement('div');
    materialTitle.classList.add('flex');

    let input = document.createElement('textarea');
    input.classList.add('question-title', 'area-autosize');
    autosize(input);
    input.value = questionDB.question;
    input.rows = 1;
    input.style.minHeight = '39px';
    input.addEventListener('focus', function () {
        this.style.background = '#f8f9fa';
    });
    input.addEventListener('blur', function () {
        this.style.background = '#fff';
        questionDB.question = this.value;
        putQuestionToServer(questionDB._id);
    });

    div.append(input);
    return div;
}

function createQuestionAnswers(questionDB) {
    let div = document.createElement('div');
    div.classList.add('card-question-answers');
    div.append(createQuestionOl(questionDB));
    return div;
}

function createQuestionOl(questionDB) {
    let ol = document.createElement('ol');
    ol.classList.add('question-answers');
    answersDB.forEach(answer => {
        if (answer.questionId == questionDB._id) {
            ol.append(createAnswer(answer, questionDB));
        }
    });
    ol.append(createNewAnswer(questionDB));
    return ol;
}

function createNewAnswer(questionDB) {
    let li = document.createElement('li');
    li.classList.add('answer', 'flex-center');

    let label = document.createElement('label');
    label.classList.add('input-button', 'cursor-pointer', 'flex-center');
    label.innerHTML = labelChecked(questionDB.type, false);
    li.append(label);
    let title = createAnswerTitle('Добавить вариант', true);
    title.addEventListener('click', async function () {
        let answerDB = await postAnswerToServer({questionId: questionDB._id, right: false});
        answersDB.push(answerDB);
        let answer = createAnswer(answerDB, questionDB);
        this.parentElement.before(answer);
        answer.getElementsByTagName('input')[1].focus();
        answer.getElementsByTagName('input')[1].select();
    });
    li.append(title);
    return li;
}

function createAnswer(answerDB, questionDB) {
    let li = document.createElement('li');
    li.classList.add('answer');
    li.id = 'c-' + answerDB._id;

    li.append(createAnswerLabelButton(answerDB, questionDB));
    li.append(createAnswerTitle(answerDB));
    li.append(createConstructorButton(SVGModels.x));
    li.lastChild.addEventListener('click', function () {
        deleteAnswerToServer(answerDB._id);
        li.remove();
    });
    return li;
}

function createAnswerLabelButton(answerDB, questionDB) {
    let div = document.createElement('div');
    let input = document.createElement('input');
    input.type = questionDB.type;
    input.id = 'b-' + answerDB._id;
    input.checked = answerDB.right;
    input.name = 'question-' + questionDB._id;
    input.value = answerDB._id;

    let label = document.createElement('label');
    label.classList.add('input-button', 'cursor-pointer', 'flex-center');
    label.htmlFor = input.id;
    label.innerHTML = labelChecked(questionDB.type, input.checked);

    if (questionDB.type == 'radio') {
        input.addEventListener('change', function () {
            let inputs = document.querySelectorAll('input[name="' + input.name + '"]');
            Array.from(inputs).forEach(inp => {
                if (!inp.checked) {
                    inp.nextElementSibling.innerHTML = labelChecked(questionDB.type, false);
                    let id = getElementId(findAncestor(inp.nextElementSibling, 'answer').id);
                    getDBAnswerById(id).right = false;
                    putAnswerToServer(id);
                }
            });
            this.nextElementSibling.innerHTML = labelChecked(questionDB.type, true);
            answerDB.right = true;
            putAnswerToServer(answerDB._id);
        });
    } else {
        input.addEventListener('change', function () {
            answerDB.right = true;
            putAnswerToServer(answerDB._id);
            this.nextElementSibling.innerHTML = labelChecked(questionDB.type, this.checked);
        })
    }

    div.append(input);
    div.append(label);
    return div;
}

function labelChecked(questionType, checked) {
    if (questionType == 'radio')
        return labelRadioChecked(checked);
    else
        return labelCheckboxChecked(checked);
}

function labelRadioChecked(checked) {
    if (checked)
        return SVGModels.radio_checked;
    else
        return SVGModels.radio;
}

function labelCheckboxChecked(checked) {
    if (checked)
        return SVGModels.checkbox_checked;
    else
        return SVGModels.checkbox;
}

function createAnswerTitle(answerDB, isnew) {
    let div = document.createElement('div');
    div.classList.add('answer-title', 'answer-title-li');
    div.style.width = '100%';
    if (isnew)
        div.append(createInputWithLine('Добавить вариант', 'new-answer-title-input', 'answer-title-line', 'left'));
    else
        div.append(createInputWithLine(answerDB.answer, 'answer-title-input', 'answer-title-line', 'left'));
    div.getElementsByTagName('input')[0].addEventListener('focus', function () {
        this.select();
    });
    div.getElementsByTagName('input')[0].addEventListener('blur', function () {
        answerDB.answer = this.value;
        putAnswerToServer(answerDB._id);
    });
    return div;
}

function createQuestionText(questionDB) {
    let div = document.createElement('div');
    div.classList.add('flex-between', 'card-question-top');

    let questionContent = document.createElement('div');
    questionContent.classList.add('card-question-content');
    div.append(questionContent);

    questionContent.append(createQuestionTitle(questionDB));
    let answer = answersDB.filter(answer => answer.questionId == questionDB._id)[0];
    questionContent.append();
    let title = document.createElement('div');
    title.classList.add('answer-title', 'answer-text');
    title.append(createInputWithLine(answer.answer, 'answer-text-title-input', 'answer-text-title-line', 'left'));
    title.getElementsByClassName('answer-text-title-input')[0].addEventListener('focus', function () {
        this.style.background = '#f8f9fa';
    });
    title.getElementsByClassName('answer-text-title-input')[0].addEventListener('blur', function () {
        answer.answer = title.getElementsByTagName('input')[0].value;
        console.log(answer)
        putAnswerToServer(answer._id);
        this.style.background = '#fff';
    });
    questionContent.append(title);
    div.append(createQuestionTools(questionDB._id));
    return div;
}

function createInputWithLine(value, cssinput, cssline, left) {
    let div = document.createElement('div');
    div.classList.add('hide-input-under-line');

    let input = document.createElement('input');
    input.classList.add(cssinput, 'input', 'hide-input');
    input.value = value;

    let line = document.createElement('div');

    if (left != 'left')
        line.classList.add('flex-center');

    line.innerHTML = '<div class="input-under-line ' + cssline + '"></div>';

    div.append(input);
    div.append(line);
    return div;
}

function createQuestionTools(questionId) {
    let div = document.createElement('div');
    div.classList.add('card-question-tool', 'flex-center');
    div.append(createConstructorButton(SVGModels.copy));
    div.append(createConstructorButton(SVGModels.delete));
    div.children[1].addEventListener('click', function () {
        findAncestor(div, 'card-question').remove();
        deleteQuestionToServer(questionId);
    });
    return div;
}


/*
function createCardMaterial(cardDB) {
    let material = document.createElement('div');
    material.classList.add('card-material');

    material.append(createCardMaterialContent(cardDB));
    material.append(createCardMaterialInformation(cardDB));

    return material;
}


function createCardMaterialContent(materialDB) {
    let content = document.createElement('div');
    content.classList.add('material-content');

    content.append(createChapterTitle(getDBChapterById(materialDB.chapterId).title));
    content.append(createMaterialTitle(materialDB.title));

    if (materialDB.type == 'info') {
        content.append(createMaterialText(materialDB.text));
    } else {
        createMaterialTest(materialDB._id).forEach(q => {
            content.append(q);
        });
    }
    return content;
}

function createChapterTitle(chapterTitle) {
    let title = document.createElement('h2');
    title.innerHTML = '§ ' + chapterTitle;
    return title;
}

function createMaterialTitle(materialTitle) {
    let title = document.createElement('div');
    title.classList.add('title');
    title.innerHTML = '<h1>' + materialTitle + '</h1><svg class="svgIcon fill-gray edit cursor-pointer" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 59.985 59.985" width="15px" height="15px"><path d="M5.243,44.844L42.378,7.708l9.899,9.899L15.141,54.742L5.243,44.844z M56.521,13.364l1.414-1.414c1.322-1.322,2.05-3.079,2.05-4.949s-0.728-3.627-2.05-4.949S54.855,0,52.985,0 s-3.627,0.729-4.95,2.051l-1.414,1.414L56.521,13.364z M4.099,46.527L0.051,58.669c-0.12,0.359-0.026,0.756,0.242,1.023c0.19,0.19,0.446,0.293,0.707,0.293 c0.106,0,0.212-0.017,0.316-0.052l12.141-4.047L4.099,46.527z M43.793,6.294l1.415-1.415l9.899,9.899l-1.415,1.415L43.793,6.294z"></path></svg>';
    titleFocus(title);
    return title;
}

function createMaterialText(materialText) {
    let text = document.createElement('p');
    text.innerText = replaceLink(materialText);
    return text;
}

function replaceLink(materialText) {
    return materialText.replace(/(?:(?:https?|ftp):\/\/|\b(?:[a-z\d]+\.))(?:(?:[^\s()<>]+|\((?:[^\s()<>]+|(?:\([^\s()<>]+\)))?\))+(?:\((?:[^\s()<>]+|(?:\(?:[^\s()<>]+\)))?\)|[^\s`!()\[\]{};:'".,<>?«»“”‘’]))?/ig, '<a href="$&">$&</a>');
}

function createMaterialTextInput(card) {
    let input = document.createElement('textarea');
    input.classList.add('edit-card-text');
    input.type = 'text';
    input.wrap = 'hard';
    input.cols = 78;

    const id = getElementId(card.id);
    let materialDB = getDBMaterialById(id);
    input.value = materialDB.text;
    input.rows = input.value.split(/\n/).length + 1;

    input.onkeyup = function (event) {
        if (event.which == 13 || event.which == 8 || event.which == 46)
            input.rows = input.value.split(/\n/).length + 1
    };

    return input;
}


function updateCardMaterialTitle(card, materialTitle) {
    let title = card.getElementsByTagName('h1')[0];
    let h1 = document.createElement('h1');
    h1.innerHTML = materialTitle;
    title.after(h1);
    title.remove();
}


function titleFocus(title) {
    title.onmouseover = function (event) {
        editShow(title.children[1]);
    };
    title.onmouseleave = function (event) {
        editDown(title.children[1]);
    }
}

function editDown(edit) {
    edit.classList.remove('edit-show');
}

function editShow(edit) {
    edit.classList.add('edit-show');
}

function createCardMaterialInformation(materialDB) {
    let information = document.createElement('div');
    information.classList.add('material-information');
    information.append(createCardInformation(materialDB));
    return information;
}

function createCardInformation(materialDB) {
    // рекоммендуемое время выполнения карточки
    let information = document.createElement('div');
    information.classList.add('card-information');

    information.append(createCardInformationTime());
    information.append(createCardInformationInputDays(materialDB.days));
    information.append(createCardInformationScore());
    information.append(createCardInformationInputScore(materialDB.score));
    //'';

    return information;
}

function createCardInformationTime() {
    let div = document.createElement('div');
    div.classList.add('card-information-param');

    div.innerHTML = '<h2>Рекомендуемое время выполнения</h2>';
    return div;
}

function createCardInformationInputDays(value) {
    let input = document.createElement('input');
    input.classList.add('information-input');
    input.type = 'number';
    input.step = '7';
    input.value = value;
    return input;
}

function createCardInformationScore() {
    let div = document.createElement('div');
    div.classList.add('card-information-param');

    div.innerHTML = '<h2>Количество получаемых баллов</h2>';
    return div;
}

function createCardInformationInputScore(value) {
    let input = document.createElement('input');
    input.classList.add('information-input');
    input.type = 'number';
    input.step = '10';
    input.value = value;
    return input;
}
*/

/*
    CARD TOOL
*/

/*
function createQuestionRadio() {
    let edit = document.createElement('div');
    edit.classList.add('card-tool-btn', 'card-tool-add-radio', 'cursor-pointer');
    edit.innerHTML = '1';
    return edit;
}

function createQuestionCheckbox() {
    let edit = document.createElement('div');
    edit.classList.add('card-tool-btn', 'card-tool-add-checkbox', 'cursor-pointer');
    edit.innerHTML = '<svg class="svgIcon"  xmlns="http://www.w3.org/2000/svg" width="18px" height="18px" viewBox="0 0 317.641 317.642"><path d="M317.641,33.159l-8.279-8.28l-33.188,33.188V20.733H0v276.175h276.174V74.626L317.641,33.159z M264.464,285.191H11.71V32.438h252.754v37.333L135.889,198.347l-60.508-60.514l-8.28,8.279l68.793,68.794l128.57-128.57V285.191z"></path></svg>';
    return edit;
}

function createQuestionInput() {
    let edit = document.createElement('div');
    edit.classList.add('card-tool-btn', 'card-tool-add-input', 'cursor-pointer');
    edit.innerHTML = '<svg class="svgIcon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 477.133 477.133" width="20px" height="20px" ><path d="M436.094,112.841H240.87v29.896c0,0.774-0.153,1.521-0.203,2.268h195.427c4.889,0,8.878,3.971,8.878,8.875V388.31 c0,4.901-3.989,8.873-8.878,8.873H129.301c-4.884,0-8.871-3.972-8.871-8.873v-39.315c-5.338,1.476-10.861,2.526-16.681,2.526 c-5.383,0-10.504-0.882-15.484-2.153v38.942c0,22.635,18.419,41.036,41.036,41.036h306.793c22.624,0,41.039-18.401,41.039-41.036 V153.879C477.133,131.24,458.718,112.841,436.094,112.841z M134.577,288.547V99.344h44.497l19.456,45.488c0.836,1.97,2.81,3.212,4.898,3.212c0.347,0,0.687-0.029,1.027-0.108 c2.482-0.513,4.252-2.686,4.252-5.199v-79.76c0-8.396-6.81-15.189-15.189-15.189H15.176C6.797,47.787,0,54.58,0,62.977v79.746 c0,2.527,1.768,4.7,4.235,5.197c0.357,0.095,0.714,0.124,1.071,0.124c2.078,0,4.018-1.225,4.872-3.225l19.452-45.475h43.288 v189.203c0,17.004,13.808,30.813,30.83,30.813C120.769,319.359,134.577,305.551,134.577,288.547z"></path></svg>';
    return edit;
}

function modeEditCardText(card) {
    let edit = card.getElementsByClassName('card-tool-text-edit')[0];
    let id = getElementId(card.id);
    edit.onclick = function (event) {
        if (!card.classList.contains('card-edit')) {
            card.classList.add('card-edit');
            edit.innerHTML = 'OK';
            let text = card.getElementsByTagName('p')[0];
            text.after(createMaterialTextInput(card));
            text.remove();
        } else {
            card.classList.remove('card-edit');
            edit.innerHTML = '<svg class="svgIcon" xmlns="http://www.w3.org/2000/svg" viewBox="-3.84 -3.84 71.68 71.68" width="20px" height="20px" stroke-width="3"><path d="M49.7574005,3.641675c-0.2174988-0.1520998-0.4855995-0.2114999-0.7468987-0.1636999 c-0.2602997,0.0467-0.4914017,0.1949-0.6424026,0.4122999L25.3518009,36.9533768 c-0.0888004,0.1266975-0.1463013,0.2728996-0.1687012,0.4269981l-1.5179996,10.4318008 c-0.0545998,0.3733978,0.1072998,0.7467995,0.4173012,0.9622993c0.170599,0.1189003,0.3704987,0.1794014,0.5702991,0.1794014 c0.1637993,0,0.3285999-0.0400009,0.4778004-0.1219025l9.2560005-5.0443001 c0.1364975-0.0741005,0.2534981-0.1783981,0.341198-0.3061981L57.743,10.4184752 c0.3149986-0.4524002,0.2038002-1.0743999-0.2486-1.3893003L49.7574005,3.641675z M33.2243996,42.1477737l-7.2964993,3.9757996 l1.1973-8.222599l22.3104-32.0499992l6.0992012,4.2458L33.2243996,42.1477737z M56.2173004,23.6249752c-0.551899,0-0.9984016,0.4465008-0.9984016,0.9983997v33.4958 c0,2.1419983-1.7421989,3.884201-3.8840981,3.884201H9.1864004c-2.1420002,0-3.8842001-1.7422028-3.8842001-3.884201V15.9707747 c0-2.1418991,1.7421999-3.8841991,3.8842001-3.8841991h24.8432999c0.5517998,0,0.9982986-0.4465008,0.9982986-0.9983006 s-0.4464989-0.9982996-0.9982986-0.9982996H9.1864004c-3.2427001,0-5.8809004,2.6381998-5.8809004,5.8807993V58.119175 c0,3.2425995,2.6382,5.8807983,5.8809004,5.8807983h42.1483994c3.2425995,0,5.8807983-2.6381989,5.8807983-5.8807983v-33.4958 C57.2155991,24.071476,56.7691002,23.6249752,56.2173004,23.6249752z M60.2495995,5.5067749l-8.0080986-5.3388c-0.4602013-0.306-1.0792999-0.1823-1.3843994,0.277 c-0.3062019,0.4591-0.1823006,1.0782,0.2767982,1.3844l8.0082016,5.3386998 c0.1706009,0.1131001,0.3625984,0.1676998,0.5527992,0.1676998c0.3226013,0,0.6394997-0.1559997,0.8316002-0.4445996 C60.8325996,6.4319749,60.7088013,5.8128753,60.2495995,5.5067749z"></path></svg>';
            let input = card.getElementsByTagName('textarea')[0];
            let text = input.value;
            getDBMaterialById(id).text = text;
            putMaterialToServer(id);
            input.after(createMaterialText(text));
            input.remove();
        }
    }
}

function modeEditCardTest(card) {
    let edit = card.getElementsByClassName('card-tool-text-edit')[0];
    edit.onclick = function (event) {
        if (!card.classList.contains('card-edit')) {
            card.classList.add('card-edit');
            edit.innerHTML = 'OK';
            editQuestionCard(card);
            edit.before(createQuestionRadio());
            edit.before(createQuestionCheckbox());
            edit.before(createQuestionInput());
            addRadioQuestion(card);
            addCheckboxQuestion(card);
            addInputQuestion(card);
        } else {
            card.classList.remove('card-edit');
            edit.innerHTML = '<svg class="svgIcon" xmlns="http://www.w3.org/2000/svg" viewBox="-3.84 -3.84 71.68 71.68" width="20px" height="20px" stroke-width="3"><path d="M49.7574005,3.641675c-0.2174988-0.1520998-0.4855995-0.2114999-0.7468987-0.1636999 c-0.2602997,0.0467-0.4914017,0.1949-0.6424026,0.4122999L25.3518009,36.9533768 c-0.0888004,0.1266975-0.1463013,0.2728996-0.1687012,0.4269981l-1.5179996,10.4318008 c-0.0545998,0.3733978,0.1072998,0.7467995,0.4173012,0.9622993c0.170599,0.1189003,0.3704987,0.1794014,0.5702991,0.1794014 c0.1637993,0,0.3285999-0.0400009,0.4778004-0.1219025l9.2560005-5.0443001 c0.1364975-0.0741005,0.2534981-0.1783981,0.341198-0.3061981L57.743,10.4184752 c0.3149986-0.4524002,0.2038002-1.0743999-0.2486-1.3893003L49.7574005,3.641675z M33.2243996,42.1477737l-7.2964993,3.9757996 l1.1973-8.222599l22.3104-32.0499992l6.0992012,4.2458L33.2243996,42.1477737z M56.2173004,23.6249752c-0.551899,0-0.9984016,0.4465008-0.9984016,0.9983997v33.4958 c0,2.1419983-1.7421989,3.884201-3.8840981,3.884201H9.1864004c-2.1420002,0-3.8842001-1.7422028-3.8842001-3.884201V15.9707747 c0-2.1418991,1.7421999-3.8841991,3.8842001-3.8841991h24.8432999c0.5517998,0,0.9982986-0.4465008,0.9982986-0.9983006 s-0.4464989-0.9982996-0.9982986-0.9982996H9.1864004c-3.2427001,0-5.8809004,2.6381998-5.8809004,5.8807993V58.119175 c0,3.2425995,2.6382,5.8807983,5.8809004,5.8807983h42.1483994c3.2425995,0,5.8807983-2.6381989,5.8807983-5.8807983v-33.4958 C57.2155991,24.071476,56.7691002,23.6249752,56.2173004,23.6249752z M60.2495995,5.5067749l-8.0080986-5.3388c-0.4602013-0.306-1.0792999-0.1823-1.3843994,0.277 c-0.3062019,0.4591-0.1823006,1.0782,0.2767982,1.3844l8.0082016,5.3386998 c0.1706009,0.1131001,0.3625984,0.1676998,0.5527992,0.1676998c0.3226013,0,0.6394997-0.1559997,0.8316002-0.4445996 C60.8325996,6.4319749,60.7088013,5.8128753,60.2495995,5.5067749z"></path></svg>';
            normalQuestionCard(card);
            edit.previousElementSibling.remove();
            edit.previousElementSibling.remove();
            edit.previousElementSibling.remove();
        }
    }
}

function addRadioQuestion(card) {
    let radioBtn = card.getElementsByClassName('card-tool-add-radio')[0];
    radioBtn.onclick = function () {
        addNewRadioQuestion(card);
    }
}

function addCheckboxQuestion(card) {
    let checkboxBtn = card.getElementsByClassName('card-tool-add-checkbox')[0];
    checkboxBtn.onclick = function () {
        addNewCheckboxQuestion(card);
    }
}

function addInputQuestion(card) {
    let inputBtn = card.getElementsByClassName('card-tool-add-input')[0];
    inputBtn.onclick = function () {
        addNewTextQuestion(card);
    }
}

/*
    TEST CARDS
*/
/*
async function addNewMultiQuestion(card, type) {
    let cardId = getElementId(card.id);
    let questionDB = await postQuestionToServer({materialId: cardId, type: type});
    questionsDB.push(questionDB);

    let question = createCardQuestion(questionDB, true);
    card.getElementsByClassName('material-content')[0].append(question);
    editMultiQuestion(question);

    createNewMultiAnswer(questionDB).then(answer => {
        question.getElementsByTagName('ol')[0].lastChild.before(answer);
    });
    createNewMultiAnswer(questionDB).then(answer => {
        question.getElementsByTagName('ol')[0].lastChild.before(answer);
    });
    addNewAnswer(question);
}

async function createNewMultiAnswer(questionDB) {
    let answerDB = await postAnswerToServer({questionId: questionDB._id, right: false});
    answersDB.push(answerDB);
    return createEditAnswer(answerDB, questionDB.type);
}


function addNewRadioQuestion(card) {
    addNewMultiQuestion(card, 'radio');
}

async function addNewCheckboxQuestion(card) {
    addNewMultiQuestion(card, 'checkbox');
}

async function addNewTextQuestion(card) {
    let cardId = getElementId(card.id);
    let questionDB = await postQuestionToServer({materialId: cardId, type: 'text'});
    questionsDB.push(questionDB);

    let answerDB = await postAnswerToServer({questionId: questionDB._id, right: true});
    answersDB.push(answerDB);

    let question = createCardQuestion(questionDB, true);
    card.getElementsByClassName('material-content')[0].append(question);


    editTextQuestion(question.getElementsByClassName('answer')[0]);
}

function createMaterialTest(materialId) {
    let questions = [];
    questionsDB.forEach(question => {
        if (question.materialId == materialId) {
            questions.push(createCardQuestion(question));
        }
    });
    return questions;
}


function createEditQuestionTitle(value) {
    let input = document.createElement('input');
    input.type = 'text';
    input.classList.add('question-title');
    input.value = value;
    return input;
}

function createQuestionTitle(value) {
    let title = document.createElement('h3');
    title.innerHTML = value;
    return title;
}


function createAnswer(answerDB, type) {
    let answer = document.createElement('div');
    answer.classList.add('answer');
    //answer.id =  'a-' + answerDB.id;

    answer.append(createAnswerRC(answerDB, type));
    answer.append(createAnswerLabel('a-' + answerDB.id, answerDB.answer));

    let li = document.createElement('li');
    li.append(answer);
    return li;
}

function createEditAnswer(answerDB, type) {
    let answer = document.createElement('div');
    answer.classList.add('answer');
    answer.append(createAnswerRC(answerDB, type));
    answer.append(createAnswerInput(answerDB.answer));

    let li = document.createElement('li');
    li.append(answer);
    li.append(createAnswerDeleteBtn());
    return (li);
}

function createAnswerRC(answerDB, type) {
    let input = document.createElement('input');
    input.name = 'question-' + answerDB.questionId;
    input.type = type;
    input.value = answerDB._id;
    input.id = 'a-' + answerDB._id;
    if (answerDB.right) {
        input.checked = true;
    }
    return input;
}

function createAnswerLabel(id, value) {
    let label = document.createElement('label');
    label.htmlFor = id;
    label.innerText = value;
    return label;
}

function createAnswerInput(value) {
    let input = document.createElement('input');
    input.type = 'text';
    input.value = value;
    return input;
}

function createAnswerDeleteBtn() {
    let button = document.createElement('div');
    button.classList.add('answer-delete', 'cursor-pointer');
    button.innerHTML = 'x';

    return button;
}

function createAnswerAddBtn() {
    let li = document.createElement('li');
    li.innerHTML = '<div class="answer" style="opacity: 0"></div><div class="answer-add cursor-pointer">+</div>';
    return li;
}

function createQuestionText(answerDB) {
    let answer = document.createElement('div');
    answer.classList.add('answer');
    answer.id = 'a-' + answerDB._id;
    answer.append(createQuestionTextLabel(answerDB.answer));
    return answer;
}

function createQuestionTextInput(value) {
    let input = document.createElement('input');
    input.classList.add('answer');
    input.type = 'text';
    input.value = value;
    return input;
}

function createQuestionTextLabel(value) {
    let label = document.createElement('label');
    label.innerText = value;
    return label;
}
*/

/*
    EDIT CARD TEST
*/
/*

function editQuestionCard(card) {
    let questions = card.getElementsByClassName('question');
    for (let i = 0; i < questions.length; i++) {
        let question = questions[i];
        let id = getElementId(question.id);
        let title = question.getElementsByTagName('h3')[0];
        title.after(createEditQuestionTitle(getDBQuestionById(id).question));
        title.after(createQuestionDeleteBtn(question));
        title.remove();
        if (question.classList.contains('q-text')) {
            editTextQuestion(question.getElementsByClassName('answer')[0]);
        } else {
            editMultiQuestion(question);
            addNewAnswer(question);
        }
    }
}

function createQuestionDeleteBtn(question) {
    let button = document.createElement('div');
    button.classList.add('question-delete-btn', 'cursor-pointer');
    button.innerHTML = 'x';
    button.onclick = function () {
        question.remove();
        let id = getElementId(question.id);
        getDBQuestionById(id).mode = 'delete';
        deleteQuestionToServer(id);
    };
    return button;
}

function normalQuestionCard(card) {
    let questions = card.getElementsByClassName('question');
    for (let i = 0; i < questions.length; i++) {
        let question = questions[i];
        let id = getElementId(question.id);
        let input = question.getElementsByClassName('question-title')[0];
        let questionBD = getDBQuestionById(id);
        questionBD.question = input.value;
        putQuestionToServer(id);
        input.after(createQuestionTitle(questionBD.question));
        input.remove();
        question.getElementsByClassName('question-delete-btn')[0].remove();
        if (question.classList.contains('q-text')) {
            normalTextQuestion(question.getElementsByClassName('answer')[0])
        } else {
            normalMultiQuestion(question);
        }
    }
}

function editTextQuestion(answer) {
    let label = answer.getElementsByTagName('label')[0];
    let id = getElementId(answer.id);
    label.after(createQuestionTextInput(getDBAnswerById(id).answer));
    label.remove();
}



function normalTextQuestion(answer) {
    let input = answer.getElementsByTagName('input')[0];
    let id = getElementId(answer.id);
    let answerDB = getDBAnswerById(id);
    let value = input.value;
    answerDB.answer = value;
    putAnswerToServer(id);
    input.after(createQuestionTextLabel(answerDB.answer));
    input.remove();
}

function editMultiQuestion(question) {
    let ol = question.getElementsByClassName('question-ol')[0];
    for (let i = 0; i < ol.childElementCount; i++) {
        editMultiAnswer(ol.children[i]);
    }
    ol.append(createAnswerAddBtn());
}

function normalMultiQuestion(question) {
    let ol = question.getElementsByClassName('question-ol')[0];
    ol.lastChild.remove();
    for (let i = 0; i < ol.childElementCount; i++) {
        normalMultiAnswer(ol.children[i]);
    }
}

function editMultiAnswer(answer) {
    let label = answer.getElementsByTagName('label')[0];
    label.after(createAnswerInput(label.innerText));
    label.remove();
    answer.append(createAnswerDeleteBtn());
    deleteAnswer(answer);
}

function normalMultiAnswer(answer) {
    answer.lastChild.remove();
    let input = answer.children[0].children[1];
    let text = input.value;
    let id = getElementId(answer.getElementsByTagName('input')[0].id);
    let answerDB = getDBAnswerById(id);
    answerDB.answer = text;
    let rc = answer.children[0].children[0];
    answerDB.right = rc.checked;
    putAnswerToServer(id);
    input.after(createAnswerLabel(answer.children[0].children[0].id, text));
    input.remove();
}

function addNewAnswer(question) {
    let addBtn = question.getElementsByClassName('answer-add')[0];
    addBtn.onclick = function () {
        let id = getElementId(question.id);
        let questionDB = getDBQuestionById(id);
        createNewMultiAnswer(questionDB).then(answer => {
            question.getElementsByTagName('ol')[0].lastChild.before(answer);
            deleteAnswer(answer);
        });
    }
}

function deleteAnswer(answer) {
    let deleteBtn = answer.getElementsByClassName('answer-delete')[0];
    deleteBtn.onclick = function () {
        answer.remove();
        let id = getElementId(answer.getElementsByTagName('input')[0].id);
        deleteAnswerToServer(id)
    }
}
*/
/*
    CHANGE CARD NAME
*/
/*
function modeEditCardTitle(card) {
    let edit = card.getElementsByClassName('edit')[0];
    edit.onclick = function (event) {
        let input = createCardInput(card);
        let title = card.getElementsByClassName('title')[0];
        title.children[0].remove();
        title.children[0].style.visibility = 'hidden';
        title.prepend(input);
        input.focus();
        input.select();
    }
}

function createCardInput(card) {
    let input = document.createElement('input');
    input.classList.add('edit-card-title');
    input.type = 'text';

    const id = getElementId(card.id);
    input.value = getDBMaterialById(id).title;

    input.onblur = function () {
        input.onkeyup = null;
        deleteCardInput(card, id, input.value);
    };

    input.onkeyup = function (event) {
        if (event.which == 13) {
            input.onblur = null;
            deleteCardInput(card, id, input.value);
        }
    };
    return input;
}

function deleteCardInput(card, id, value) {
    let materialDB = getDBMaterialById(id);
    materialDB.title = value.replace(/\s+/g, ' ').trim();
    putMaterialToServer(materialDB._id);
    if (listOpenChapters.indexOf(materialDB.chapterId) != -1) {
        let material = getMaterialById(id);
        material.getElementsByClassName('material-name')[0].innerHTML = getShortName(materialDB.title, 285);
    }
    let title = card.getElementsByClassName('title')[0];
    title.innerHTML = '<h1>' + materialDB.title + '</h1><svg class="svgIcon fill-gray edit cursor-pointer" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 59.985 59.985" width="15px" height="15px"><path d="M5.243,44.844L42.378,7.708l9.899,9.899L15.141,54.742L5.243,44.844z M56.521,13.364l1.414-1.414c1.322-1.322,2.05-3.079,2.05-4.949s-0.728-3.627-2.05-4.949S54.855,0,52.985,0 s-3.627,0.729-4.95,2.051l-1.414,1.414L56.521,13.364z M4.099,46.527L0.051,58.669c-0.12,0.359-0.026,0.756,0.242,1.023c0.19,0.19,0.446,0.293,0.707,0.293 c0.106,0,0.212-0.017,0.316-0.052l12.141-4.047L4.099,46.527z M43.793,6.294l1.415-1.415l9.899,9.899l-1.415,1.415L43.793,6.294z"></path></svg>';
    modeEditCardTitle(card);
}
*/
/*
    SCROLL CARDS
*/
/*
function scrollCards(event) {
    //currentChapterByPageY();
}

cards.addEventListener('scroll', function (event) {
    scrollCards(event);
});

function currentChapterByPageY() {
    let block = cardsContainer.children[0];
    let maxHeight = cards.clientHeight;
    let height = 0;
    let blockheight = [];
    while (height < maxHeight) {
        let id = getElementId(block.id);
        blockheight[id] = 0;
        for (let i = 0; i < block.childElementCount; i++) {
            let pos = block.children[i].getBoundingClientRect();
            if (pos.bottom > cardTop && pos.top <= cardTop) {
                let h = pos.bottom - cardTop + 20;
                height += h;
                blockheight[id] += h;
                continue;
            }
            if (pos.bottom >= cardBottom && pos.top < cardBottom) {
                let h = cardBottom - pos.top;
                height += h;
                blockheight[id] += h;
                continue;
            }
            if (pos.bottom > cardTop && pos.top < cardBottom) {
                let h = pos.height + 20;
                height += h;
                blockheight[id] += h;
                continue;
            }
        }
        blockheight[id] /= maxHeight;
        if (block.nextSibling == null)
            break;
        block = block.nextSibling;
    }
    let max = 0, maxblock = 0;
    blockheight.forEach((h, i) => {
        if (h > max) {
            max = h;
            maxblock = i;
        }
    });
    changeSelectedChapter(getChapterById(chaptersDB[maxblock].index));
}
*/