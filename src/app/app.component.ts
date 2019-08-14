import { Component } from '@angular/core';
import {NgForm} from '@angular/forms';
import { OutletService } from './outlet.service';
import { ToasterModule, ToasterService, ToasterConfig } from 'angular2-toaster';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'NearByOutletUI';
  outlet: string;
  address = '';

  public config1: ToasterConfig = new ToasterConfig({
    positionClass: 'toast-top-center',
    mouseoverTimerStop: true,
    timeout: { error: 1000, success: 500, warning: 1000 },
    newestOnTop: true,
    limit: 1
  });

  constructor(private outletService: OutletService, private toasterService: ToasterService ) { }
  outletByAddress(address) {
    console.log('hello');
    this.outletService.outletByAddress(address).subscribe((resp: any) => {
      console.log(resp);
      if (resp.status === 200) {
        this.outlet = resp.outlet;
        console.log(this.outlet);
        // console.log(resp.data);
      } else {
        const msg = 'Something went wrong. Please try again later.';
        this.toasterService.pop('error', '', msg);
      }
    }, (error) => {
      let msg = 'Something went wrong. Please try again later.';
      if (error._body) {
        const body = JSON.parse(error._body);
        msg = body.message;
      }

      this.toasterService.pop('warning', '', msg);
    }, () => {
    });
  }
}
