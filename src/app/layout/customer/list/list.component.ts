import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// import { RegisterationService, CompanyItem } from '../registeration.service';
import { MessageService } from 'primeng/api';
import { NgxSpinnerService } from 'ngx-spinner';
// import { PagerService } from '../../../services/pager/pager.service';
// import { LoginService } from '../../../core/services';
import { ViewChild } from '@angular/core';
import { MatSort, MatTableDataSource, MatPaginator } from '@angular/material';
import { FormControl } from '@angular/forms';
import { CustomerService, CompanyItem } from '../customer.service';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },

];

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  displayedColumns: string[] = ['regno', 'firstname', 'lastname', 'gender', 'age', 'phone', 'city', 'customColumn'];
  // dataSource = new MatTableDataSource(ELEMENT_DATA);
  registerationlist: [];
  registeration = new MatTableDataSource(this.registerationlist)
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  fdate = new FormControl(new Date());
  tdate = new FormControl(new Date());

  minDate = new Date(2000, 0, 1);
  maxDate = new Date(2020, 0, 1);
  display: boolean;
  rows = [];
  viewData: CompanyItem;
  allItems: any[];
  pager: any = {};
  showtableheader = false;

  constructor(
    private router: Router,
    private companyService: CustomerService,
    private _messageService: MessageService,
    private spinner: NgxSpinnerService,
    // private _pagerService: PagerService,
    // private _loginService: LoginService,
  ) {

    this.getData(1);

    this.display = false;
    this.viewData = {
      companyName: '',
      insertedAt: new Date,
      isDeleted: false,
    };

  }

  ngOnInit() {
    console.log('data', this.fdate.value, this.tdate.value)
    console.log('reg1', this.registerationlist)

    // this.getData(1);
    // this.dataSource = new MatTableDataSource(ELEMENT_DATA);
    // this.dataSource.sort = this.sort;
    // this.dataSource.paginator = this.paginator;

    // this.registeration = new MatTableDataSource(this.registerationlist)
    // this.registeration.sort = this.sort;
    // this.registeration.paginator = this.paginator;
  }


  onreglink(e) {
    console.log('element', e)
    alert(e.data.pnr)
  }
  getData(page: number) {
    this.spinner.show();
    this.companyService.getData(this.fdate.value, this.tdate.value).then(resp => {
      console.log('ef', resp);
      this.registerationlist = resp;
      console.log('reg2', this.registerationlist)
      if (this.registerationlist.length > 0) {
        this.showtableheader = true;
      } else {
        this.showtableheader = false;
      }
      this.registeration = new MatTableDataSource(this.registerationlist)
      this.registeration.sort = this.sort;
      this.registeration.paginator = this.paginator;

      // s



      // this._loginService.filterCompany(resp, 'id').then(filtered => {
      //   this.allItems = filtered;
      //   // this.pager = this._pagerService.getPager(this.allItems.length, page);
      //   this.rows = this.allItems.slice(this.pager.startIndex, this.pager.endIndex + 1);
      this.spinner.hide();
      // });
    }).catch(err => {
      console.log(err);
      this.spinner.hide();
    });
  }

  view(id) {
    this.companyService.getById(id).then(resp => {
      this.viewData = resp.data;
      this.display = true;
    }).catch(() => {
      this._messageService.add({ severity: 'error', summary: 'error', detail: 'Oops! Something went wrong. Please try again' });
    });
  }

  onedit(data) {
    console.log('edititem ', data)
    console.log('router', this.router)
    this.router.navigate(['layout/registeration/edit/' + data.id]);

  }
  ondelete(item) {
    console.log('ondelete ', item)
  }
  goToEdit(data) {
    this.router.navigate(['app/registeration/edit/' + data.id]);
  }

  onConfirm(id) {
    this._messageService.clear('c');
    this.companyService.delete(id).then(() => {
      this._messageService.add({ severity: 'success', summary: 'Success', detail: 'Data deleted successfully' });
      // this.getData(1);
    }).catch(() => {
      this._messageService.add({ severity: 'error', summary: 'error', detail: 'Oops! Something went wrong. Please try again' });
    });
  }

  onReject() { this._messageService.clear('c'); }

  delete(id) {
    this._messageService.add({
      key: 'c', sticky: true, severity: 'warn', summary: 'Are you sure?', detail: 'Confirm to proceed',
      id: id
    });
  }

  onsearch() {
    console.log('data', this.fdate.value, this.tdate.value)
    this.getData(1);

  }

}
