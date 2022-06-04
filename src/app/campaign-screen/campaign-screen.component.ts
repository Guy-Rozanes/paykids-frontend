import { Component, ViewChild, ElementRef, OnInit, Inject } from "@angular/core";
import { MatDialogRef, MatSnackBar, MAT_DIALOG_DATA } from "@angular/material";
import { LoginService } from "../login.service";

@Component({
  selector: "campaign-screen",
  templateUrl: "./campaign-screen.component.html",
  styleUrls: ["./campaign-screen.component.css"]
})
export class CampaignScreenComponent implements OnInit {
  skipped = false;
  constructor(private dialogRef: MatDialogRef<CampaignScreenComponent>,
    private _snackBar: MatSnackBar,
    private service: LoginService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {

  }
  videoToShow = {
    'Allowance': '../../assets/Allowance.mp4',
    'Finance Words': '../../assets/Finance words.mp4',
    'Family Savings': '../../assets/Family Savings.mp4',
    'Income and Outcome': '../../assets/Income and Outcome.mp4',
    'Supermarket Shopping': '../../assets/Supermarket Shopping.mp4'
  }
  ngOnInit(): void {
    this.listener();
  }
  listener() {
    const $video = document.querySelector("video");

    const onTimeUpdate = event => {
      if (checkSkipped(event.target.currentTime)) {
        this.skipped = true;
      }
    }

    let prevTime = 0;
    const checkSkipped = currentTime => {
      const skip = [];
      // only record when user skip more than 2 seconds
      const skipThreshold = 2;

      // user skipped part of the video
      if (currentTime - prevTime > skipThreshold) {
        skip.push({
          periodSkipped: currentTime - prevTime,
          startAt: prevTime,
          endAt: currentTime,
        });
        prevTime = currentTime;
        return skip;
      }

      prevTime = currentTime;
      return false;
    }

    $video.addEventListener("play", e => {});
    $video.addEventListener("playing", e => {});

    $video.addEventListener("timeupdate", onTimeUpdate);

    $video.addEventListener("ended", e => {
      if (this.skipped) {
        this.service.updateSavingStatus(this.data.saving[1]).subscribe(data =>
          this._snackBar.open(data['message'], undefined, {
            panelClass: ['snackBar'],
          }
          )
        );
        const newAmount = this.data.amount + parseInt(this.data.saving[3])
        this.service.updateUserAmount(this.data.user[0], newAmount).subscribe(data => {});
      }
      else{
        this._snackBar.open('Do not skip this video!!')
      }
    }
    );
    $video.addEventListener("pause", e => {});
  }
}
