import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
    name: 'userSearch'
})
export class UserSearchPipe implements PipeTransform {
    constructor() { }
    transform(items: Array<any>, dataModel: string) {
        if (items && items.length) {
            return items.filter(item => {
                if (dataModel) {
                    if (dataModel.length !== 0) {
                        if (dataModel != item.fullName) {
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