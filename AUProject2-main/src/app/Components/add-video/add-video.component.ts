import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import {
  AngularFireStorage,
  AngularFireStorageReference,
  AngularFireUploadTask,
} from '@angular/fire/storage';
import { ActivatedRoute, Router } from '@angular/router';

import {  Observable } from 'rxjs';
import {  finalize, map } from 'rxjs/operators';
import { AddVideoService } from 'src/app/add-video.service';

@Component({
  selector: 'app-add-video',
  templateUrl: './add-video.component.html',
  styleUrls: ['./add-video.component.css'],
})
export class AddVideoComponent implements OnInit {
  userForm: any;
  userId! : number;
  ref!: AngularFireStorageReference;
  task!: AngularFireUploadTask;
  uploadProgress!: Observable<number>;
  downloadURL!: Observable<string>;
  uploadState!: Observable<string>;
  status: String = 'Intializing Upload';
  edited : number = 0;

  newVideo: any;
  constructor(
    private formBuilder: FormBuilder,
    private afStorage: AngularFireStorage,
    private addVideoService : AddVideoService,
    private _Activatedroute: ActivatedRoute
  ) {
    this.userForm = this.formBuilder.group({
      vTitle: [''],
      vDesc: [''],
      vCat: [''],
    });
  }

  ngOnInit(): void {
    this._Activatedroute.paramMap.subscribe(params => { 
      this.userId = params.get('userId') as unknown as number;  
    });
  }

  saveVideo() {
    console.log('title', this.userForm.value.vTitle);
    this.newVideo = {
      videoTitle: this.userForm.value.vTitle,
      videoDesc: this.userForm.value.vDesc,
      cat: [
        {
          categoryName: this.userForm.value.vCat,
        },
      ],
      videoLink : this.downloadURL,
      isApproved : "No"
      //videoLink:
        //'https://firebasestorage.googleapis.com/v0/b/videodisplay483.appspot.com/o/8297pb0ued?alt=media&token=aefee8fb-8138-40cd-b014-097352f2ac4e',
    };
    console.log(this.newVideo);
    this.addVideoService.uploadVideos(this.userId,this.newVideo).subscribe((response)=>{
      console.log(response);
      console.log("Video added")
      this.edited=1;
    });;

  }

  upload(event: { target: { files: any[]; }; }) {
    console.log('upload called');
    const id = Math.random().toString(36).substring(2);
    this.updateStatusUploading();
    this.ref = this.afStorage.ref(id);
    console.log('After ref');
    this.task = this.ref.put(event.target.files[0]);
    console.log('After task');
    this.uploadProgress = this.task.percentageChanges() ;
    this.uploadState = this.task.snapshotChanges().pipe(
      map((s) => s!.state),
      finalize(() => {
        console.log('After finalize');
        this.updateStatus();
        status = 'upload complete';
        this.ref.getDownloadURL().subscribe((url) => {
          this.downloadURL = url;
          console.log('this property :', this.downloadURL);
        });
      })
    );
  }
  updateStatusUploading() {
    this.status = 'Uploading ....';
  }

  updateStatus() {
    this.status = 'Completed';
  } 
}
