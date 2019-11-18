import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Partner } from '../../models/partner.model';
import { PartnersService } from '../../services/partners.service';

import {MatSnackBar} from '@angular/material/snack-bar';



@Component({
  selector: 'app-add-partners',
  templateUrl: './add-partners.component.html',
  styleUrls: ['./add-partners.component.css']
})

export class AddPartnertsComponent implements OnInit {
  addPartnerForm: FormGroup;
  typesArray: any = ['Academic Institutions', 'Donor', 'Non-Governamental Organization', 'Research Institution'];
  headquartersArray: Partner[];
  countriesArray: any[];
  constructor(private fb: FormBuilder, private partnersService: PartnersService, private _snackBar: MatSnackBar) {
    this.createForm();
    this.getAllPartners(partnersService);
    this.getCountries(partnersService);

  }

  ngOnInit() {
  }

  getAllPartners(partnersService) {
    partnersService.getAll().subscribe(res => {
      this.headquartersArray = res;
    });
  }
  getCountries(partnersService) {
    partnersService.getCountries().subscribe(res => {
      this.countriesArray = res;
    });
  }

  validateHeadquaters() {
    return (this.addPartnerForm.get('institutionSelect').value === 'true') ? true : false
  }

  createForm() {
    const reg = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';

    this.addPartnerForm = this.fb.group({
      name: ['', [Validators.required]],
      acronym: [''],
      institutionSelect: [''],
      headquarter: [''],
      type: ['', [Validators.required]],
      country: ['', [Validators.required]],
      city: ['', [Validators.required]],
      url: ['', [Validators.pattern(reg)]],
    });
  }

  submitForm() {
    // console.log(this.addPartnerForm.value)
    let newPartner = {
      id: null,
      name: this.addPartnerForm.value.name,
      acronym: this.addPartnerForm.value.acronym,
      type: this.addPartnerForm.value.type,
      country: this.addPartnerForm.value.country,
      city: this.addPartnerForm.value.city,
      headquarter: this.addPartnerForm.value.headquarter ,
      url: this.addPartnerForm.value.url,
      is_branch: this.addPartnerForm.value.institutionSelect === 'true' ? true : false,
    }
    // console.log('newPartner',newPartner, this.addPartnerForm.value)
    this.partnersService.create(newPartner).subscribe(
      (jsonData) => {
        this.openDialog({ type: 'Success', message: `Partner ${newPartner.name} sucessfully created.` })
      },
      (err) => {
        this.openDialog({ type: 'Error', message: err.error })
      }
    );
  }

  openDialog(data): void {
    this._snackBar.open(data.message, data.type, {
      duration: 5000,
    });
  }

}

