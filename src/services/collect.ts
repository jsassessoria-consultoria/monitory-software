import si from 'systeminformation';

const collectProcesses = async (keywords: string[]) => {
  const data = await si.processes();
  const allProcesses = data.list;

  const filtering = filterProcesses(allProcesses, keywords);
  const changedProcesses = addElapsedTime(filtering);
  const oneInstacesPerKeyword = mapOlderInstances(
    changedProcesses,
    keywords
  );

  return oneInstacesPerKeyword;
};

const filterProcesses = (
  processes: si.Systeminformation.ProcessesProcessData[],
  keywords: string[]
) => {
  return processes.filter(process => {
    return keywords.some(keyword => {
      return process.name.toLowerCase().includes(keyword);
    });
  });
};

const addElapsedTime = (
  processes: si.Systeminformation.ProcessesProcessData[]
) => {
  return processes.map(process => {
    return {
      ...process,
      elapsed: Date.now() - new Date(process.started).getTime()
    };
  });
};

const mapOlderInstances = (
  processes: ReturnType<typeof addElapsedTime>,
  keywords: string[]
) => {
  const keywordsMap: Record<
    string,
    ReturnType<typeof addElapsedTime>[0]
  > = {};
  const allProcesses: string[] = [];
  processes.forEach(process => {
    return keywords.some(keyword => {
      const processName = process.name.toLowerCase();
      const hasKeyword = processName.includes(keyword);

      if (hasKeyword && keywordsMap[processName] === undefined) {
        keywordsMap[processName] = process;
      } else if (
        hasKeyword &&
        keywordsMap[processName].elapsed > process.elapsed
      ) {
        keywordsMap[processName] = process;
      }
    });
  });

  // for( const keyword of keywords){
  //     if(keywordsMap[keyword] === undefined){
  //         keywordsMap[keyword] = null
  //     }
  // }

  for (const keyProcess in keywordsMap) {
    allProcesses.push(keyProcess);
  }

  return allProcesses;
};

export default collectProcesses;
