import Papa from 'papaparse';

const parser = (data: string) =>
  Papa.parse(data, { delimiter: ',', header: true }).data;

export default parser;
