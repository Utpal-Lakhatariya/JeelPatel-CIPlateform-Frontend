import { Component, EventEmitter, OnInit, inject, Output, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { MenubarModule } from 'primeng/menubar';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { DropdownModule } from 'primeng/dropdown';
import { DialogModule } from 'primeng/dialog';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputTextModule } from 'primeng/inputtext';
import { CalendarModule } from 'primeng/calendar';
import { InputNumberModule } from 'primeng/inputnumber';
import { AllMissionService } from '../../components/Missions/Service/all-mission.service';
import { ICity, ICountry, ICreateMission, IMission, ISkill, ITheme } from '../../Interface/mission';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validator } from '@angular/forms';
import { Router } from '@angular/router';
import { MultiSelectModule } from 'primeng/multiselect';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { FileUpload, FileUploadModule } from 'primeng/fileupload'; interface Missions {
  name: string;
  code: string;
}


@Component({
  selector: 'app-header-mission',
  standalone: true,
  imports: [MenubarModule, ButtonModule, AvatarModule, FileUploadModule, AvatarGroupModule, InputGroupModule, InputGroupAddonModule, MultiSelectModule, DropdownModule, DialogModule, InputTextareaModule, InputNumberModule, InputTextModule, CalendarModule, ReactiveFormsModule],
  templateUrl: './header-mission.component.html',
  styleUrl: './header-mission.component.css'
})
export class HeaderMissionComponent implements OnInit {

  missionService = inject(AllMissionService)
  formbuilder = inject(FormBuilder)
  router = inject(Router)
  missions: Missions[] | undefined;
  formGroupSearch!: FormGroup;

  profileItems: MenuItem[] | undefined;
  items: MenuItem[] | undefined;
  // model
  visible: boolean = false;


  cityList: ICity[] = []
  countryList: ICountry[] = []
  themeList: ITheme[] = []
  skillsList: ISkill[] = []
  selectedCountry: number | 0 = 0;
  selectedCity: number | 0 = 0;
  selectedTheme: string | "" = "";
  selectedSkill: string | "" = "";
  missionList: IMission[] = []
  selectedFilters: { [key: string]: string[] } = {
    country: [],
    city: [],
    missionSkills: [],
    missionTheme: []
  };
  searchValue: string | "" = ""
  @ViewChild('fileUpload') fileUpload!: FileUpload;
  @ViewChild('imageUpload') imageUpload!: FileUpload;


  
  // take output
  @Output() dataEmitter = new EventEmitter<IMission[]>();

  @Output() filterEmitter = new EventEmitter<{ [key: string]: string[] }>();
  @Output() filteredCountry = new EventEmitter<ICountry[]>();
  @Output() filteredCity = new EventEmitter<ICity[]>();
  @Output() filteredTheme = new EventEmitter<ITheme[]>();
  @Output() filteredSkill = new EventEmitter<ISkill[]>();
  createMissionForm = this.formbuilder.group(
    {
      missionTitle: [""],
      missionDescription: [""],
      country: [null],
      city: [null],
      missionOrganisationName: [""],
      missionOrganisationDetail: [""],
      missionStartDate: [null],
      missionEndDate: [null],
      totalSeats: [0],
      missionRegistrationDeadline: [null],
      missionTheme: [""],
      missionSkills: [""],
      // image:[""],
      // video:[""]
    }
  )

  searchForm = this.formbuilder.group({
    searchValue: ['']
  })

  onSearch() {
    this.searchValue = this.searchForm.get('searchValue')?.value ?? "";
    console.log(this.searchValue);
    console.log(this.selectedCountry);
    console.log(this.selectedCity);
    console.log(this.selectedTheme);
    this.missionService.getMission(this.selectedCountry, this.selectedCity, this.selectedTheme, this.selectedSkill, 0, this.searchValue).subscribe(
      {
        next: (response) => {
          if (response.isSuccess) {
            this.missionList = response.data;
            console.log(this.missionList)
            this.sendData()
          }
        },
        error: (error) => {
          console.error('Error fetching missions:', error);
        }
      }
    );

  }
  //function to open model
  showDialog() {

    this.visible = true;
  }

  // take data in interface from form
  createMission() {
    const createMisson: ICreateMission = {
      missionTitle: this.createMissionForm.value.missionTitle!,
      missionDescription: this.createMissionForm.value.missionDescription!,
      country: this.createMissionForm.value.country!,
      city: this.createMissionForm.value.city!,
      missionEndDate: this.createMissionForm.value.missionEndDate!,
      missionStartDate: this.createMissionForm.value.missionStartDate!,
      missionRegistrationDeadline: this.createMissionForm.value.missionRegistrationDeadline!,
      missionSkills: this.createMissionForm.value.missionSkills!,
      missionTheme: this.createMissionForm.value.missionTheme ?? "",
      // image: this.createMissionForm.value.image!,
      // video: this.createMissionForm.value.video!,
      // missionAvailability: this.createMissionForm.value.missi!,
      totalSeats: this.createMissionForm.value.totalSeats!,
      missionOrganisationName: this.createMissionForm.value.missionOrganisationName!,
      missionOrganisationDetail: this.createMissionForm.value.missionOrganisationDetail!,
    };

    this.missionService.crateMissionPost(createMisson).subscribe({
      next: (response) => {
        if (response.isSuccess) {
          this.router.navigateByUrl("AllMission");
        }
      },

      error: (err) => console.error(err)
    })

  }

  // filtering of city from country
  OnCountryChange(): void {
    debugger;
    this.selectedCountry = this.createMissionForm.get('country')?.value ?? 0;

    if (this.selectedCountry) {
      this.missionService.getCitiesByCountry(this.selectedCountry).subscribe({
        next: (response) => {
          this.cityList = response.data;

          // this.city=null;
        },

        error: (err) => console.error(err)
      })
    }
    else {
      this.cityList = [];
      this.selectedCity = 0;
    }
    this.OnFilterChange();
  }

  // filtering data from country, city, theme and skill  
  OnFilterChange(): void {


    //this.selectedCountry=this.createMissionForm.get('country')?.value ?? 0;
    this.selectedCity = this.createMissionForm.get('city')?.value ?? 0;
    this.selectedTheme = this.createMissionForm.value.missionTheme ?? "";
    this.selectedSkill = this.createMissionForm.value.missionSkills ?? "";
    console.log("1----")
    console.log(this.selectedCity)
    console.log(this.selectedCountry)
    console.log(this.selectedTheme)
    console.log(this.selectedSkill)
    // if(this.selectedCity)
    //   {
    this.missionService.getMission(this.selectedCountry, this.selectedCity, this.selectedTheme, this.selectedSkill, 0, "").subscribe(
      {
        next: (response) => {
          if (response.isSuccess) {
            this.missionList = response.data;
            this.sendData()
          }
        },
        error: (error) => {
          console.error('Error fetching missions:', error);
        }


      }
    );
    // }


  }

  sendFilterTag() {

    var listOfCountry = this.countryList;
    var listOfCity = this.cityList;
    var listOfTheme = this.themeList;
    var listOfSkill = this.skillsList;
    // this.selectedCity=this.createMissionForm.get('city')?.value?? 0;
    // this.selectedTheme=this.createMissionForm.value.missionTheme ?? "";
    // this.selectedSkill=this.createMissionForm.value.missionSkills?? "";
    this.filteredCity.emit(listOfCity);
    this.filteredCountry.emit(listOfCountry);
    this.filteredTheme.emit(listOfTheme);
    this.filteredSkill.emit(listOfSkill);
    console.log("2----")
    console.log(this.selectedCity)
    console.log(this.selectedCountry)
    console.log(this.selectedTheme)
    console.log(this.selectedSkill)
  }
  // send data from header to all-mission component
  sendData() {
    const data = this.missionList;
    this.dataEmitter.emit(data);
  }

  // Fucntion to add filter tag
  addFilter(filterType: string): void {

    var filterValue = this.createMissionForm.get(filterType)?.value;
    console.log(filterValue);

    if (filterType == 'country') {
      if (this.selectedFilters['country'].length > 0) {
        this.selectedFilters['country'].splice(0);
      }

      var temp = this.countryList.filter(country => country.value === filterValue);
      filterValue = this.countryList.filter(country => country.value === filterValue)[0]['name'];

      console.log(temp);
    }
    else if (filterType == 'city') {
      filterValue = this.cityList.filter(city => city.value === filterValue)[0]['name'];
    }

    if (filterValue && !this.selectedFilters[filterType].includes(filterValue)) {
      this.selectedFilters[filterType].push(filterValue);
      this.createMissionForm.get(filterType)?.reset();

    }

    this.sendFilterTagData();
    this.sendFilterTag();

  }

  sendFilterTagData() {
    const data = this.selectedFilters;
    this.filterEmitter.emit(data);
  }


  //ngOnInit
  ngOnInit() {


    this.formGroupSearch = new FormGroup({
      search: new FormControl<string | null>(null)
    });


    this.profileItems = [
      {
        label: 'User Name',
        items: [{ label: 'Dashboard', icon: 'pi pi-fw pi-home' },
        { label: 'User Profile', icon: 'pi pi-fw pi-user' },
        { separator: true },
        { label: 'Logout', icon: 'pi pi-fw pi-sign-out' },]
      }
    ];


    this.missionService.crateMissionGet().subscribe(
      {
        next: (response) => {
          if (response.isSuccess) {
            this.countryList = response.data.country;
            this.themeList = response.data.theme;
            this.skillsList = response.data.skill;
          }
        },
        error: (error) => {
          console.error('Error fetching missions:', error);
        }
      }
    )



    this.missions = [

      { name: 'New York', code: 'NY' },
      { name: 'Rome', code: 'RM' },
      { name: 'London', code: 'LDN' },
      { name: 'Istanbul', code: 'IST' },
      { name: 'Paris', code: 'PRS' }
    ];



  }
  // file upload temp
  triggerImageUpload() {
    this.imageUpload.choose();
  }
}


