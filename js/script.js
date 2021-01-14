const dataWrapper = document.querySelector('.data-wrapper');
let id;

// add data
const addData = document.querySelector('.add-data');
const addDataForm = document.querySelector('.add-data .form');

// Edit data
const editData = document.querySelector('.edit-data');
const editDataForm = document.querySelector('.edit-data .form');

const btnAdd = document.querySelector('.btn-add');
const tableUser = document.querySelector('.table-user');

const renderUser = doc =>{
    // creat data
    const tr = `
    <tr data-id='${doc.id}'>
        <td>${doc.data().nim}</td>
        <td>${doc.data().fullName}</td>
        <td>${doc.data().score}</td>
        <td class="text-center">
            <button class="btn btn-outline-primary btn-edit">Edit</button>
            <button class="btn btn-outline-danger btn-delete">Delete</button>
        </td>
    </tr>`;
    tableUser.insertAdjacentHTML('beforeend', tr);

    // Update data
    const btnEdit = document.querySelector(`[data-id='${doc.id}'] .btn-edit`);
    btnEdit.addEventListener('click', () =>{
        editData.classList.add('data-show');

        id = doc.id;
        editDataForm.nim.value = doc.data().nim;
        editDataForm.fullName.value = doc.data().fullName;
        editDataForm.score.value = doc.data().score;
    });

    // delete data
    const deleteData = document.querySelector(`[data-id='${doc.id}'] .btn-delete`);
    deleteData.addEventListener('click', () =>{
        db.collection('users').doc(`${doc.id}`).delete().then( () => {
            window.alert("Data successfully deleted!");
        }).catch(function(error) {
            console.error("Error removing document: ", error);
        });
    });
}

// Click add user button
btnAdd.addEventListener('click', () => {
    addData.classList.add('data-show');

    addDataForm.nim.value = '';
    addDataForm.fullName.value = '';
    addDataForm.score.value = '';
});

window.addEventListener('click', (e) => {
    if (e.target === addData) {
        addData.classList.remove('data-show');
    }
    else if (e.target === editData) {
        editData.classList.remove('data-show');
    }
});

// real time listener
db.collection('users').onSnapshot((snpashot) => {
    snpashot.docChanges().forEach( (change) => {
        if (change.type === 'added') {
            renderUser(change.doc);
        }

        if (change.type === 'removed') {
            let tr = document.querySelector(`[data-id="${change.doc.id}"]`);
            let tbody = tr.parentElement;
            tableUser.removeChild(tbody);
        }
    
        if (change.type === 'modified') {
            let tr = document.querySelector(`[data-id="${change.doc.id}"]`);
            let tbody = tr.parentElement;
            tableUser.removeChild(tbody);
            renderUser(change.doc);
        }
    });
});

// click add button
addDataForm.addEventListener('submit', (e) => {
    e.preventDefault();
    db.collection('users').add({
        nim: addDataForm.nim.value,
        fullName: addDataForm.fullName.value,
        score: addDataForm.score.value,
    });
    dataWrapper.classList.remove('data-show');
});

// click submit
editDataForm.addEventListener('submit', (e) => {
    e.preventDefault();
    db.collection('users').doc(id).update({
        nim: editDataForm.nim.value,
        fullName: editDataForm.fullName.value,
        score: editDataForm.score.value,
    });
    
    editData.classList.remove('data-show');
});
