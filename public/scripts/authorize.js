let reg = document.getElementById('registration-submit');
if (reg != null) {
    reg.onclick = function (event) {
        postRegistrationForm(event);
    };
}

function postRegistrationForm(event) {
    event.preventDefault();
    if (validateEmail(rows[0].input.value)) {
        if (rows[1].input.value.trim() != '' && rows[1].input.value.indexOf(' ') == -1) {
            let form = document.forms['registration-form'];
            const params = JSON.stringify({
                username: form.username.value,
                mail: form.mail.value,
                password: form.password.value
            });
            const request = new XMLHttpRequest();
            request.responseType = "json";
            request.open("POST", '/registration', true);
            request.setRequestHeader("Content-type", "application/json; charset=utf-8");

            request.onreadystatechange = function () {
                if (request.status == 200) {
                    let user = request.response;
                    window.location.href = 'users/' + user._id + '/courses';
                }
                if (request.status == 402) {
                    rows[0].setErrorMsg('Пользователь с данным адресом уже существует');
                    rows[0].errorShow();
                }
            };
            request.send(params);
        } else {
            rows[1].setErrorMsg('Не верный формат пароля');
            rows[1].errorShow();
        }
    } else {
        rows[0].setErrorMsg('Не верный формат электронного аддреса');
        rows[0].errorShow();
    }
}

let log = document.getElementById('login-submit');
if (log != null) {
    log.onclick = function (event) {
        postLoginForm(event);
    };
}

function postLoginForm(event) {
    event.preventDefault();

    if (validateEmail(rows[0].input.value)) {
        let form = document.forms['login-form'];
        const params = JSON.stringify({
            mail: form.mail.value,
            password: form.password.value
        });
        const request = new XMLHttpRequest();
        request.responseType = "json";
        request.open("POST", '/login', true);
        request.setRequestHeader("Content-type", "application/json; charset=utf-8");

        request.onreadystatechange = function () {
            if (request.status == 200) {
                let user = request.response;
                window.location.href = 'users/' + user._id + '/courses';
            }
            if (request.status == 403) {
                rows[1].setErrorMsg('Не верный пароль');
                rows[1].errorShow();
            }
            if (request.status == 402) {
                rows[0].setErrorMsg('Пользователя с таким аддресом не существет');
                rows[0].errorShow();
            }
        };
        request.send(params);
    } else {
        rows[0].setErrorMsg('Не верный формат электронного аддреса');
        rows[0].errorShow();
    }
}

/*
    Inputs
*/

function rowsForm(row) {
    this.input = row.getElementsByClassName('form-input')[0];
    this.placeholder = row.getElementsByClassName('input-placeholder')[0];
    this.error = {
        node: row.getElementsByClassName('error')[0],
        msg: row.getElementsByClassName('error-msg')[0],
        valid: true
    };
    this.oldInputValue = '';
    this.setListeners();
    if (this.input.value.trim() != '') {
        this.placeholder.classList.add('input-placeholder-up');
    }
}

rowsForm.prototype = {
    setListeners: function () {
        this.input.addEventListener('focus', this.focusInput.bind(this));
        this.input.addEventListener('focusout', this.focusoutInput.bind(this))
        this.placeholder.addEventListener('click', function () {
            this.input.focus();
        }.bind(this));
    },
    focusInput: function () {
        this.input.classList.add('form-input-focus');
        this.focusPlaceholder();
    },
    focusoutInput: function () {
        this.input.classList.remove('form-input-focus');
        this.placeholder.classList.remove('input-placeholder-focus');
        if (this.input.value.trim() == '') {
            this.placeholder.classList.remove('input-placeholder-up', 'input-placeholder-error');
        }
    },
    focusPlaceholder: function () {
        this.placeholder.classList.add('input-placeholder-focus', 'input-placeholder-up');
        if (!this.error.valid)
            this.placeholder.classList.add('input-placeholder-error');
    },
    setErrorMsg: function (msg) {
        this.error.msg.innerText = msg;
    },
    errorShow: function () {
        this.error.valid = false;
        this.error.node.classList.add('error-show');
        this.input.classList.add('form-input-error');
        if (this.input.value.trim() != '')
            this.placeholder.classList.add('input-placeholder-error');
        this.changeInputVal();
        this.oldInputValue = this.input.value;
    },
    errorHide: function (evt) {
        if (!this.error.valid && this.input.value != this.oldInputValue) {
            this.error.valid = true;
            this.error.node.classList.remove('error-show');
            this.input.classList.remove('form-input-error');
            this.placeholder.classList.remove('input-placeholder-error');
            this.input.removeEventListener('keydown', this.errorHide.bind(this));
        }
    },
    changeInputVal: function () {
        this.input.addEventListener('keyup', this.errorHide.bind(this));
    },
};

function validateEmail(email) {
    let re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

let rows = [];
Array.from(document.getElementsByClassName('row-input')).forEach(node => rows.push(new rowsForm(node)));
