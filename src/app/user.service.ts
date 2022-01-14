import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { User } from './model/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private dbPath = '/users';  
  usersCollection: AngularFirestoreCollection<User>;

  // users :any = [
  //   {
  //     id :1,
  //     userName: 'The',
  //     firstName: 'Théo',
  //     lastName: 'Blake',
  //     age: 42,
  //     job :'Singer',
  //     avatar: '../../assets/icon/noimg.png',
  //     street :'hemptonshire st.',
  //     city: 'NY',
  //     zipCode :'z-023564',
  //   },
  //   {
  //     age: '34',
  //     avatar: '../../assets/icon/noimg.png',
  //     city :'Newark',
  //     firstName :'Bob',
  //     id :2,
  //     job :'Bass',
  //     lastName :'Bobless',
  //     street :'Lincoln Bvd.',
  //     userName :'Boby',
  //     zipCode :'z-8641',
  //   },
  //   {
  //     age : '35',
  //     avatar :'../../assets/icon/noimg.png',
  //     city :'Huntington',
  //     firstName :'John',
  //     id :3,
  //     job :'Lead Guitarist',
  //     lastName :'Zingerman',
  //     street :'Beach st.',
  //     userName: 'Zingzing',
  //     zipCode :'z-35846',
  //   },
  //   {
  //     age : 21,
  //     avatar: '../../assets/icon/noimg.png',
  //     city :'NY',
  //     firstName: 'Jimmy',
  //     id :4,
  //     job :'Keyboard',
  //     lastName :'Cho',
  //     street :'Chazam st.',
  //     userName: 'Jimmy',
  //     zipCode :'z-654564',
  //   },
  //   {
  //     age : '37',
  //     avatar: '../../assets/icon/noimg.png',
  //     city : 'Paterson',
  //     firstName: 'Nik',
  //     id : 5,
  //     job : 'Drummer',
  //     lastName : 'Paterson',
  //     street : 'Paterson st.',
  //     userName : 'Pat',
  //     zipCode : 'z-12347'
  //   },
  // ] ;

  constructor(private db: AngularFirestore) 
  { 
    this.usersCollection = db.collection(this.dbPath);
  }

  getAllUsers() :any
  {
    return this.usersCollection.snapshotChanges().pipe(
      map((changes:any) => {
        return changes.map((doc:any) => {
            return ({id: doc.payload.doc.id, ...doc.payload.doc.data()})
        })
      })
    );
  }

  saveNewUser(user: User) :any
  {
    return this.usersCollection.doc(user.userName).set({
      id: user.userName,
      userName: user.userName,
      firstName: user.firstName,
      lastName: user.lastName,
      avatar: user.avatar,
      age: user.age,
      job: user.job,
      street: user.street,
      city: user.city,
      zipCode: user.zipCode
    })
  }

  get(id :any) :any 
  {
    return new Observable(obs => {
      this.usersCollection.doc(id).get().subscribe(res => {
        obs.next({id: res.id, ...res.data()});
      });
    });
  }

  update(user: User) 
  {
    return new Observable(obs => {
      this.usersCollection.doc(user.id).update(user);
      obs.next();
    });
  }

  delete(id :any)
  {
    this.usersCollection.doc(id).delete();
  }

}
