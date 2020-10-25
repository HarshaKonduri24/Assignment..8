/*eslint-env browser*/
var employeeData = [
    [
        "0",
        "Sally Smith",
        "Quality Assurance",
        '3423'
    ],
    [
        "1",
        "Mark Martin",
        "VP Sales",
        '3346'
    ],
    [
        "2",
        "John Johnson",
        "Marketing",
        '3232'
    ],
]

function addingEmployeeInfo() {
    var table = document.getElementById('employee_table');
    var header = table.firstElementChild.firstElementChild;
    var rows = [header.innerHTML].concat(employeeData.map(function(emp) {
        return emp.reduce(function(row, col, index) {
            if (!index)
                row.push(`<tr id = ${col}>`);
            else
                row.push(`<td> ${col || ''} </td>`);
            return row;
        }, []).concat([`<td> <input type=\"button\" value=\"Delete\"> </td> </tr>`]);
    }).map(function(r) { return r.join(''); }));
    table.innerHTML = rows.join('');
    attachDeleteEvents();
    document.getElementById('count').innerText = rows.length - 1;
}

function deletingEmployeeInfo(event) {
    var employee_id = event.target.parentNode.parentNode.getAttribute("id") || '';
    if (!employee_id.length)
        return;
    var emp_index = -1;
    employeeData.forEach(function(emp, index) {
        if (emp[0] === employee_id) {
            emp_index = index;
        }
    });
    if (emp_index == -1) {
        window.alert("Employee id not found in the list");
        return;
    }
    employeeData.splice(emp_index, 1);
    addingEmployeeInfo();
}

function attachDeleteEvents() {
    var deleteButtons = document.querySelectorAll('#employee_table tbody tr td input[type=button]') || [];
    deleteButtons.forEach(function(ele) {
        ele.addEventListener('click', deletingEmployeeInfo)
    });
}

function $(id) {
    return document.getElementById(id);
}

function isVaild(ele) {
    var id = ele.id || '';
    var val = ele.value || '';
    var sts = {
        'isValid': true,
        'errorMsg': ''
    }
    if (id === 'name' || id === 'title') {
        if (!val.length) {
            sts['isValid'] = false;
            sts['errorMsg'] = `Empty ${id}!!`
        }
    } else if (id === 'extension') {
        var ext = Number(val);
        if (isNaN(ext) || ext < 0) {
            sts['isValid'] = false;
            sts['errorMsg'] = `Invalid ext!!`
        }
    }
    return sts;
}

function addEmployee() {
    var inputFields = [$('name'), $('title'), $('extension')];
    var isValidData = true;
    inputFields.forEach(function(ele) {
        var id = ele.id || '';
        if (id.length) {
            var sts = isVaild(ele);
            isValidData = isValidData && sts['isValid'];
            ele.nextElementSibling.innerText = sts['errorMsg'];
        }
    });
    if (!isValidData)
        return;
    var emp_id = String(Math.round(Math.random() * Math.pow(10, 10)));
    var newEmployee = [];
    newEmployee.push(emp_id);
    inputFields.forEach(function(ele) {
        newEmployee.push(ele.value);
        ele.value = '';
    });
    employeeData.push(newEmployee);
    addingEmployeeInfo();
}

function init() {
    addingEmployeeInfo();
    document.getElementById('add').addEventListener('click', addEmployee);
}

window.addEventListener('load', init);