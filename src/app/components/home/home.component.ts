import { Component } from 'angular2/core';
import { CORE_DIRECTIVES } from 'angular2/common';
import { RouterLink } from 'angular2/router';
import { DataService } from '../../services/data.service';
import { ThumbnailPipe } from '../../pipes/thumbnail.pipe';
import { Category } from '../category/category';
import { CategoryComponent } from '../category/category.component';
import { SubCategoryComponent } from '../sub-category/sub-category.component';

@Component({
  selector: 'home',
  templateUrl: './app/components/home/home.html',
  directives: [CORE_DIRECTIVES, RouterLink],
  providers: [DataService],
  pipes: [ThumbnailPipe]
})



export class HomeComponent{
  title: string;
  categories: Category[] = [];
  selectedCategory: Category; 

  constructor(private _dataService: DataService) {}

  ngOnInit() {
      this.title = 'Categories';
      this.getCategories();
  }

  getCategories(){
    this._dataService.getCategories()
        .subscribe((categories:any[]) => {
          this.categories = categories;
        });
  }

  showSubCategories(category: Category){
    this.selectedCategory = category;
  }
}
