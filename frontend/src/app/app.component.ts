import { Component, OnInit } from '@angular/core';
import { ApiService } from './core/services/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'frontend';

  data: any;

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.apiService.getSomeData().subscribe(data => {
      console.error(data);

      this.data = data;
      console.error(this.data);
    });
  }
}
