import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

  @ViewChild("video1") video1
  @ViewChild("video2") video2
  @ViewChild("video3") video3
  @ViewChild("video4") video4
  constructor() { }

  ngOnInit(): void {
    // this.video1.nativeElement.muted
    // console.log(this.video1.nativeElement.muted)
  }

  ngAfterViewInit() {
    this.video1.nativeElement.muted = true
    console.log(this.video1.nativeElement.muted)
    this.video2.nativeElement.muted = true
    this.video3.nativeElement.muted = true
    this.video4.nativeElement.muted = true
  }

}
