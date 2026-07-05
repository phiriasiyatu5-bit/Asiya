export type University = {
  name: string;
};

export type Country = {
  id: string;
  name: string;
  flag: string;
  universities: University[];
};

export const SADC_COUNTRIES: Country[] = [
  {
    id: "zambia",
    name: "Zambia",
    flag: "🇿🇲",
    universities: [
      { name: "University of Zambia (UNZA)" },
      { name: "Copperbelt University" },
      { name: "Mulungushi University" },
      { name: "Lusaka Apex Medical University" },
      { name: "University of Lusaka" },
    ],
  },
  {
    id: "malawi",
    name: "Malawi",
    flag: "🇲🇼",
    universities: [
      { name: "University of Malawi" },
      { name: "Mzuzu University" },
      { name: "Malawi University of Science and Technology (MUST)" },
      { name: "Lilongwe University of Agriculture and Natural Resources" },
      { name: "Catholic University of Malawi" },
    ],
  },
  {
    id: "south-africa",
    name: "South Africa",
    flag: "🇿🇦",
    universities: [
      { name: "University of Cape Town" },
      { name: "University of Pretoria" },
      { name: "University of the Witwatersrand (Wits)" },
      { name: "Stellenbosch University" },
      { name: "University of Johannesburg" },
      { name: "University of KwaZulu-Natal" },
      { name: "University of South Africa (UNISA)" },
    ],
  },
  {
    id: "zimbabwe",
    name: "Zimbabwe",
    flag: "🇿🇼",
    universities: [
      { name: "University of Zimbabwe" },
      { name: "National University of Science and Technology (NUST)" },
      { name: "Midlands State University" },
      { name: "Bindura University" },
      { name: "Chinhoyi University of Technology" },
    ],
  },
  {
    id: "botswana",
    name: "Botswana",
    flag: "🇧🇼",
    universities: [
      { name: "University of Botswana" },
      { name: "Botswana International University of Science and Technology (BIUST)" },
      { name: "Botswana Accountancy College" },
    ],
  },
  {
    id: "tanzania",
    name: "Tanzania",
    flag: "🇹🇿",
    universities: [
      { name: "University of Dar es Salaam" },
      { name: "Muhimbili University" },
      { name: "Sokoine University of Agriculture" },
      { name: "Mzumbe University" },
      { name: "Ardhi University" },
    ],
  },
  {
    id: "mozambique",
    name: "Mozambique",
    flag: "🇲🇿",
    universities: [
      { name: "Eduardo Mondlane University" },
      { name: "Catholic University of Mozambique" },
      { name: "Pedagogical University" },
      { name: "A Politécnica" },
    ],
  },
  {
    id: "namibia",
    name: "Namibia",
    flag: "🇳🇦",
    universities: [
      { name: "University of Namibia (UNAM)" },
      { name: "Namibia University of Science and Technology (NUST)" },
      { name: "International University of Management" },
    ],
  },
  {
    id: "angola",
    name: "Angola",
    flag: "🇦🇴",
    universities: [
      { name: "Agostinho Neto University" },
      { name: "Catholic University of Angola" },
      { name: "Universidade Metodista de Angola" },
    ],
  },
  {
    id: "eswatini",
    name: "Eswatini",
    flag: "🇸🇿",
    universities: [
      { name: "University of Eswatini" },
      { name: "Southern Africa Nazarene University" },
    ],
  },
  {
    id: "lesotho",
    name: "Lesotho",
    flag: "🇱🇸",
    universities: [
      { name: "National University of Lesotho" },
      { name: "Limkokwing University of Creative Technology" },
    ],
  },
  {
    id: "madagascar",
    name: "Madagascar",
    flag: "🇲🇬",
    universities: [
      { name: "University of Antananarivo" },
      { name: "University of Toamasina" },
      { name: "University of Mahajanga" },
    ],
  },
  {
    id: "mauritius",
    name: "Mauritius",
    flag: "🇲🇺",
    universities: [
      { name: "University of Mauritius" },
      { name: "University of Technology Mauritius" },
      { name: "Middlesex University Mauritius" },
    ],
  },
  {
    id: "drc",
    name: "Democratic Republic of Congo",
    flag: "🇨🇩",
    universities: [
      { name: "University of Kinshasa" },
      { name: "University of Lubumbashi" },
      { name: "Catholic University of Congo" },
    ],
  },
  {
    id: "seychelles",
    name: "Seychelles",
    flag: "🇸🇨",
    universities: [
      { name: "University of Seychelles" },
    ],
  },
];
