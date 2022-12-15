import { IRowData, ICityAndCountryData } from "./types";

export const DefaultRowData: IRowData[] = [
  { id: 1, cityObject: { id: 1, city: "Paris" }, accommodation: "Hotel" },
  { id: 2, cityObject: { id: 2, city: "London" }, accommodation: "Hotel" },
  { id: 3, cityObject: { id: 3, city: "London" }, accommodation: "Hotel" },
  { id: 4, cityObject: { id: 4, city: "Berlin" }, accommodation: "Hotel" },
  { id: 5, cityObject: { id: 5, city: "Amsterdam" }, accommodation: "Hotel" },
];
export const SearchOption = [
  "Paris",
  "London",
  "Berlin",
  "Madrid",
  "Rome",
  "Copenhagen",
  "Brussels",
  "Amsterdam",
];

export const CityAndCountryData: ICityAndCountryData[] = [
  { id: 1, city: "Paris", country: "France" },
  { id: 2, city: "London", country: "United Kingdom" },
  { id: 3, city: "Berlin", country: "Germany" },
  { id: 4, city: "Madrid", country: "Spain" },
  { id: 5, city: "Rome", country: "Italy" },
  { id: 6, city: "Copenhagen", country: "Denmark" },
  { id: 7, city: "Brussels", country: "Belgium" },
  { id: 8, city: "Amsterdam", country: "The Netherlands" },
];

export const AccData = [
  { id: 1, accommodation: "Hotel" },
  { id: 2, accommodation: "Rental" },
  { id: 3, accommodation: "Friends" },
];
