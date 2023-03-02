import { Component, ViewEncapsulation } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { getErrors, validateWhitespaces } from "src/app/utilities/functions";

@Component({
  selector: 'contact-component',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ContactComponent {
  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
  ) {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required, validateWhitespaces]],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', [Validators.required, validateWhitespaces]],
      message: ['', [Validators.required]],
    });
  }

  getErrors(controlName: string) {
    let control = this.form.get(controlName);
    return control ? getErrors(control) : null;
  }
}