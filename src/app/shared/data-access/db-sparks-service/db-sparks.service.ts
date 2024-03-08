import { Injectable } from '@angular/core';
import {
  CollectionReference,
  Firestore,
  addDoc,
  collection,
} from '@angular/fire/firestore';
import { SparkModel } from '../spark-model/spark-model';

@Injectable({
  providedIn: 'root',
})
export class DbSparksService {
  sparksCollection: CollectionReference;
  constructor(private firestore: Firestore) {
    this.sparksCollection = collection(this.firestore, 'sparks');
  }

  async uploadSpark(spark: SparkModel) {
    const docRef = await addDoc(this.sparksCollection, spark);
    return docRef;
  }
}
