export type University = {
  name: string;
  type: "Public" | "Private" | "Technical";
  founded: number;
  website: string;
};

export type Country = {
  id: string;
  name: string;
  flag: string;
  capital: string;
  region: string;
  languages: string[];
  universities: University[];
};

export const SADC_COUNTRIES: Country[] = [
  {
    id: "zambia",
    name: "Zambia",
    flag: "🇿🇲",
    capital: "Lusaka",
    region: "Central Africa",
    languages: ["English", "Bemba", "Nyanja", "Tonga"],
    universities: [
      { name: "University of Zambia (UNZA)", type: "Public", founded: 1966, website: "https://www.unza.zm" },
      { name: "Copperbelt University", type: "Public", founded: 1987, website: "https://www.cbu.ac.zm" },
      { name: "Mulungushi University", type: "Public", founded: 2008, website: "https://www.mu.ac.zm" },
      { name: "Lusaka Apex Medical University", type: "Private", founded: 2011, website: "https://www.lamu.ac.zm" },
      { name: "University of Lusaka", type: "Private", founded: 2007, website: "https://www.unilus.ac.zm" },
    ],
  },
  {
    id: "malawi",
    name: "Malawi",
    flag: "🇲🇼",
    capital: "Lilongwe",
    region: "East Africa",
    languages: ["English", "Chichewa"],
    universities: [
      { name: "University of Malawi", type: "Public", founded: 1965, website: "https://www.unima.ac.mw" },
      { name: "Mzuzu University", type: "Public", founded: 1997, website: "https://www.mzuni.ac.mw" },
      { name: "Malawi University of Science and Technology (MUST)", type: "Technical", founded: 2012, website: "https://www.must.ac.mw" },
      { name: "Lilongwe University of Agriculture and Natural Resources", type: "Public", founded: 2011, website: "https://www.luanar.ac.mw" },
      { name: "Catholic University of Malawi", type: "Private", founded: 2006, website: "https://www.cunima.ac.mw" },
    ],
  },
  {
    id: "south-africa",
    name: "South Africa",
    flag: "🇿🇦",
    capital: "Pretoria",
    region: "Southern Africa",
    languages: ["Zulu", "Xhosa", "Afrikaans", "English", "Sotho", "Tswana", "Tsonga", "Swati", "Venda", "Ndebele", "Pedi"],
    universities: [
      { name: "University of Cape Town", type: "Public", founded: 1829, website: "https://www.uct.ac.za" },
      { name: "University of Pretoria", type: "Public", founded: 1908, website: "https://www.up.ac.za" },
      { name: "University of the Witwatersrand (Wits)", type: "Public", founded: 1922, website: "https://www.wits.ac.za" },
      { name: "Stellenbosch University", type: "Public", founded: 1918, website: "https://www.sun.ac.za" },
      { name: "University of Johannesburg", type: "Public", founded: 1904, website: "https://www.uj.ac.za" },
      { name: "University of KwaZulu-Natal", type: "Public", founded: 2004, website: "https://www.ukzn.ac.za" },
      { name: "University of South Africa (UNISA)", type: "Public", founded: 1873, website: "https://www.unisa.ac.za" },
    ],
  },
  {
    id: "zimbabwe",
    name: "Zimbabwe",
    flag: "🇿🇼",
    capital: "Harare",
    region: "Southern Africa",
    languages: ["Shona", "Ndebele", "English"],
    universities: [
      { name: "University of Zimbabwe", type: "Public", founded: 1955, website: "https://www.uz.ac.zw" },
      { name: "National University of Science and Technology (NUST)", type: "Technical", founded: 1990, website: "https://www.nust.ac.zw" },
      { name: "Midlands State University", type: "Public", founded: 1999, website: "https://www.msu.ac.zw" },
      { name: "Bindura University", type: "Public", founded: 1996, website: "https://www.buse.ac.zw" },
      { name: "Chinhoyi University of Technology", type: "Technical", founded: 1999, website: "https://www.cut.ac.zw" },
    ],
  },
  {
    id: "botswana",
    name: "Botswana",
    flag: "🇧🇼",
    capital: "Gaborone",
    region: "Southern Africa",
    languages: ["Setswana", "English"],
    universities: [
      { name: "University of Botswana", type: "Public", founded: 1982, website: "https://www.ub.bw" },
      { name: "Botswana International University of Science and Technology (BIUST)", type: "Technical", founded: 2012, website: "https://www.biust.ac.bw" },
      { name: "Botswana Accountancy College", type: "Private", founded: 1997, website: "https://www.bac.ac.bw" },
    ],
  },
  {
    id: "tanzania",
    name: "Tanzania",
    flag: "🇹🇿",
    capital: "Dodoma",
    region: "East Africa",
    languages: ["Swahili", "English"],
    universities: [
      { name: "University of Dar es Salaam", type: "Public", founded: 1961, website: "https://www.udsm.ac.tz" },
      { name: "Muhimbili University", type: "Public", founded: 1963, website: "https://www.muhas.ac.tz" },
      { name: "Sokoine University of Agriculture", type: "Public", founded: 1984, website: "https://www.suanet.ac.tz" },
      { name: "Mzumbe University", type: "Public", founded: 1972, website: "https://www.mzumbe.ac.tz" },
      { name: "Ardhi University", type: "Technical", founded: 1974, website: "https://www.aru.ac.tz" },
    ],
  },
  {
    id: "mozambique",
    name: "Mozambique",
    flag: "🇲🇿",
    capital: "Maputo",
    region: "East Africa",
    languages: ["Portuguese", "Emakhuwa", "Xichangana"],
    universities: [
      { name: "Eduardo Mondlane University", type: "Public", founded: 1962, website: "https://www.uem.mz" },
      { name: "Catholic University of Mozambique", type: "Private", founded: 1996, website: "https://www.ucm.ac.mz" },
      { name: "Pedagogical University", type: "Public", founded: 1985, website: "https://www.up.ac.mz" },
      { name: "A Politécnica", type: "Private", founded: 1995, website: "https://www.apolitecnica.ac.mz" },
    ],
  },
  {
    id: "namibia",
    name: "Namibia",
    flag: "🇳🇦",
    capital: "Windhoek",
    region: "Southern Africa",
    languages: ["English", "Afrikaans", "Oshiwambo", "Nama/Damara"],
    universities: [
      { name: "University of Namibia (UNAM)", type: "Public", founded: 1992, website: "https://www.unam.edu.na" },
      { name: "Namibia University of Science and Technology (NUST)", type: "Technical", founded: 1994, website: "https://www.nust.na" },
      { name: "International University of Management", type: "Private", founded: 1994, website: "https://www.ium.edu.na" },
    ],
  },
  {
    id: "angola",
    name: "Angola",
    flag: "🇦🇴",
    capital: "Luanda",
    region: "Central Africa",
    languages: ["Portuguese", "Umbundu", "Kikongo", "Kimbundu"],
    universities: [
      { name: "Agostinho Neto University", type: "Public", founded: 1963, website: "https://www.uan.ao" },
      { name: "Catholic University of Angola", type: "Private", founded: 1992, website: "https://www.ucan.edu" },
      { name: "Universidade Metodista de Angola", type: "Private", founded: 2009, website: "https://www.uma.op.ac.mz" },
    ],
  },
  {
    id: "eswatini",
    name: "Eswatini",
    flag: "🇸🇿",
    capital: "Mbabane",
    region: "Southern Africa",
    languages: ["Swati", "English"],
    universities: [
      { name: "University of Eswatini", type: "Public", founded: 1964, website: "https://www.uneswa.ac.sz" },
      { name: "Southern Africa Nazarene University", type: "Private", founded: 2007, website: "https://www.sanu.ac.sz" },
    ],
  },
  {
    id: "lesotho",
    name: "Lesotho",
    flag: "🇱🇸",
    capital: "Maseru",
    region: "Southern Africa",
    languages: ["Sesotho", "English"],
    universities: [
      { name: "National University of Lesotho", type: "Public", founded: 1945, website: "https://www.nul.ls" },
      { name: "Limkokwing University of Creative Technology", type: "Private", founded: 2008, website: "https://www.limkokwing.net" },
    ],
  },
  {
    id: "madagascar",
    name: "Madagascar",
    flag: "🇲🇬",
    capital: "Antananarivo",
    region: "Indian Ocean",
    languages: ["Malagasy", "French"],
    universities: [
      { name: "University of Antananarivo", type: "Public", founded: 1961, website: "https://www.univ-antananarivo.mg" },
      { name: "University of Toamasina", type: "Public", founded: 1977, website: "https://www.univ-toamasina.mg" },
      { name: "University of Mahajanga", type: "Public", founded: 1977, website: "https://www.univ-mahajanga.mg" },
    ],
  },
  {
    id: "mauritius",
    name: "Mauritius",
    flag: "🇲🇺",
    capital: "Port Louis",
    region: "Indian Ocean",
    languages: ["Creole", "English", "French"],
    universities: [
      { name: "University of Mauritius", type: "Public", founded: 1965, website: "https://www.uom.ac.mu" },
      { name: "University of Technology Mauritius", type: "Technical", founded: 2000, website: "https://www.utm.ac.mu" },
      { name: "Middlesex University Mauritius", type: "Private", founded: 2010, website: "https://www.mdx.ac.mu" },
    ],
  },
  {
    id: "drc",
    name: "Democratic Republic of Congo",
    flag: "🇨🇩",
    capital: "Kinshasa",
    region: "Central Africa",
    languages: ["French", "Lingala", "Swahili", "Kikongo", "Tshiluba"],
    universities: [
      { name: "University of Kinshasa", type: "Public", founded: 1954, website: "https://www.unikin.ac.cd" },
      { name: "University of Lubumbashi", type: "Public", founded: 1955, website: "https://www.unilu.ac.cd" },
      { name: "Catholic University of Congo", type: "Private", founded: 1963, website: "https://www.ucc.ac.cd" },
    ],
  },
  {
    id: "seychelles",
    name: "Seychelles",
    flag: "🇸🇨",
    capital: "Victoria",
    region: "Indian Ocean",
    languages: ["Seychellois Creole", "English", "French"],
    universities: [
      { name: "University of Seychelles", type: "Public", founded: 2009, website: "https://www.unisey.ac.sc" },
    ],
  },
];
