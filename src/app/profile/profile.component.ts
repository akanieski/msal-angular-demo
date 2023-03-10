import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MsalService } from '@azure/msal-angular';

const GRAPH_ENDPOINT = 'https://graph.microsoft.com/v1.0/me';

type ProfileType = {
  givenName?: string,
  surname?: string,
  userPrincipalName?: string,
  id?: string
};

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profile!: ProfileType;
  account: any;

  constructor(
    private http: HttpClient, private authService: MsalService
  ) { }

  ngOnInit() {
    this.getProfile();
    this.account = this.authService.instance.getAllAccounts().pop();
  }

  getProfile() {
    this.http.get(GRAPH_ENDPOINT)
      .subscribe(profile => {
        this.profile = profile;
      });
  }
}