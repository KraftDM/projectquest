let courses = {};
let courseType = 'active';

document.addEventListener('DOMContentLoaded', function (event) {
    let userId = getUserIdFromLocation();
    let request = new XMLHttpRequest();
    request.responseType = 'json';
    request.open('GET', '/api/users/' + userId + '/courses');
    request.onload = function () {
        courses = request.response;
        showCourses();
        tabLine.style.width = tabActive.getBoundingClientRect().width + 'px';
    };
    request.send();
});

function getUserIdFromLocation() {
    let url = window.location.href;
    let stuff = url.split('/');
    return stuff[4];
}

let courseBox = document.getElementById('courses-box');

function showCourses() {
    while (courseBox.firstChild !== null) {
        courseBox.firstChild.remove();
    }
    if (courseType == 'active') {
        courses.active.forEach(course => {
            courseBox.append(createCourse(course));
        });
    } else if (courseType == 'create') {
        courses.create.forEach(course => {
            courseBox.append(createCourse(course));
        });
    } else {

    }
}

function createCourse(course) {
    let div = document.createElement('div');
    div.classList.add('box');

    div.append(createCourseAva());
    if(courseType != 'create')
        div.append(createCourseInformation(course));
    div.append(createCourseIntro(course));

    return div;
}

function createCourseAva() {
    let div = document.createElement('div');
    div.classList.add('big-img');

    return div;
}

function createCourseInformation() {
    let div = document.createElement('div');
    div.classList.add('params');

    div.innerHTML = '<div class="param-name">Пройдено глав</div>' +
        '<div class="param-value">6/8</div>' +
        '<div class="param-name">Рейтинг</div>' +
        '<div class="param-value">1/12</div>' +
        '<div class="param-name">Кол-во баллов</div>' +
        '<div class="param-value">203</div>';

    return div;
}

function createCourseIntro(course) {
    let div = document.createElement('div');
    div.classList.add('intro');

    let t, a;
    if (courseType == 'create') {
        t = 'Редактировать';
        a = 'constructor'
    } else {
        t = 'Продолжить прохождение';
        a = 'passing'
    }
    div.innerHTML = '<div class="name-of-course">' + course.title + '</div>' +
        '<div class="name-of-notification">' + course.description + '</div>' +
        '<a href="/' + a + '/' + course._id + '"><div class="button">' + t + '</div></a>';

    return div;
}

let tabLine = document.getElementById('tab-choice');
let tabActive = document.getElementById('tab-active');
tabActive.onclick = function () {
    courseType = 'active';
    tabLine.style.width = tabActive.getBoundingClientRect().width + 'px';
    tabLine.style.left = 0 + 'px';
    showCourses();
};
let tabCreate = document.getElementById('tab-create');
tabCreate.onclick = function () {
    courseType = 'create';
    tabLine.style.width = tabCreate.getBoundingClientRect().width + 'px';
    tabLine.style.left = tabActive.getBoundingClientRect().width + 30 + 'px';
    showCourses();
};


let inputHashedLink = document.getElementById('input-hashed-link');
let buttonHashedLink = document.getElementById('button-hashed-link');
buttonHashedLink.addEventListener('click', function () {
    const json = JSON.stringify({hash: inputHashedLink.value});
    let request = new XMLHttpRequest();
    request.responseType = 'json';
    request.open('POST', '/api/courses/subscribe', true);
    request.setRequestHeader("Content-type", "application/json; charset=utf-8");
    request.onload = function () {
        if (typeof request.response.msg != 'undefined') {

        } else {
            console.log(request, request.response);
            courses.active.push(request.response);
            showCourses();
        }
    };
    request.send(json);
});