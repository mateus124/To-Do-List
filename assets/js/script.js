//função editar texto do modal
function editTextModal(p, h2) {
    document.querySelector('.modal-title > p').innerHTML = p;
    document.querySelector('.modal-title > h2').innerHTML = h2;
}

//função fechar modal
function closeModalF(e) {
    e.preventDefault();
    modal.classList.remove('modal-show');
    modalBg.classList.remove('modal-bg-show');
}

//função mostrar modal
function showModal() {
    modal.classList.add('modal-show');
    modalBg.classList.add('modal-bg-show');
}

//função marcar o texto
function loadCheck() {
    checkBoxList = document.querySelectorAll('input[type="checkbox"]');
    checkBoxList.forEach((item) => {
        item.addEventListener("change", () => {
            document.querySelector(`p[id="${item.id}"]`).classList.toggle('checked');
            document.querySelector(`h2[id="${item.id}"]`).classList.toggle('checked');
        });
    })
}

//Função dos botoes de editar
function loadEdit() {
    const editButtons = document.querySelectorAll('.task-edit');
    editButtons.forEach((button) => {
        button.addEventListener('click', () => {
            showModal();

            let taskContent = JSON.parse(localStorage.getItem(button.id));

            editTextModal("Editar a tarefa", taskContent.name);

            document.querySelector('#name').value = taskContent.name;
            document.querySelector('#desc').value = taskContent.desc;

            const modalForm = document.querySelector('.modal-form');
            modalForm.addEventListener('submit', (e) => {
                e.preventDefault();
        
                let task = {
                    name: document.querySelector('#name').value,
                    desc: document.querySelector('#desc').value
                }
        
                localStorage.setItem(button.id, JSON.stringify(task));
                location.reload();
            });
        });
    });
}

//Função dos botoes de deletar
function loadDelete() {
    const deleteButtons = document.querySelectorAll('.task-delete');
    deleteButtons.forEach((button) => {
        button.addEventListener('click', () => {
            localStorage.removeItem(button.id);
            location.reload();
        });
    });
}

//Funçao de adicionar novas tasks
function addNewTask(newName, newDesc, id) {
    if(newName == "") {
        return;
    }
    const taskExample = document.querySelector('.task'),
    taskList = document.querySelector('.list');

    //Configurando o cloneNode da nova task
    let clone = taskExample.cloneNode(true);
    clone.id = id;
    clone.querySelector('.task-data > h2').innerHTML = newName;
    clone.querySelector('.task-data > p').innerHTML = newDesc;
    clone.querySelector('.task-data > h2').id = id;
    clone.querySelector('.task-data > p').id = id;
    clone.querySelector('.task-delete').id = id;
    clone.querySelector('.task-edit').id = id;
    clone.querySelector('input[type="checkbox"]').id = id;
    clone.classList.remove('hidden');

    //Sumindo a mensagem de não possuir task
    noTaskAlert = document.querySelector('.notask').classList.add('hidden');

    //Adicionando clone a lista
    taskList.appendChild(clone);

    //Carregando as funções para a nova task
    loadDelete();
    loadEdit();
    loadCheck();
}

//quantas tasks existem
if(!localStorage.getItem("id")) {
    localStorage.setItem("id", '0');
}

//abrir modal ao adicionar
const newTaskButton = document.querySelector('.new-task-button'),
modal = document.querySelector('.modal'),
modalBg = document.querySelector('.modal-bg');

newTaskButton.addEventListener('click', () => {
    showModal();
    editTextModal("Criar", "Adicione uma tarefa");

    //Criando nova tarefa
    const modalForm = document.querySelector('.modal-form');
    modalForm.addEventListener('submit', (e) => {
        e.preventDefault();

        let task = {
            name: document.querySelector('#name').value,
            desc: document.querySelector('#desc').value
        }

        localStorage.setItem(localStorage.getItem("id"), JSON.stringify(task));
        addNewTask(task.name, task.desc, localStorage.getItem("id"));
        localStorage.setItem("id", `${parseInt(localStorage.getItem("id"))+1}`); //id++

        document.querySelector('#name').value = "";
        document.querySelector('#desc').value = "";
        
        document.querySelector('.modal').classList.remove('modal-show');
        document.querySelector('.modal-bg').classList.remove('modal-bg-show');
    });
});

//fechar modal no X e botão
modalClose = document.querySelectorAll('.modal-close');
modalClose.forEach((item) => {
    item.addEventListener('click', closeModalF);
});

//fechar modal clicando fora
modalBg.addEventListener('click', closeModalF);

//Exibindo todas as taks existentes
for(let i = 0; i <= parseInt(localStorage.getItem("id")); i++) {
    let cloneData = JSON.parse(localStorage.getItem(`${i}`));
    if(cloneData) {
        addNewTask(cloneData.name, cloneData.desc, i);
    }
}