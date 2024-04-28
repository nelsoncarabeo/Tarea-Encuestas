const todoInput = document.querySelector('.input');
const todoCollection = document.querySelector('.todo-collection');
const todoForm = document.querySelector('.todo-form');
let todos = [];

document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM INIT');

    let storedTodos = JSON.parse(localStorage.getItem('todos')) || [];
    storedTodos.forEach(element => {
        addTodoToDOM(element);
    });
});

todoForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let todoValue = todoInput.value.trim();

    if (todoValue !== ''){
        addTodoToDOM(todoValue);
        todos.push(todoValue);
        storeTodoOnLocalStorage();
        todoInput.value = '';
    }

});

function addTodoToDOM(value){
    const li = document.createElement('li');
    const todoTitle = document.createElement('span');
    const deleteButton = document.createElement('button');
    todoTitle.innerText = value;
    deleteButton.innerText='Delete';

    li.classList.add('todo-collection__item');
    todoTitle.classList.add('todo-collection__item_title');
    deleteButton.classList.add('button--delete');

    deleteButton.addEventListener('click', (e)=>{
        let previousElement = e.target.previousSibling;
        todos = todos.filter(item => item !== previousElement.innerText);
        storeTodoOnLocalStorage(todos);

        let parentElement = e.target.parentElement;
        parentElement.remove();

    });

    li.appendChild(todoTitle);
    li.appendChild(deleteButton);

    todoCollection.appendChild(li);
}

function storeTodoOnLocalStorage(value){
    localStorage.setItem('todos', JSON.stringify(todos));
}
