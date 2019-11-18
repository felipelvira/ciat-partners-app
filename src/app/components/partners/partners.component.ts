import { Component, OnInit } from '@angular/core';
import { PartnersService } from '../../services/partners.service';
import { Partner } from '../../models/partner.model';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-partners',
  templateUrl: './partners.component.html',
  styleUrls: ['./partners.component.css']
})
export class PartnersComponent implements OnInit {
  partners: any;
  displayedColumns: string[] = [ 'headquarter', 'acronym', 'name', 'location','remove'];
  selection = new SelectionModel<Partner>(true, []);

  constructor(private partnersService: PartnersService) {

  }

  ngOnInit() {
    this.getAll();
  }

  getAll() {
    this.partnersService.getAll().subscribe(res => {
      this.partners = new MatTableDataSource<Partner>(res);
    });
  }

  deleteRow(index) {
    this.partnersService.delete(this.partners.filteredData[index].id).subscribe(res => {
      this.partners = new MatTableDataSource(<any>res);
    });
  }


}
