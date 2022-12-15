interface CityObjectType {
  id: number;
  city: string;
}
export interface IRowData {
  id: number;
  cityObject: CityObjectType;
  accommodation: string;
}

export interface ICityAndCountryData {
  id: number;
  city: string;
  country: string;
}

export interface IAccData {
  id: number;
  accommodation: string;
}
