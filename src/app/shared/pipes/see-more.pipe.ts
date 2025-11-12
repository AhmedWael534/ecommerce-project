import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'seeMore',
  standalone: true
})
export class SeeMorePipe implements PipeTransform {
  transform(text: string, limit: number = 2): string {
    if (!text) return '';

    const words = text.split(' ');
    if (words.length <= limit) {
      return text;
    }

    return words.slice(0, limit).join(' ') + '...';
  }
}