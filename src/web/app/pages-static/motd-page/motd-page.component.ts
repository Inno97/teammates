import { Component, OnInit } from '@angular/core';
import { MotdService } from 'src/web/services/motd.service';
import { PrevMotd } from 'src/web/types/api-output';

/**
 * Motd page.
 */
@Component({
  selector: 'tm-motd-page',
  templateUrl: './motd-page.component.html',
  styleUrls: ['./motd-page.component.scss'],
})
export class MotdPageComponent implements OnInit {

  constructor(private motdService: MotdService) {}

  motd: string = "";

  isMotdRead: boolean = true;

  setMotdVisibility() {
    document.getElementById('motd')!.style.visibility='hidden';
    document.getElementById('motd')!.style.height='0px';
  }

  ngOnInit(): void {
    
    this.motdService.getPrevMotd().subscribe((res: PrevMotd) => {
      for (let i = 0; i < res.dateList.length; i++) {
        this.motd = this.motd.concat("<p>" + res.motdList[i] + "</p>" + "<p>" + res.dateList[i] + "</p>");
      }
      console.log(this.motd);
    });
    this.setMotdVisibility();
  }

}
