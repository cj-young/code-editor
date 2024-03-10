import { Injectable } from '@angular/core';
import {
  CollectionReference,
  Firestore,
  OrderByDirection,
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
} from '@angular/fire/firestore';
import { SparkModel } from '../spark-model/spark-model';

export type PublicSpark = SparkModel;

const SPARK_QUERY_LIMIT = 25;

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

  async getPublicSpark(sparkId: string): Promise<SparkModel | null> {
    const sparkDocRef = doc(this.sparksCollection, sparkId);
    const sparkSnap = await getDoc(sparkDocRef);

    return sparkSnap.exists()
      ? { ...sparkSnap.data(), id: sparkSnap.id }
      : null;
  }

  async getPublicSparks(
    sortBy: keyof SparkModel,
    sortOrder: OrderByDirection = 'asc',
    lastDoc?: SparkModel
  ) {
    let sparkQuery;
    if (lastDoc) {
      sparkQuery = query(
        this.sparksCollection,
        orderBy(sortBy, sortOrder),
        startAfter(lastDoc![sortBy]),
        limit(SPARK_QUERY_LIMIT)
      );
    } else {
      sparkQuery = query(
        this.sparksCollection,
        orderBy(sortBy, sortOrder),
        limit(SPARK_QUERY_LIMIT)
      );
    }

    const sparkSnaps = await getDocs(sparkQuery);
    const res: SparkModel[] = [];
    sparkSnaps.forEach((snap) => {
      res.push({
        ...snap.data(),
        id: snap.id,
      });
    });
    return res;
  }
}
