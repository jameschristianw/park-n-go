import { Component, OnInit } from '@angular/core';

type SegmentedValue = 'parking' | 'places';
@Component({
  selector: 'app-history',
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.scss'],
})
export class HistoryPage implements OnInit {
  segmentedValue: SegmentedValue;

  constructor() {
    this.segmentedValue = 'parking';
  }

  ngOnInit() {}
}
