import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Subject } from 'rxjs';
import { Post } from 'src/Models/Post';
import { ApiManagerService } from './api-manager.service';

@Injectable({
  providedIn: 'root'
})
export class EventsListenerService {

  private _searchPostTxt = new Subject<string>();
  public searchPostTxt = this._searchPostTxt.asObservable();
  
  private _allPosts = new  Subject<Post[]>();
  public allPosts = this._allPosts.asObservable();

  private _selectedPost = new  Subject<Post>();
  public selectedPost = this._selectedPost.asObservable();

  constructor(private apiManager: ApiManagerService) { 
    this.getAllPosts();
  }

  setSearchPostsTxt(txt: string): void{
    console.log(`_searchPostTxt.next ${txt}`);

    this._searchPostTxt.next(txt);
  }

  setAllPosts(posts: Post[]){
    console.log(`_allPosts.next ${posts}`);

    this._allPosts.next(posts);
  }

  getAllPosts(){
    this.apiManager.getPosts().subscribe(res => this.setAllPosts(res));
  }

  addOrUpdatePost(post: Post) {
     this.apiManager.addOrUpdate(post).subscribe(res => {
       this.getAllPosts();
      // var posts: Post[] = [];
      // this.allPosts.pipe());
      // posts.push(res);
      // this._allPosts.next(posts);
      //  console.log(`this._allPosts: ${ this._allPosts}`);
      //  return res;
    });
    }

    setSelecedPost(selectedPost: Post) {
      this._selectedPost.next(selectedPost);
    }
    
    deletePost(post: Post){
      this.apiManager.deletePost(post.id).subscribe(res => {
        this.getAllPosts();
     
     });
     }
}
