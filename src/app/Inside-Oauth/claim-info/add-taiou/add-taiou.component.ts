import { Component } from '@angular/core';

@Component({
  selector: 'app-add-taiou',
  templateUrl: './add-taiou.component.html',
  styleUrls: ['./add-taiou.component.css']
})
export class AddTaiouComponent  {

  public dt: Date = new Date();
  public minDate: Date = void 0;
  public events: any[];
  public tomorrow: Date;
  public afterTomorrow: Date;
  public dateDisabled: {date: Date, mode: string}[];
  private opened: boolean = false;

  public constructor() {
    (this.tomorrow = new Date()).setDate(this.tomorrow.getDate() + 1);
    (this.afterTomorrow = new Date()).setDate(this.tomorrow.getDate() + 2);
    (this.minDate = new Date()).setDate(this.minDate.getDate() - 1000);
    (this.dateDisabled = []);
    this.events = [
      {date: this.tomorrow, status: 'full'},
      {date: this.afterTomorrow, status: 'partially'}
    ];
  }

  public getDate(): number {
    return this.dt && this.dt.getTime() || new Date().getTime();
  }

  public open(): void {
    this.opened = !this.opened;
  }

}
