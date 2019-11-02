import { Activity, CreateactivityService } from 'src/app/services/createactivity.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController, LoadingController } from '@ionic/angular';
import { formatDate } from '@angular/common';
@Component({
  selector: 'app-createactivity',
  templateUrl: './createactivity.page.html',
  styleUrls: ['./createactivity.page.scss'],
})
export class CreateactivityPage implements OnInit {

  create: Activity = {
    namep:'',
    type_place:'',
    type_j:'',
    vistor_Type:'',
    Date:'yy/mm/dd',
    Time_start:'hh/mm',
    Time_end:'hh/mm',
    cost:'',
    number_vist:0

    

  };
  activityid = null;

  constructor(private route: ActivatedRoute, private nav: NavController, private createactivityService: CreateactivityService, private loadingController: LoadingController) { }

  ngOnInit() {
    this.activityid = this.route.snapshot.params['id'];
    if (this.activityid)  {
      this.loadTodo();
    }

  }
async loadTodo() {
    const loading = await this.loadingController.create({
      message: 'Loading Todo..'
    });
    await loading.present();
 
    this.createactivityService.getactivity(this.activityid).subscribe(res => {
      loading.dismiss();
      this.create = res;
    });
  }
  async createactivity() {
 
    const loading = await this.loadingController.create({
      message: 'Saving Todo..'
    });
    await loading.present();
 
    if (this.activityid) {
      this.createactivityService.updateactivity(this.create, this.activityid).then(() => {
        loading.dismiss();
        this.nav.navigateBack('home');
      });
    } else {
      this.createactivityService.addactivity(this.create).then(() => {
        loading.dismiss();
        this.nav.navigateBack('home');
      });
    }
  }
}
