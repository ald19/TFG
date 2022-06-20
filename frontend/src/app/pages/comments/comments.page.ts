import { AddCommentPage } from './../add-comment/add-comment.page';
import { ModalController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.page.html',
  styleUrls: ['./comments.page.scss'],
})
export class CommentsPage implements OnInit {

  constructor(public userService: UserService, private route: ActivatedRoute, private modalController: ModalController, private router: Router) {}

  ionViewWillEnter(){
		this.ngOnInit();
	}

  ngOnInit() {
    this.getComments();
    this.getComment();
  }

  getComments(){
    this.userService.getComments(this.route.snapshot.paramMap.get('id_recipe'))
      .subscribe(resp => {
        this.userService.comments = resp as any[];
      })
  }

  getComment(){
    this.userService.getComment(this.route.snapshot.paramMap.get('id_recipe'), '1')
      .subscribe(resp => {
        const result = resp as any[];
        if(result.length)
          this.userService.commented = true;
        else 
          this.userService.commented = false;
      });
  }

  removeComment(){
    this.userService.removeComment(this.route.snapshot.paramMap.get('id_recipe'), '1')
      .subscribe(() => {
        this.userService.commented = false;
        this.getComments();
      });
  }

  back(){
		this.router.navigate([`/tabs/recipe/${this.route.snapshot.paramMap.get('id_recipe')}`]);
	}

  async openModal(){
		const modal = await this.modalController.create({
			component: AddCommentPage,
      componentProps: {
        id_recipe: this.route.snapshot.paramMap.get('id_recipe')
      },
			cssClass: 'modal-comment',
		});
		return await modal.present();
	}
}
