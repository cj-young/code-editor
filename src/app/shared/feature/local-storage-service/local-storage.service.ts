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
      localStorage.getItem('personalSparkIds') ?? '[]'
    ) as string[];
    const personalSparks = JSON.parse(
      localStorage.getItem('personalSparks') ?? '[]'
    ) as PersonalSpark[];
    sparkIdList.push(id);
    personalSparks.push(newSpark);
    localStorage.setItem('sparkIds', JSON.stringify(sparkIdList));
    localStorage.setItem('personalSparks', JSON.stringify(personalSparks));
  }
}
