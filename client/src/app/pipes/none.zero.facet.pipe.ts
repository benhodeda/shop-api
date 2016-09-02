import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'noneZeroFacet'
})
export class NoneZeroFacetPipe implements PipeTransform {


  transform(items: Array<any>) {

    if (!items || !items.length) return items;

    return items.filter(i => !!i.doc_count);
  }
}
