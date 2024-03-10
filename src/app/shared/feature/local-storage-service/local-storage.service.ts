import { Injectable } from '@angular/core';
import { Language } from '../../types/language';

export type PersonalSpark = {
  code: Record<Language, string>;
  name: string;
  id: string;
  imageUrl: string;
};

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  constructor() {}

  addSpark(
    code: Record<Language, string>,
    name: string,
    id: string,
    imageUrl: string
  ) {
    const newSpark: PersonalSpark = {
      code,
      name,
      id,
      imageUrl,
    };

    const sparkIdList = JSON.parse(
      localStorage.getItem('sparkIds') ?? '[]'
    ) as string[];
    if (!sparkIdList.includes(id)) {
      sparkIdList.push(id);
    }
    localStorage.setItem('sparkIds', JSON.stringify(sparkIdList));
    localStorage.setItem(`personalSparks.${id}`, JSON.stringify(newSpark));
  }

  getPersonalSparks() {
    const sparkIds = JSON.parse(localStorage.getItem('sparkIds') ?? '[]');
    const sparks = [];
    for (let sparkId of sparkIds) {
      try {
        const spark = localStorage.getItem(`personalSparks.${sparkId}`);
        if (!spark) continue;
        sparks.push(JSON.parse(spark));
      } catch (error) {
        console.error(error);
      }
    }

    return sparks;
  }

  getPersonalSpark(sparkId: string) {
    const spark = localStorage.getItem(`personalSparks.${sparkId}`);
    if (!spark) {
      return null;
    } else {
      return JSON.parse(spark);
    }
  }

  updateUnsavedEditor(code: Record<Language, string>) {
    localStorage.setItem('editorActiveSpark', JSON.stringify(code));
  }
}
