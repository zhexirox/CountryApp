import { Component, OnInit } from '@angular/core';
import { Country } from '../../interfaces/country';
import { CountriesService } from '../../services/countries.service';
import { Region } from '../../interfaces/region.type';



@Component({
  selector: 'countries-by-region-page',
  templateUrl: './by-region-page.component.html',
  styles: ``
})
export class ByRegionPageComponent implements OnInit{

  public countries: Country[] = [];
  public isLoading: boolean = false;
  public regions: Region[] = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];
  public selectedRegion?: Region;

  constructor(private countriesService: CountriesService) {}

  ngOnInit(): void {
    this.countries = this.countriesService.cacheStorage.byRegion.countries;
    this.selectedRegion = this.countriesService.cacheStorage.byRegion.region;
  }


  searchByRegion( region: Region ):void {

    this.isLoading = true;
    this.selectedRegion = region;

    this.countriesService.searchRegion(region)
      .subscribe( countries => {
        this.countries = countries;
        this.isLoading = false;
      });
  }

}
