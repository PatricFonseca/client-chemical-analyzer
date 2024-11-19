export enum CaseTypes {
  Low='low',
  Medium='medium',
  High="high"
}

export interface ChemicalWordDTO {
  name: string;
  risk: CaseTypes;
  description: string;
}

// export interface ChemicalAnalysisDTO {
//   words: ChemicalWordDTO[];
// }

export interface ProductImageResult {
  product: string;
  composition: string;
  // composition: string[];
  
}
