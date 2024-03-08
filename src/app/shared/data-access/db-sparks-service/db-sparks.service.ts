import { Injectable } from '@angular/core';
import {
  CollectionReference,
  Firestore,
  addDoc,
  collection,
  doc,
  getDoc,
} from '@angular/fire/firestore';
import { SparkModel } from '../spark-model/spark-model';

@Injectable({
  providedIn: 'root',
})
export class DbSparksService {
  sparksCollection: CollectionReference<SparkModel>;
  constructor(private firestore: Firestore) {
    this.sparksCollection = collection(
      this.firestore,
      'sparks'
    ) as CollectionReference<SparkModel>;
  }

  async uploadSpark(spark: SparkModel) {
    const docRef = await addDoc(this.sparksCollection, spark);
    return docRef.id;
  }

  async getPublicSpark(sparkId: string) {
    const sparkDocRef = doc(this.sparksCollection, sparkId);
    const sparkSnap = await getDoc(sparkDocRef);

    return sparkSnap.exists()
      ? { ...sparkSnap.data(), id: sparkSnap.id }
      : null;
  }
}
