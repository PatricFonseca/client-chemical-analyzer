export interface ChemicalWordDTO {
  name: string;
  status: string;
}

export interface ChemicalAnalysisDTO {
  words: ChemicalWordDTO[];
}

export interface ProductImageResult {
  product: string;
  composition: string;
  // composition: string[];
  
}
