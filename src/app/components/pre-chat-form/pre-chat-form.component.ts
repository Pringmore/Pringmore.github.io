import { BooleanInput } from '@angular/cdk/coercion';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-pre-chat-form',
  templateUrl: './pre-chat-form.component.html',
  styleUrls: ['./pre-chat-form.component.scss']
})
export class PreChatFormComponent implements OnInit {
  form: FormGroup = new FormGroup({
    firstname: new FormControl(null, [Validators.required]),
    lastname: new FormControl(null, [Validators.required]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    termsAccepted: new FormControl(false, [Validators.requiredTrue])
  });

  get firstname(): FormControl {
    return this.form.get('firstname') as FormControl;
  }

  get lastname(): FormControl {
    return this.form.get('lastname') as FormControl;
  }

  get email(): FormControl {
    return this.form.get('email') as FormControl;
  }

  get termsAccepted(): FormControl {
    return this.form.get('termsAccepted') as FormControl;
  }

  get termsAcceptedValue(): BooleanInput{
    return this.form.get('termsAccepted')?.value as BooleanInput;
  }

  constructor(
    public dialogRef: MatDialogRef<PreChatFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data) {}

  ngOnInit(): void {}

  setPreChatForm(): void {
    this.dialogRef.close({data: this.form.value});
  }
}
