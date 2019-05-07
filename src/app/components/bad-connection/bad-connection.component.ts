import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ConnectionService } from 'ng-connection-service';

@Component({
  selector: 'app-bad-connection',
  templateUrl: './bad-connection.component.html',
  styleUrls: ['./bad-connection.component.css']
})
export class BadConnectionComponent implements OnInit {

  currentUrl = "";
  public lottieConfig: Object;
  private anim: any;
  private animationSpeed: number = 1;
  constructor(private router: Router,
    private connectionService: ConnectionService, public route: ActivatedRoute, ) {
    this.currentUrl = this.route.snapshot.params["id"];

    this.lottieConfig = {
      path: 'assets/json/lottie.json',
      renderer: 'canvas',
      autoplay: true,
      loop: true
    };

  }

  ngOnInit() {
    this.connectionCheck();

  }

  connectionCheck() {


    this.connectionService.monitor().subscribe(isConnected => {
      isConnected = isConnected;

      if (isConnected) {
        status = "ONLINE";
        this.router.navigateByUrl(this.currentUrl);
      }
      else {

      }
    })

  }


  handleAnimation(anim: any) {
    this.anim = anim;
  }

  stop() {
    this.anim.stop();
  }

  play() {
    this.anim.play();
  }

  pause() {
    this.anim.pause();
  }

  setSpeed(speed: number) {
    this.animationSpeed = speed;
    this.anim.setSpeed(speed);
  }





}
