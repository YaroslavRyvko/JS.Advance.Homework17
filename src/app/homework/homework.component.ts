import { Component, OnInit } from '@angular/core';
import { IBlogs, IUsers } from '../shared/interfaces/add-data.interface';
import { DataserviceService } from '../shared/services/dataservice.service';


@Component({
  selector: 'app-homework',
  templateUrl: './homework.component.html',
  styleUrls: ['./homework.component.css']
})
export class HomeworkComponent implements OnInit {
  userstatus: boolean;
  username: string;
  email: string;
  password: string;
  users: Array<IUsers> = [];
  userexist: boolean;
  usernotexist: boolean;
  signInEmail: string;
  signInPassword: string;
  OnlineUser: string = '';
  buttonsUpdate: boolean;
  blogs: Array<IBlogs> = [];
  topic: string;
  message: string;
  blogId: number | string;
  userId: number | string;
  editIndex: number | string;
  constructor(private taskService: DataserviceService) { }

  ngOnInit(): void {
    this.getUsers();
    this.getBlogs();
  }

  getUsers(): void {
    this.taskService.getJSONUser().subscribe(
      data => {
        this.users = data;
      },
      error => {
        console.log(error);
      }
    );
  }

  getBlogs(): void {
    this.taskService.getJSONBlogs().subscribe(
      data => {
        this.blogs = data;
        this.checkRights();
      },
      error => {
        console.log(error);
      }
    )
  }


  addUser(): void {
    const USER: IUsers = {
      id: this.userId,
      username: this.username,
      email: this.email,
      password: this.password
    };
    for (let i = 0; i < this.users.length; i++) {
      if ((USER.email != this.users[i].email && USER.username != this.users[i].username)) {
        this.userexist = false;
      }
      else {
        this.userexist = true;
        break;
      }
    }
    if ((!this.userexist) && (this.password) && (this.email) && (this.username)) {
      this.taskService.postJSONUser(USER).subscribe(
        () => {
          this.getUsers();
        },
        error => {
          console.log(error);
        }
      )
    }
    this.username = '';
    this.password = '';
    this.email = '';
    console.log(this.users);
  }

  addBlog(): void {
    const Blog: IBlogs = {
      id: this.blogId,
      postedBy: this.OnlineUser,
      topic: this.topic,
      date: new Date(),
      message: this.message,
      checkRights: false
    };
    this.taskService.postJSONBlog(Blog).subscribe(
      () => {
        this.getBlogs();
      },
      error => {
        console.log(error);
      }
    )
    this.message = '';
    this.topic = '';
  }

  editBlog(editBlog: IBlogs, id: number | string): void {
    this.message = editBlog.message;
    this.topic = editBlog.topic;
    this.editIndex = id;
  }

  saveEditPost(): void {
    const Blog: IBlogs = {
      id: this.editIndex,
      postedBy: this.OnlineUser,
      topic: this.topic,
      date: new Date(),
      message: this.message,
      checkRights: false
    };
    this.taskService.editJSON(Blog).subscribe(
      () => {
        this.getBlogs();
      },
      error => {
        console.log(error);
      }
    )
    this.message = '';
    this.topic = '';
  }

  deleteBlog(index: string | number): void {
    this.taskService.deleteJSON(index).subscribe(
      () => {
        this.getBlogs();
      },
      error => {
        console.log(error);
      }
    )
  }

  signIn(event: any): void {
    for (let i = 0; i < this.users.length; i++) {
      if (this.signInEmail == this.users[i].email && this.signInPassword == this.users[i].password) {
        this.userstatus = true;
        this.OnlineUser = this.users[i].username;
        this.signInPassword = '';
        this.signInEmail = '';
        this.usernotexist = false;
        event.target.parentElement.firstChild.click();
        this.buttonsUpdate = true
        break;
      }
      else {
        this.usernotexist = true;
      }
    }
    console.log(this.OnlineUser);
    this.checkRights();
  }

  private checkRights(): void {
    for (let j = 0; j < this.blogs.length; j++) {
      if (this.OnlineUser == 'admin') {
        this.blogs[j].checkRights = true;
      }
      if (this.OnlineUser == this.blogs[j].postedBy) {
        this.blogs[j].checkRights = true;
      }
    }
  }

  signOut(): void {
    for (let j = 0; j < this.blogs.length; j++) {
      this.blogs[j].checkRights = false;
    }
    this.buttonsUpdate = false;
    this.userstatus = false;
    this.OnlineUser = '';
  }
}