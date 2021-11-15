import { Component, OnInit } from '@angular/core';
import { EventsListenerService } from 'src/Services/events-listener.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  constructor(private eventsListener: EventsListenerService) { }

  ngOnInit(): void {
  }

  search(text: string){
    this.eventsListener.setSearchPostsTxt(text);
    console.log(`search texts ${text}`);
  }
}
