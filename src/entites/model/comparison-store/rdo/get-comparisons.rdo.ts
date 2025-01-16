export interface IPropertyDetails {
  id: number;
  name: string;
  image: string[];
  square: number;
  price: number;
  number: number;
  contact: string;
  agent: boolean;
  owner: boolean;
  type: string;
  description: string;
  location: string;
}

export interface IGetPropertiesRDO {
  id: number;
  comparisonId: number;
  propertyId: number;
  property: IPropertyDetails; // Add property field
}

export interface IGetComparisonRDO {
  id?: number;
  userId: number;
  properties: IGetPropertiesRDO[];
}
