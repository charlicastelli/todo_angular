


import { Todo } from './../../models/todo.model';

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { faPlusSquare } from '@fortawesome/free-regular-svg-icons';

import { faTimes, faSave, faTrashAlt, faCheckCircle, faCircle } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {
  todos: Todo[] = [];
  btnText: string = 'SALVAR';
  public form!: FormGroup;
  smaalText: string = 'Este campo deve conter entre 3 e 60 caracteres';
  mode: string = 'list';
  faTimes = faTimes;
  faCircle = faPlusSquare;
  faSave = faSave;
  faTrashAlt = faTrashAlt;
  faCheckCircle = faCheckCircle;
  faRoadCircleCheck = faCircle;
  



  constructor(private formBuilder: FormBuilder) { 

    this.form = this.formBuilder.group({
      title: ['', Validators.compose([
        Validators.minLength(3),
        Validators.maxLength(60),
        Validators.required,
      ])]
    });
    this.load();
  }

  ngOnInit(): void {
    
  }

  add(){
    const title = this.form.controls['title'].value;
    const id = this.todos.length + 1;
    this.todos.push(new Todo(id, title, false));
    this.save();
    this.clear();
  }

  clear() {
    this.form.reset();
  }

  remove(todo: Todo) {
    const index = this.todos.indexOf(todo);

    if (index !== -1) {
      this.todos.splice(index, 1);
    }
    this.save();
  }

  markAsDone(todo: Todo) {
    todo.done = true;
    this.save();
  }

  markAsUndone(todo: Todo) {
    todo.done = false;
    this.save();
  }

  save() {
    const data = JSON.stringify(this.todos);
    localStorage.setItem('todos', data);
    this.mode = 'list';
  }

  load() {
    const data = localStorage.getItem('todos');
    
    if (data) {
      this.todos = JSON.parse(data!);
    }else {
      this.todos = [];
    }
  }

  changeMode(mode: string){
    this.mode = mode;
  }
}
