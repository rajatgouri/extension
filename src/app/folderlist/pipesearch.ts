import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
    name: 'search'
})
export class SearchPipe implements PipeTransform {
    constructor() { }
    transform(items: Array<any>, dataModel: string) {
        if (items && items.length) {
            return items.filter(item => {
                if (dataModel) {
                    if (dataModel.length !== 0) {
                        if (dataModel != item) {
                            return false;
                        }
                    }
                }
                return true;
            })
        }
        else {
            return items;
        }
    }
}