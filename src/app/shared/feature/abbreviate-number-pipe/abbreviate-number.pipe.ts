import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'abbreviateNumber',
  standalone: true,
})
export class AbbreviateNumberPipe implements PipeTransform {
  transform(value: number): string {
    if (isNaN(value)) return value.toString();

    const suffixes = ['', 'K', 'M', 'B', 'T', 'Qa', 'Qi', 'Sx', 'Sp'];

    if (value < 1000) {
      return value + suffixes[0];
    }

    for (let i = 1; i < suffixes.length; i++) {
      const shiftedVal = value / 1000 ** i;
      if (shiftedVal >= 1000) {
        continue;
      }

      if (shiftedVal < 10) {
        return shiftedVal.toFixed(1) + suffixes[i];
      } else {
        return shiftedVal.toFixed(0) + suffixes[i];
      }
    }

    const shiftedVal = value / 1000 ** (suffixes.length - 1);
    return shiftedVal.toFixed(0) + suffixes[suffixes.length - 1];
  }
}
