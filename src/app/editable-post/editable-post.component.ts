import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Post } from 'src/Models/Post';
import { ApiManagerService } from 'src/Services/api-manager.service';
import { EventsListenerService } from 'src/Services/events-listener.service';

@Component({
  selector: 'app-editable-post',
  templateUrl: './editable-post.component.html',
  styleUrls: ['./editable-post.component.css']
})
export class EditablePostComponent implements OnInit {

  post: Post = {
    id : 0, 
    title : "", 
    body : "",
    createdBy: '',
    createdDate: new Date()
  };

  selectedPostSubscription: Subscription;

  constructor(private apiService: ApiManagerService, private eventsListener: EventsListenerService) { 
    this.selectedPostSubscription = this.eventsListener.selectedPost.subscribe(selected => this.setSelectedPost(selected))

  }

  ngOnInit(): void {
  }

  save(){
    if (!this.validation()){
      return alert("all fields must contain a value")
    }
    
    this.eventsListener.addOrUpdatePost(this.post);
    
  }

 validation(): boolean {
    if (!this.post.title || !this.post.body  || !this.post.createdBy || !this.post.createdDate) return false;
    return true;
  }

 setSelectedPost(selected: Post): void {
    this.post = selected;
  }
}




