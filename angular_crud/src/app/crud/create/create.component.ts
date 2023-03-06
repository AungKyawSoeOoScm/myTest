import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CrudService } from '../crud.service';
@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  postForm: FormGroup;

  ngOnInit() {
    this.postForm = this.fb.group({
      title: [''],
      body: [''],
    })
  }


  constructor(
    public fb: FormBuilder,
    private router: Router,
    public crudService: CrudService
  ) { }
  submitForm() {
    this.crudService.create(this.postForm.value).subscribe(res => {
      console.log('Product created!')
      this.crudService.getAll();
      // this.router.navigateByUrl('/crud/home/')

    })
  }
}
