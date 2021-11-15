import { Component, Input, OnInit } from '@angular/core';
import { Post } from 'src/Models/Post';
import { ApiManagerService } from 'src/Services/api-manager.service';
import { EventsListenerService } from 'src/Services/events-listener.service';
import { EditablePostComponent } from '../editable-post/editable-post.component';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  @Input() post?: Post;

  constructor(private eventsListener: EventsListenerService) { }


  ngOnInit(): void {
  }

  edit(){
    if (!this.post) return;

    this.eventsListener.setSelecedPost(this.post!);
    
    
  }
 
  delete(){
    if (!this.post) return;
    this.eventsListener.deletePost(this.post!);

  }
}
