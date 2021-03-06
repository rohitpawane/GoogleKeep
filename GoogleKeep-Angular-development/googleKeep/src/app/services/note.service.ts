/**
* @author: SANA SHAIKh
* @since: 9/April/2018
* @description: This is Note Service contains method to create note,update note,delete note,get notes
*/
import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { HttpService } from './http.service';
import { NoteModel } from '../model/notemodel';


@Injectable()
export class NoteService {

  status:boolean = true;  
  private viewSubject = new Subject<any>();
  private noteSubject = new Subject<any>();

  constructor(private httpService: HttpService ) { }

  /**@method: This method is to fetch notes */
  reloadNotes():void{
    var path = "getnotes";
    //debugger;
    this.httpService.getService(path)
                        .toPromise()
                          .then((res)=>{
                            
                            this.noteSubject.next(res);
                          
                            console.log("Notes fetched successfully");
                          });
   }

  changeView(){
    this.status = !this.status;
    this.viewSubject.next(this.status);
  }

  getStatus(){
    return this.viewSubject.asObservable();
  }

   /**@method: This method is to create notes */
  createNotes(note) :Observable<any>{
    return this.httpService.postService("notes/save", note);
  }

   /**@method: This method is to update notes */
  updateNotes(note):Observable<any>{
    return this.httpService.putService('updatenote',note);
  }

   /**@method: This method is to delete notes */
  deleteNote(noteId): Observable<any>{
    return this.httpService.deleteNoteService('deletenote'+'/' + noteId);
  }

/**
 * @method: This method will fetch the notes
 */
  fetchNotes(): any
  {
    return this.httpService.fetchNoteSetvice("notes/getnotes");
  }

  /**
   * @method: This method will set color on notes
   * @param selectedColor
   * @param noteId
   */
  setColor(selectedColor,noteId)
  {
    this.httpService.setColor(selectedColor, noteId);
  }

  /**
   *  @method: This method will update notes status
   * @param note
   */
  updateNoteData(note) {
    this.httpService.updateNoteData(note);
  }

  /**
   * @method: This method will add labels
   * @param model
   */
  addLabel(model)
  {
    
  }

  getLabel(url): any
  {
    return this.httpService.getLabel(url);
  }
}
