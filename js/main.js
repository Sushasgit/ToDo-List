let saveButton = document.querySelector('.form-todo__save-button')
let targetUl = document.querySelector('.container-todo__list-todo');

class ToDoItem {
  constructor (text = '', id = ToDoItem.generateId()) {
    this.text = text
    this.done = false
    this.id = id
  }

  complete () {
    this.done = true
  }

  static generateId () {
    return '_' + Math.random().toString(36).substr(2, 9)
  };

  render () {
    if(this.done){
      return `
        <input class="complete-btn" data-id=${this.id} type="checkbox" checked>
        <span class="done">${this.text}</span>
        <button class="delete-btn" data-id=${this.id}>
            <img src="images/remove.png">
        </button>
     `
    } else{
      console.log(this.done)
      return `
        <input class="complete-btn" data-id=${this.id} type="checkbox">
        <span>${this.text}</span>
        <button class="delete-btn" data-id=${this.id}>
            <img src="images/remove.png">
        </button>
     `
    }
  }
}

let ToDoArr =[];

let saveToLocalStorage = (arr) => {
  let toDoJson = JSON.stringify(arr);
  localStorage.setItem('ToDoList',toDoJson);
}

let fromLocalStorage = () =>{
  if(localStorage.getItem('ToDoList')) {
    let temp = JSON.parse(localStorage.getItem('ToDoList'));
    temp.forEach((todo)=>{
      let newToDoItem = new ToDoItem(todo.text);
      newToDoItem.done = todo.done;
      ToDoArr.push(newToDoItem)
    })
  }
}

let renderToDoItem =(target, item)=>{
  let toDoLi = document.createElement('li');
  toDoLi.innerHTML=item.render()
  target.appendChild(toDoLi);
}

let renderToDoArr = (arr) =>{
      arr.forEach((todo)=>{
      renderToDoItem(targetUl,todo);
  })
}

fromLocalStorage();
renderToDoArr(ToDoArr)

let deleteToDo = (arr, id)=>{
  arr.forEach((elem)=>{
    if(elem.id ===id){
      arr.splice(arr.indexOf(elem),1);

    }
  })
  saveToLocalStorage(arr);
}

let completeToDo = (arr, id, checked)=>{
  arr.forEach((elem)=>{
    if(elem.id ===id){
      if(checked){
        elem.complete()
        console.log('helo')
      }else{
        elem.done= false;
      }
    }
  })
  saveToLocalStorage(arr);
}


saveButton.addEventListener('click', () => {
  if(document.todo_form.todo_input.value !== ""){
    let newTodo = new ToDoItem(document.todo_form.todo_input.value);
    ToDoArr.push(newTodo);
    saveToLocalStorage(ToDoArr);
    renderToDoItem(targetUl,newTodo);
  }else{
    alert('Нее, так нельзя :)');
  }
})

let deleteButtons = document.querySelectorAll('.delete-btn');
deleteButtons.forEach((button)=>{
    button.addEventListener('click', (e) => {
    e.preventDefault();
    deleteToDo(ToDoArr, button.dataset.id);
    button.parentElement.remove();
    console.log(ToDoArr)
  });
});

let checkboxes = document.querySelectorAll('.complete-btn');
checkboxes.forEach((checkbox)=>{
  checkbox.addEventListener('change', (e) => {
    e.preventDefault();
    if(checkbox.checked){
      completeToDo(ToDoArr,checkbox.dataset.id,true);
      checkbox.nextElementSibling.classList.add('done');
    }else{
      completeToDo(ToDoArr,checkbox.dataset.id,false);
      checkbox.nextElementSibling.classList.remove('done');
    }
  });
});




