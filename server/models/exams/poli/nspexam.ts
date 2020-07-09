const MSBaseSubjects = {
  ALG: { name: "Algebra", quantity: 20 },
  GyT: { name: "Geometria y Trigonometria", quantity: 15 },
  RM: { name: "Razonamiento Matematico", quantity: 15 },
  FIS: { name: "Fisica", quantity: 15 },
  QUIM: { name: "Quimica", quantity: 15 },
  BIO: { name: "Biologia", quantity: 10 },
  CL: { name: "Comprension Lectora", quantity: 20 },
};

const CSyA = {
  ADM: { name: "Administracion", quantity: 6 },
  CONT: { name: "Contabilidad", quantity: 7 },
  ECON: { name: "Economia", quantity: 7 },
};

const CMyB = {
  AyF: { name: "Anatomia y Fisiologia", quantity: 10 },
  BQ: { name: "Bioquimica", quantity: 10 },
};

const ICFM = {
  CD: { name: "Calculo Diferencial", quantity: 9 },
  CI: { name: "Calculo Integral", quantity: 5 },
  PyE: { name: "Probabilidad y Estadistica", quantity: 6 },
};

const areaSubs = { CSyA, CMyB, ICFM };

const MS = {
  name: "MS",
  baseSubjects: MSBaseSubjects,
  areaSubjects: areaSubs,
  questions: 130,
};

export { MSBaseSubjects, CSyA, CMyB, ICFM, MS, areaSubs };
