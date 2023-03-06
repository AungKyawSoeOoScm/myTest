import { Component, OnInit } from '@angular/core';
import { CrudService } from '../crud.service';
import { Post } from '../post';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  posts: Post[] = [];
  constructor(public crudService: CrudService) { }
  ngOnInit() {

    this.crudService.getAll().subscribe((data: Post[]) => {
      this.posts = data;
    })
  }
}
