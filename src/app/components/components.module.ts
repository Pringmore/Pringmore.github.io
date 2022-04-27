import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerWidgetComponent } from './customer-widget/customer-widget.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { PreChatFormComponent } from './pre-chat-form/pre-chat-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { ChatWidgetComponent } from './chat-widget/chat-widget.component';

@NgModule({
  declarations: [CustomerWidgetComponent, PreChatFormComponent, ChatWidgetComponent],
  imports: [
    CommonModule,
    MatExpansionModule,
    MatIconModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatDividerModule,
    MatButtonModule,
    MatSelectModule,
    MatRadioModule,
    MatCheckboxModule,
    MatDialogModule
  ],
  exports: [
    CustomerWidgetComponent, ChatWidgetComponent
  ]
})
export class ComponentsModule { }
