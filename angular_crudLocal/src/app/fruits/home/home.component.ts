import { Component, OnInit } from '@angular/core';
import { Fruits } from '../fruits';
import { FruitsService } from '../fruits.service';
declare var window: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  allFruits: Fruits[] = [];
  deleteModal: any;
  idTodelete: number = 0;

  constructor(private fruitService: FruitsService) { }

  ngOnInit(): void {
    this.get();
  }

  get() {
    this.fruitService.get().subscribe((data) => {
      this.allFruits = data;
    });
  }

  openDeleteModal(id: number) {
    this.idTodelete = id;

  }

  delete(item: any) {
    let result = confirm(`Are you sure to delete '${item.name}'`);
    if (result) {
      this.fruitService.delete(item.id).subscribe({
        next: (data) => {
          this.allFruits = this.allFruits.filter(_ => _.id != item.id);
        },
      });
    }
  }
}
