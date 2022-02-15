'use strict';
const todoControl = document.querySelector('.todo-control');
const headerInput = document.querySelector('.header-input');
const todoList = document.querySelector('.todo-list');
const todoCompleted = document.querySelector('.todo-completed');

let toDoData = localStorage.getItem('toDoData') ? JSON.parse(localStorage.getItem('toDoData')) : [];

const render = function() {  // интегрирует новые li вместо объектов массива
  todoList.innerHTML = '',  // обнуляем массив
  todoCompleted.innerHTML = '';

  toDoData.forEach(function(item) { // вставляем li в нужный список
    const li = document.createElement('li');
    li.classList.add('todo-item');
    li.innerHTML = '<span class="text-todo">' + item.text + '</span>' +
      '<div class="todo-buttons">' +
        '<button class="todo-remove"></button>' +
        '<button class="todo-complete"></button>' +
      '</div>';
    
    if (item.completed) {
      todoCompleted.append(li);
    } else {
      todoList.append(li);
    }

    localStorage.setItem('toDoData', JSON.stringify(toDoData)); 

    li.querySelector('.todo-complete').addEventListener('click', function() {
      item.completed = !item.completed;
      render();
    });

    li.querySelector('.todo-remove').addEventListener('click', function() {
       
    });
  });
};

todoControl.addEventListener('submit', function(event) {  // пушим объект с задачей в конец массива
  event.preventDefault();

  const newToDo = {
    text: headerInput.value,
    completed: false
  };

  if (newToDo.text !== '') { 
  toDoData.push(newToDo);
  headerInput.value = '';
  } 
  render();
});

