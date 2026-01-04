export interface Medication {
  name: string;
  desc: string;
  risk: string;
  type: string;
  icon: string;
}

export interface MedicationPosology {
  start: string;
  maintenance: string;
  max: string;
  adjustments: string;
}

export interface MedicationDetails {
  indication: string;
  posology: MedicationPosology;
  maternal: string;
  fetal: string;
  contra: string[];
  evidence: string[];
}

export type MedicationDetailsDB = Record<string, MedicationDetails>;
