import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { sortBy } from 'lodash';
import { analyzeAndValidateNgModules } from '@angular/compiler';


export interface CompanyItem {
  companyName: string;
  isDeleted: boolean;
  insertedAt: Date;
}

export interface pnritem {
  prefix: string;
  suffix: number;
  // insertedAt: Date;
}

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private messageSource = new BehaviorSubject('default message');
  selectedcustomer = this.messageSource.asObservable();

  private itemsCollection: AngularFirestoreCollection<CompanyItem>;
  items: Observable<CompanyItem[]>;
  pnrCollection;
  constructor(
    private _afs: AngularFirestore,
    private _http: HttpClient
  ) {
    this.itemsCollection = _afs.collection<CompanyItem>('registeration');
    this.pnrCollection = _afs.collection<pnritem>('pnr');

  }

  selectcustomer(data: any) {
    this.messageSource.next(data)
  }

  getData(fdate, tdate): Promise<any> {
    if (fdate.toDateString() === tdate.toDateString()) {
      var datum = Date.parse(fdate.toDateString());
      let a = datum / 1000;
      return new Promise((resolve, reject) => {
        this._afs.collection('registeration', x => x
          .where('isDeleted', '==', false)
          .where('timestamp', '==', a)
        )
          .snapshotChanges().subscribe(res => {
            let responseData: any = [];
            res.forEach(element => {
              const response: any = {};
              response['id'] = element.payload.doc.id;
              response['data'] = element.payload.doc.data();
              responseData.push(response);
            });
            responseData = sortBy(responseData, 'data.insertedAt.seconds').reverse();
            resolve(responseData);
          }, error => {
            reject(error);
          });
      });
    } else {
      fdate.setDate(fdate.getDate());
      tdate.setDate(tdate.getDate() + 1);
      return new Promise((resolve, reject) => {
        this._afs.collection('registeration', x => x.orderBy("insertedAt").startAfter(fdate).endAt(tdate)
          .where('isDeleted', '==', false)
        )
          .snapshotChanges().subscribe(res => {
            let responseData: any = [];
            res.forEach(element => {
              const response: any = {};
              response['id'] = element.payload.doc.id;
              response['data'] = element.payload.doc.data();
              responseData.push(response);
            });
            responseData = sortBy(responseData, 'data.insertedAt.seconds').reverse();
            resolve(responseData);
          }, error => {
            reject(error);
          });
      });
    }
  }

  // save(data: any): Promise<firebase.firestore.DocumentReference> {
  //   return new Promise((resolve, reject) => {
  //     this._afs.collection('registeration', x => x
  //       .where('isDeleted', '==', false)
  //       // .where('companyName', '==', data['companyName'])
  //       )
  //       .get()
  //       .subscribe(res => {
  //         if (data['id']) {
  //           if (!res.empty && res.docs[0].id !== data['id']) {
  //             reject({ message: 'Company Name already used.' });
  //           } else {
  //             const updatedId = data['id'];
  //             delete data['id'];
  //             data.updatedAt = firebase.firestore.FieldValue.serverTimestamp();
  //             this.itemsCollection.doc(updatedId).update(data).then(() => {
  //               resolve();
  //             }).catch((err) => {
  //               reject(err);
  //             });
  //           }
  //         } 
  //         else {
  //           if (!res.empty) {
  //             reject({ message: 'Company Name already used.' });
  //           } else {
  //             data.isDeleted = false;
  //             data.insertedAt = firebase.firestore.FieldValue.serverTimestamp();
  //             this.itemsCollection.add(data).then((response) => {
  //               resolve(response);
  //             }).catch((err) => {
  //               reject(err);
  //             });
  //           }
  //         }
  //       });
  //   });
  // }


  save(datas: any): Promise<firebase.firestore.DocumentReference> {
    return new Promise((resolve, reject) => {
      this._afs.collection('pnr', x => x
      )
        .get()
        .subscribe(res => {
          if (res) {
            let responseData: any = [];
            res.forEach(element => {
              const response: any = {};
              response['id'] = element.id;
              response['data'] = element.data();
              responseData.push(response);
            });
            console.log('res', responseData)

            const s = Number(responseData[0].data.suffix) + 1
            const p = responseData[0].data.prefix
            const newpnr = p + s;
            const newdata = {
              prefix: p,
              suffix: s
            }
            this.pnrCollection.doc(responseData[0].id).update(newdata).then(() => {
              this._afs.collection('registeration', x => x)
              datas.isDeleted = false;
              datas.insertedAt = firebase.firestore.FieldValue.serverTimestamp();
              let timedate = new Date().toDateString();
              var datum = Date.parse(timedate);
              let a = datum / 1000;
              datas.timestamp = a;
              datas.pnr = newpnr;
              this.itemsCollection.add(datas).then((response) => {
                responseData.push(response);
                resolve(responseData);


              }).catch((err) => {
                reject(err);
              });

            })
          }
          else {
            reject({ message: 'Could not generate pnr' });
          }

        });
    });
  }








  getById(id: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.itemsCollection.doc(id).snapshotChanges().subscribe(res => {
        const response: any = {};
        response['id'] = res.payload.id;
        response['data'] = res.payload.data();
        resolve(response);
      }, error => {
        reject(error);
      });
    });
  }

  delete(id: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.itemsCollection.doc(id).update({ isDeleted: true }).then(() => {
        resolve();
      }).catch((err) => {
        reject(err);
      });
    });
  }
}
