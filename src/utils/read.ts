export async function readJsonFile(file: File): Promise<any> {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.onload = (event) => {
      try {
        const result = JSON.parse(event.target?.result as string);
        resolve(result);
      } catch (error) {
        reject(new Error('Failed to parse JSON file'));
      }
    };
    fileReader.onerror = () => {
      reject(new Error('Failed to read file'));
    };
    fileReader.readAsText(file);
  });
}