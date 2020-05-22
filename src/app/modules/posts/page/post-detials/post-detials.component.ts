import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { PostsService } from 'src/app/data/service/posts.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Posts } from 'src/app/data/models/posts';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-post-detials',
  templateUrl: './post-detials.component.html',
  styleUrls: ['./post-detials.component.scss']
})
export class PostDetialsComponent implements OnInit {
  post: Posts = new Posts();
  toggleBtn: boolean = true;
  unsubscribe$: Subject<void> = new Subject<void>();

  myForm: FormGroup;

  formData = {
    id: null,
    title: null,
    data: null
  }
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public postSer: PostsService,
    private spinner: NgxSpinnerService,
    private builder: FormBuilder,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) {
    this.buildForm();
    // get id from url 
    this.route.paramMap.subscribe(paramMap => {
      this.post.id = parseInt(paramMap.get('id'));
      this.myForm.controls['id'].setValue(this.post.id);
    });

    // console.log(this.myForm.value);
  }

  ngOnInit(): void {
    this.getPostById();
  }
  // build form group
  private buildForm(): void {
    this.myForm = this.builder.group({
      id: ["", Validators.compose([Validators.required])],
      title: ["", Validators.compose([Validators.required])],
      body: ["", Validators.compose([Validators.required])],
    });
  }
  // get form control error
  get f() {
    return this.myForm.controls;
  }
  // get post by id
  getPostById() {
    this.spinner.show();

    this.postSer.getPostById(this.post.id).pipe(takeUntil(this.unsubscribe$)).subscribe(
      response => {
        // asign response to object
        this.post = response;
        this.myForm.controls['title'].setValue(this.post.title);
        this.myForm.controls['body'].setValue(this.post.body);
        // to hise loading
        this.spinner.hide();
      },
      error => {
        this.openSnackBar('Server Is Down', 'error');
        // to hise loading
        this.spinner.hide();

      }
    );
  }
  // toggle between buttons
  toggle(actionEvent) {
    if (actionEvent == 'close') {
      this.myForm.controls['title'].setValue(this.post.title);
      this.myForm.controls['body'].setValue(this.post.body);
    }
    this.toggleBtn = !this.toggleBtn;
    // console.log(this.post);

  }
  // open delete dialog
  openDialogToDelete() {
    const dialogRef = this.dialog.open(DialogContentDelete);

    dialogRef.afterClosed().subscribe(result => {
      // console.log(`Dialog result: ${result}`);
      if (result) {
        this.deletePost();
      }
    });
  }

  // delete post
  deletePost() {
    this.spinner.show();
    this.postSer.deletePost(this.post.id).pipe(takeUntil(this.unsubscribe$)).subscribe(
      response => {
        this.openSnackBar('Post Deleted Successfully', 'success');
        this.router.navigate(['/posts'])
        // to hise loading
        this.spinner.hide();

      },
      error => {
        this.openSnackBar('Server Is Down', 'error');
        // to hise loading
        this.spinner.hide();

      }
    );
  }
  // open success message after update or delete
  openSnackBar(Message, className) {
    this._snackBar.open(Message, 'close', {
      duration: 2000,
      horizontalPosition: 'end',
      verticalPosition: 'top',

      panelClass: [className]
    });
  }

  // update post by id
  updatePostByID() {
    this.spinner.show();
    console.log(this.myForm.value);
    this.post.title = this.myForm.value.title;
    this.post.body = this.myForm.value.body;
    console.log(this.post);


    this.postSer.updatePost(this.post).pipe(takeUntil(this.unsubscribe$)).subscribe(
      response => {
        this.openSnackBar('Post Is Update Successfully', 'success');
        // asign response to object
        this.toggle('update');
        // to hise loading
        this.spinner.hide();
      },
      error => {
        this.openSnackBar('Server Is Down', 'error');
        // to hise loading
        this.spinner.hide();

      }
    );
  }
  ngOnDestroy(): void {
    // to unsibscribe sericve
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}


@Component({
  selector: 'dialog-content-delete',
  templateUrl: 'dialog-content-delete.html',
})
export class DialogContentDelete { }


