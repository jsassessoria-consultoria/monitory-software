function csvToObj(csvData: string) {
  const rows = csvData.split('\n');
  const headers = rows[0].split(',');
  rows.shift();
  const objArr = [];
  rows.forEach(row => {
    const obj = {};
    const values = row.split(',');
    headers.forEach((header, index) => {
      const normalizedHeader = header.replaceAll(/[\\"\r]/g, '');
      const normalizedValue = values[index]?.replaceAll(
        /[\\"]/g,
        ''
      );
      obj[normalizedHeader] = normalizedValue;
    });
    objArr.push(obj);
  });

  return objArr;
}
export { csvToObj };
