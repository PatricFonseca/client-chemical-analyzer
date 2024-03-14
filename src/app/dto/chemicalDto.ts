export interface ChemicalWordDTO {
  name: string;
  status: string;
}

export interface ChemicalAnalysisDTO {
  words: ChemicalWordDTO[];
}
