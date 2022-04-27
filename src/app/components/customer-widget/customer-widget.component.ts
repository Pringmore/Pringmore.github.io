import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { init } from '@livechat/customer-sdk';
import { PreChatFormComponent } from '../pre-chat-form/pre-chat-form.component';

@Component({
  selector: 'app-customer-widget',
  templateUrl: './customer-widget.component.html',
  styleUrls: ['./customer-widget.component.scss']
})
export class CustomerWidgetComponent implements OnInit {
  allowChat = false;
  agentIsOnline = false;
  agentProfilePhoto = null;
  agentName = null;
  customerSDK;

  constructor(
    public dialog: MatDialog
  ) {
    this.customerSDK = init({
      licenseId: 14016456,
      clientId: '1a91c60c41a16e5c4d71cbc5a2fc8bc0'
    });
  }

  ngOnInit(): void {
    //console.log(this.customerSDK);

    this.customerSDK.on('connected', payload => {
      const { customer, availability, greeting } = payload;
      
      this.agentIsOnline = payload.availability === "online" ? true : false;
      this.agentProfilePhoto = payload.availability === "online" ? payload?.greeting?.agent?.avatar : null;
      this.agentName = payload.availability === "online" ? payload?.greeting?.agent?.name : null;

      console.log('connected', { customer, availability, greeting });
      
        
      //this.getChatData();
      //this.updateQueuingState();

      //this.startNewChat();
      //this.queueHasBeenUpdate();
    })

    this.customerSDK.on('new_event', newEvent => {
      console.log(newEvent)
    })
  }

  fetchPrechat(chatId: string): void {
    this.customerSDK
      .getForm({
        groupId: 0,
        type: 'prechat',
      })
      .then(response => {
        if (response.enabled) {
          console.log(response.form)
          this.sendForm(response.form, chatId);
        }
      })
      .catch(error => {
        console.log(error)
      })
  }

  fillForm(preForm: any) {
    // form -> filled Form
    preForm.type = 'filled_form';
    preForm.form_id = preForm.id;

    // fields  -> filled Fields
    preForm.fields[1].answer = 'Soprano';
    preForm.fields[2].answer = 'Rosso';

    return preForm;
  };

  sendForm(preForm: any, chatId: string): void {
    const filledForm = this.fillForm(preForm);    
    const event = {
      type: 'filled_form',
      form: filledForm
    }
    
    this.customerSDK
      .sendEvent({
        chatId: chatId,
        event,
      })
      .then(event => {
        console.log(event)
      })
      .catch(error => {
        console.log(error)
      })

  }

  listChats(): void {
    this.customerSDK.listChats()
      .then(({ chatsSummary, totalChats }) => {
        console.log(chatsSummary);
        console.log(totalChats);

        for (const chatEntity of chatsSummary) {
          this.getChat(chatEntity.id);
        }

        const chatId = chatsSummary[0].id;

        this.fetchPrechat(chatId);        
      })
      .catch(error => {
        console.log(error)
      })
  }

  getChatData(): void {
    this.customerSDK.on('incoming_chat', payload => {
      const { chat } = payload;
      const { id, access, users, properties, thread } = chat;

      console.log('incoming_chat', { id, access, users, properties, thread });

      this.getChat(payload.chat.id);
      this.getChatHistory(payload.chat.id);
    })
  }

  getChat(chatId: string): void {
    console.log(chatId);

    this.customerSDK
      .getChat({
        chatId: chatId,
      })
      .then(chat => {
        const { id, access, users, properties, thread } = chat
        console.log({ id, access, users, properties, thread })
      })
      .catch(error => {
        console.log(error)
      })
  }

  getChatHistory(chatId: string): void {
    let wholeChatHistoryLoaded = false

    const history = this.customerSDK.getChatHistory({ chatId: 'OU0V0P0OWT' })

    history.next().then(result => {
      if (result.done) {
        wholeChatHistoryLoaded = true
      }

      const { threads } = result.value

      const events = threads
        .map(thread => thread.events || [])
        .reduce((acc, current) => acc.concat(current), [])

      console.log(events)
    })
  }

  updateQueuingState(): void {
    this.customerSDK.on('queue_position_updated', payload => {
      console.log(payload.chatId)
      console.log(payload.threadId)
      console.log(payload.queue.position)
      console.log(payload.queue.waitTime)
    })
  }

  startNewChat(): void {
    this.customerSDK
      .startChat({
        chat: {
          thread: {
            events: [],
          },
        },
      })
      .then(chat => {
        console.log(chat)
      })
      .catch(error => {
        console.log(error)
      })
  }

  queueHasBeenUpdate(): void {
    this.customerSDK.on('queue_position_updated', payload => {
      console.log(payload.chatId)
      console.log(payload.threadId)
      console.log(payload.queue.position)
      console.log(payload.queue.waitTime)
    })
  }

  openPreChat(): void {
    const dialogRef = this.dialog.open(PreChatFormComponent, {
      height: '100vh',
      minHeight: '600px',
      maxHeight: '1000px',
      width: '80vw',
      minWidth: '600px',
      maxWidth: '800px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log(result);
        this.allowChat = true;

        this.listChats();
      }
    });
  }

  informAgent(preChat: object): void {
    //this.customerSDK.
  }

  openChat(): void {
    console.log('*********  INFORM DASHBOARD  ****');
  }
}
