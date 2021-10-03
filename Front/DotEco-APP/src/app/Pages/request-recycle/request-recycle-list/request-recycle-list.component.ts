import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-request-recycle-list',
  templateUrl: './request-recycle-list.component.html',
  styleUrls: ['./request-recycle-list.component.css']
})
export class RequestRecycleListComponent implements OnInit {

  public requestRecycles: any;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getRequestRecycles();
  }

  public getRequestRecycles(): void {
    this.http.get('https://localhost:5001/api/requestrecycles').subscribe(
      response => this.requestRecycles = response,
      error => console.log(error)
    );
  }

}
