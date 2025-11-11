import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Observable, of } from 'rxjs';
import { BaseComponent } from './common/base.component';
import { Footer } from './component/Common/footer/footer.component';
import { Header } from './component/Common/header/header.component';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Footer, Header],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent extends BaseComponent {
  // isShowSpinner$: Observable<boolean>;
  title = 'kiot-qr-cpanel';
  constructor() {
    super();
    // this.isShowSpinner$ =of();
  }
}
