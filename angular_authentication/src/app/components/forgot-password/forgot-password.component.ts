import { Component } from '@angular/core';
import {faLock} from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {
  faLock=faLock;
}
