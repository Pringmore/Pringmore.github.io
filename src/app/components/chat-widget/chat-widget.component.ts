import { Component, OnInit } from '@angular/core';
import { createDetailsWidget, SectionComponentType } from "@livechat/agent-app-sdk";


@Component({
  selector: 'app-chat-widget',
  templateUrl: './chat-widget.component.html',
  styleUrls: ['./chat-widget.component.scss']
})
export class ChatWidgetComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    createDetailsWidget().then(widget => {
      // build your logic around the widget
      console.log('This msg comes from the Widget //// 01');

      

      widget.on("customer_profile", profile => {
        // read the new profile
        console.log('This msg comes from the Widget //// 02');
        console.log(profile);


        const data = widget.getCustomerProfile();

        console.log(data);
      });
    });
  }
}