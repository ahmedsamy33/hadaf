import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { PostsService } from 'src/app/data/service/posts.service';
import { Subject } from 'rxjs';
import { Posts } from 'src/app/data/models/posts';
import { takeUntil } from 'rxjs/operators';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-posts-lists',
  templateUrl: './posts-lists.component.html',
  styleUrls: ['./posts-lists.component.scss']
})
export class PostsListsComponent implements OnInit, OnDestroy {
  // header of table
  displayedColumns: string[] = ['id', 'title', 'body'];
  // page size limit in table
  pageSize = 10;
  // pagination element
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  unsubscribe$: Subject<void> = new Subject<void>();
  // object from posts class
  dataPost: Posts[] = [];

  dataSource;

  constructor(public postSer: PostsService, private spinner: NgxSpinnerService,
    private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.getAllPosts();
  }

  // get all posts from place holder
  getAllPosts() {
    // to show loading
    this.spinner.show();

    this.postSer.getAllPosts().pipe(takeUntil(this.unsubscribe$)).subscribe(
      response => {
        // asign response to object
        this.dataPost = response;
        // assign array to table
        this.dataSource = new MatTableDataSource<Posts>(this.dataPost);
        // assign total page to pager
        this.dataSource.paginator = this.paginator;
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

  // open toast message
  // open success message after update or delete
  openSnackBar(Message, className) {
    this._snackBar.open(Message, 'close', {
      duration: 2000,
      horizontalPosition: 'end',
      verticalPosition: 'top',

      panelClass: [className]
    });
  }
  ngOnDestroy(): void {
    // to unsibscribe sericve
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
