/* eslint-disable radix */
/* eslint-disable no-undef */
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-left-column',
  templateUrl: './left-column.component.html',
  styleUrls: ['./left-column.component.scss']
})
export class LeftColumnComponent implements OnInit {
  arr;

  arr2;

  btnDispArr: any [];

  constructor() {
    this.btnDispArr = [];
  }

  ngOnInit(): void {
    this.arr = document.getElementsByClassName('route-link');
    this.arr2 = document.getElementsByClassName('add-remove-btns');
    for (let i = 0; i < this.arr.length; i += 1) {
      this.arr[i].setAttribute('id', `route-link-${i + 1}`);
      this.arr2[i].setAttribute('id', `add-remove-btns-${i + 1}`);
      this.btnDispArr.push(false);
    }
  }

  // eslint-disable-next-line class-methods-use-this
  clickEndPoint(route: string) {
    document.getElementById(route).click();
  }

  displayAddRemoveBtns(route) {
    if (this.btnDispArr[parseInt(route) - 1] === false) {
      document.getElementById(`add-remove-btns-${route}`).style.display = 'block';
      this.btnDispArr[parseInt(route) - 1] = true;
    } else if (this.btnDispArr[parseInt(route) - 1] === true) {
      document.getElementById(`add-remove-btns-${route}`).style.display = 'none';
      this.btnDispArr[parseInt(route) - 1] = false;
    }
  }
}
