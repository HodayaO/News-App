import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Post } from 'src/Models/Post';
import { ApiManagerService } from 'src/Services/api-manager.service';
import { EventsListenerService } from 'src/Services/events-listener.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {

  posts: Post[] = [];
  filteredPosts: Post[] = [];

  filteredPostSubscription: Subscription;
  allPostSubscription: Subscription;

  constructor(private apiManager: ApiManagerService, private eventsListener: EventsListenerService) { 
    this.filteredPostSubscription = this.eventsListener.searchPostTxt.subscribe(txt => this.filterPosts(txt))
    this.allPostSubscription = this.eventsListener.allPosts.subscribe(posts => this.setPostProps(posts));
  }

  ngOnInit(): void {
    this.getAllPosts();

  }

  ngOnDestroy() {
    this.filteredPostSubscription.unsubscribe();
  }

  getAllPosts(){
    //this.apiManager.getPosts().subscribe(p => this.setPostProps(p));
    this.eventsListener.getAllPosts();
  }

  setPostProps(p: Post[]){
    this.posts = p;
    this.filteredPosts = this.posts;
  }
  filterPosts(txt: string): void {
    console.log(`filterPosts received new text:  ${txt}`);

    this.filteredPosts = this.posts.filter( p => p.title.includes(txt) || p.body.includes(txt) || p.createdBy.includes(txt));
  }
  
  add(){
    var post : Post = {id : 0, title: "", body: "", createdBy: "", createdDate: new Date()};
    this.eventsListener.setSelecedPost(post);
  }
}

