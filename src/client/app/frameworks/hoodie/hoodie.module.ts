// angular
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';

// libs
import { StoreModule } from '@ngrx/store';

// app
import { HoodieService } from './hoodie.service';

/**
 * Do not specify providers for modules that might be imported by a lazy loaded module.
 */

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
  ],
  providers: [
      HoodieService
  ],
  exports: [
  ]
})
export class HoodieModule {

  constructor(@Optional() @SkipSelf() parentModule: HoodieModule) {
    if (parentModule) {
      throw new Error('SampleModule already loaded; Import in root module only.');
    }
  }
}
