import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class TodoService {

  // constructor(private httpClient: HttpClient) { }


  private REST_API_SERVER = "http://127.0.0.1:8200";
  constructor(private httpClient: HttpClient) { }


  deleteTodoTask(id) {

    // var user = JSON.parse(localStorage.getItem('user'));
    // data['user'] = user.id;
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'JWT ' + localStorage.getItem('token'),
      })
    };

    return this.httpClient.delete(this.REST_API_SERVER + "/api/v1/todo/taskdetail/"+ id +"/", httpOptions)

  }

  updateTodoTask(data) {

    // var user = JSON.parse(localStorage.getItem('user'));
    // data['user'] = user.id;
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'JWT ' + localStorage.getItem('token'),
      })
    };

    return this.httpClient.patch(this.REST_API_SERVER + "/api/v1/todo/taskdetail/"+ data.id +"/", data, httpOptions)

  }

  createTodoTask(data) {

    var user = JSON.parse(localStorage.getItem('user'));
    data['user'] = user.id;
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'JWT ' + localStorage.getItem('token'),
      })
    };

    return this.httpClient.post(this.REST_API_SERVER + "/api/v1/todo/tasklistcreate/", data, httpOptions)

  }


  userTodoList() {

    var user = JSON.parse(localStorage.getItem('user'));
    // data['user'] = user.id;
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'JWT ' + localStorage.getItem('token'),
      })
    };

    return this.httpClient.get(this.REST_API_SERVER + "/api/v1/todo/tasklistcreate/", httpOptions)

  }

}
