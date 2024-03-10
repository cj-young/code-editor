import { Injectable } from '@angular/core';
import {
  CollectionReference,
  DocumentData,
  Firestore,
  OrderByDirection,
  QueryDocumentSnapshot,
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  increment,
  limit,
  orderBy,
  query,
  startAfter,
  updateDoc,
  where,
} from '@angular/fire/firestore';
import { SparkModel } from '../spark-model/spark-model';

export type PublicSpark = SparkModel;

export const SPARK_QUERY_LIMIT = 25;

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
    lastDoc?: QueryDocumentSnapshot<SparkModel, DocumentData>
  ) {
    let sparkQuery;
    if (lastDoc) {
      sparkQuery = query(
        this.sparksCollection,
        orderBy(sortBy, sortOrder),
        startAfter(lastDoc),
        limit(SPARK_QUERY_LIMIT),
        where('isInGallery', '==', true)
      );
    } else {
      sparkQuery = query(
        this.sparksCollection,
        orderBy(sortBy, sortOrder),
        limit(SPARK_QUERY_LIMIT),
        where('isInGallery', '==', true)
      );
    }

    const sparkSnaps = await getDocs(sparkQuery);
    const res: QueryDocumentSnapshot<SparkModel, DocumentData>[] = [];
    sparkSnaps.forEach((snap) => {
      res.push(snap);
    });
    return res;
  }

  async incrementSparkView(sparkId: string) {
    try {
      const sparkDocRef = doc(this.sparksCollection, sparkId);
      await updateDoc(sparkDocRef, {
        views: increment(1),
      });
    } catch (error) {
      console.error(error);
    }
  }
}
