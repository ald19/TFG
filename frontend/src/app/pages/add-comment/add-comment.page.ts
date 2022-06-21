import { AuthService } from 'src/app/services/auth.service';
import { NgForm } from '@angular/forms';
import { UserService } from './../../services/user.service';
import { ModalController, NavParams } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-comment',
  templateUrl: './add-comment.page.html',
  styleUrls: ['./add-comment.page.scss'],
})
export class AddCommentPage implements OnInit {

  newComment: any;

  constructor(public modalController: ModalController, public userService: UserService, private navParams: NavParams, private authService: AuthService) {
    this.newComment = {
      comentario: null,
      valoracion: 0
    }
  }

  ngOnInit() {
  }

  getComments(){
    this.userService.getComments(this.navParams.get('id_recipe'))
      .subscribe(resp => {
        this.userService.comments = resp as any[];
      });
  }

  addComment(form: NgForm){
    this.userService.addComment(this.navParams.get('id_recipe'), this.authService.getLoggedUser(), form.value)
      .subscribe(() => {
        this.userService.commented = true;
        this.getComments();
        form.reset();
		    this.closeModal();
      });
  }

  closeModal(){
    this.modalController.dismiss();
  }

}
