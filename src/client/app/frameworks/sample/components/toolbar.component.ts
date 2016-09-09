// app
import { BaseComponent, LogService } from '../../core/index';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Rx';
import { HoodieService } from '../../hoodie/hoodie.service';

@BaseComponent({
  moduleId: module.id,
  selector: 'sd-toolbar',
  templateUrl: 'toolbar.component.html',
  styleUrls: ['toolbar.component.css']
})
export class ToolbarComponent {

  private connected: Observable<Boolean>;

  constructor(private log: LogService, private store: Store<any>, private hoodie: HoodieService) {
    this.connected = this.store.select('hoodie').map((hoodie:any) => hoodie.connected);
  }

  public openLanguages(e: any): void {
    this.log.debug('openLanguages');
  }
}
