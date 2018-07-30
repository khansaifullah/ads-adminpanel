
import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

   transform(users: any, searchText: any): any {

    console.log ('in Transform searchText : ' + searchText );
    if (searchText == null) {
      return users;
    }

    return users.filter(function(user){
    //  console.log ('in filter ' + JSON.stringify(user));
      if (user.name) {
        return user.name.toLowerCase().indexOf(searchText.toLowerCase()) > -1;
      }else {
      return '';
      }
    });
  }
}
