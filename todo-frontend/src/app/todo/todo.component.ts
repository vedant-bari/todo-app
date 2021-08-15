import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ValidationErrors } from '@angular/forms';
import { formatDate } from '@angular/common' 

import { TodoService } from '../services/todo.service';
import { LoginService } from '../services/login.service';
import * as moment from 'moment';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {


  timePicker = { minuteInterval: 1 };
  TodoTaskForm: FormGroup;
  TodoTaskUpdateForm: FormGroup;
  updateMode: Boolean = false;
  deleteMode: Boolean = false;
  taskDeleteId: any = null;
  minDate = moment(new Date()).format('YYYY-MM-DD')
  public profileData : any = {};
  public todoList: any = [];

  constructor(
    // private router: Router,
    private fb: FormBuilder,
    private todoService: TodoService,
    // private loginService: LoginService,
  ) { }

  ngOnInit(): void {
    this.getTaskList();
    this.generateTodoForm();
    this.profileData = JSON.parse(localStorage.getItem('user'));
    // this.getTweetList();
    // this.getAllUserslist();
    // this.getFollowersTweetList();   
    // this.getAllFollowerslist();
  }

  generateTodoForm(){
    this.TodoTaskForm = this.fb.group({
    'task_name': ['', Validators.required],
    'due_date': ['', Validators.required],
    'description': ['', Validators.required],
  });
  }

  updateTodoForm(data){
    this.TodoTaskUpdateForm = this.fb.group({
    'id': [data.id],
    'task_name': [data.task_name, Validators.required],
    'due_date': [data.due_date, Validators.required],
    'description': [data.description, Validators.required],
    'start_date': [{ value : data.start_date, disabled: true},],
    // 'last_updated':[data.last_updated],
    'is_completed':[data.is_completed,],
      
  });
  }

  get f() { return this.TodoTaskForm.controls; }
  get h() { return this.TodoTaskUpdateForm.controls; }

  getTaskList(){
    // console.log("tweet", this.tweet)
    this.todoService.userTodoList().subscribe(
      resp=>{
        this.todoList = resp; 
        console.log("get todo list", this.todoList)  
      },
      error =>{
        console.log("resp",error) 
      }
    )
  }

  onEdit(todo){
    
    this.updateMode = true
    todo.due_date = formatDate(todo.due_date,'MM/dd/yyyy','en');
    todo.start_date = formatDate(todo.start_date,'MM/dd/yyyy','en');
    this.updateTodoForm(todo)  
    console.log("update", this.TodoTaskUpdateForm)


  }

  cancelEdit(){
    this.updateMode = false; 
  }

  ondelete(todo){
    this.deleteMode = true
    console.log("todo delete", todo)
    this.taskDeleteId =todo.id
  }

  cancelDelete(){
    this.deleteMode = false
    this.taskDeleteId = null; 
  }  

  deleteTask(){
    console.log("todo delete", this.taskDeleteId)
    if(this.taskDeleteId){
      
      this.todoService.deleteTodoTask(this.taskDeleteId).subscribe(
        resp=>{
           console.log("resp",resp) 
           
           this.taskDeleteId = null; 
           this.getTaskList();
           this.deleteMode = false
          //  this.tweetList.unshift(resp) 
        },
        error =>{
          console.log("resp",error) 
        }
      )

    }

  }


  onSubmit(){
    console.log("tweet", this.TodoTaskForm)

    
    
    if (this.TodoTaskForm.valid){
      this.f.due_date.setValue(formatDate(this.f.due_date.value,'yyyy-MM-dd','en'));
      this.todoService.createTodoTask(this.TodoTaskForm.value).subscribe(
        resp=>{
           console.log("resp",resp) 
          //  this.tweetList.unshift(resp) 
           this.todoList.unshift(resp)
           this.TodoTaskForm.reset()
        },
        error =>{
          console.log("resp",error) 
        }
      )
    } 
    
  }
  

  updateTask(data){
    delete data.start_date
    console.log("tweet", data)
    // this.TodoTaskUpdateForm.
    data.due_date = formatDate(data.due_date,'yyyy-MM-dd','en');
    // this.f.due_date.setValue(formatDate(this.f.start_date.value,'yyyy-MM-dd','en'));
    
    if (this.TodoTaskUpdateForm.valid){
      this.todoService.updateTodoTask(data).subscribe(
        resp=>{
           console.log("resp",resp)
           this.updateMode = false; 
           this.getTaskList();
          //  this.tweetList.unshift(resp) 
        },
        error =>{
          console.log("resp",error) 
        }
      )
    } 

  }
  

}
