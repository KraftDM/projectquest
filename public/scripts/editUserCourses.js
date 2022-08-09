let createCourseBtn = document.getElementById('create-course');
createCourseBtn.onclick = function (event) {
    let request = new XMLHttpRequest();
    request.responseType = 'json';
    request.open('POST', '/api/courses');
    request.onload = function() {
        let course = request.response;
        console.log(course);
        window.location.href = '/constructor/' + course._id;
    };
    request.send();
};
