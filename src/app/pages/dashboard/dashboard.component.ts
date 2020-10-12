import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  endpoints =
  [
    {
      title: 'Title1',
      data: [
        {
          colorIndex: 0, value: 50, label: '200', childData: 1
        },
        {
          colorIndex: 1, value: 25, label: '200', childData: null
        },
      ]
    },
    {
      title: 'Title2',
      data: [
        {
          colorIndex: 0, value: 50, label: '200', childData: 1
        },
        {
          colorIndex: 1, value: 25, label: '200', childData: null
        },
      ]
    },
    {
      title: 'Title3',
      data: [
        {
          colorIndex: 0, value: 50, label: '200', childData: 1
        },
        {
          colorIndex: 1, value: 25, label: '200', childData: null
        },
      ]

    },
    {
      title: 'Title1',
      data: [
        {
          colorIndex: 0, value: 50, label: '200', childData: 1
        },
        {
          colorIndex: 1, value: 25, label: '200', childData: null
        },
      ]
    },
    {
      title: 'Title2',
      data: [
        {
          colorIndex: 0, value: 50, label: '200', childData: 1
        },
        {
          colorIndex: 1, value: 25, label: '200', childData: null
        },
      ]
    },
    {
      title: 'Title3',
      data: [
        {
          colorIndex: 0, value: 50, label: '200', childData: 1
        },
        {
          colorIndex: 1, value: 25, label: '200', childData: null
        },
      ]

    }
  ];
}
