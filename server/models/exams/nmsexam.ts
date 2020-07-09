const NMSSubjects = {
  HV: { name: "Habilidad Verbal", quantity: 16 },
  HM: { name: "Habilidad Matematica", quantity: 16 },
  ESP: { name: "Español", quantity: 12 },
  HIST: { name: "Historia", quantity: 12 },
  GEO: { name: "Geografia", quantity: 12 },
  FCyE: { name: "Formacion Civica y Etica", quantity: 12 },
  MAT: { name: "Matematicas", quantity: 12 },
  FIS: { name: "Fisica", quantity: 12 },
  QUIM: { name: "Quimica", quantity: 12 },
  BIO: { name: "Biologia", quantity: 12 },
};

const NMS = {
  name: "NMS",
  subjects: NMSSubjects,
  questions: 128,
};

export { NMS, NMSSubjects };
