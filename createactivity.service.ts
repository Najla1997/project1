import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Time } from '@angular/common';
export interface Activity {
  id?: string;
  namep:string;
  type_place:string;
  type_j:string;
  vistor_Type:string;
Date:string;
Time_start:string;
Time_end:string;
cost:string;
number_vist:number;
}

@Injectable({
  providedIn: 'root'
})
export class CreateactivityService {
  private todosCollection: AngularFirestoreCollection<Activity>;
 
  private todos: Observable<Activity[]>;
  constructor(db: AngularFirestore) {
    this.todosCollection = db.collection<Activity>('activity');
    this.todos = this.todosCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
   }
   getactivitys() {
    return this.todos;
  }
 
  getactivity(id) {
    return this.todosCollection.doc<Activity>(id).valueChanges();
  }
 
  updateactivity(activity: Activity, id: string) {
    return this.todosCollection.doc(id).update(activity);
  }
 
  addactivity(todo: Activity) {
    return this.todosCollection.add(todo);
  }
 
  removeactivity(id) {
    return this.todosCollection.doc(id).delete();
  }
  formateDate(date:Date):string{
    const day=date.getDate();
    const month=date.getMonth()+1;
    const year=date.getFullYear();
    return '${year}-${month}-${day}';
  }
  formateTime(time:Time):string{
    const hours=time.hours;
    const minutes=time.minutes;
   
    return '${hours}:${minutes}';
  }
}
