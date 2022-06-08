// TODO: import module bila dibutuhkan di sini
const fs = require('fs');

// ! JANGAN DIMODIFIKASI
let file1 = "./data1.json";
let file2 = "./data2.json";
let file3 = "./data3.json";

// ! JANGAN DIMODIFIKASI
let modifyFile1 = (val) => {
  file1 = val;
};
let modifyFile2 = (val) => {
  file2 = val;
};
let modifyFile3 = (val) => {
  file3 = val;
};

// TODO: Kerjakan bacaData
const getWord = (words) => {
  const splitWord = words.split(' ')
  if (splitWord?.length >= 1) {
    return splitWord[1]
  }
}

const process = (setData) => {
  const data = JSON.parse(setData)
  let data2 = '';
  if (data?.message != undefined) {
    data2 = data?.message
  }
  if (data?.length) {
    data?.forEach(item => {

      if (item?.message !== undefined) {
        data2 = item?.message
      }

      if (item?.data?.message !== undefined) {
        data2 = item?.data?.message
      }
    })
  }
  return getWord(data2);
}
// gunakan variabel file1, file2, dan file3
const bacaData = (fnCallback) => {
  const fileList = [file1, file2, file3]
  const result = []

  fileList.forEach(item => {
    const processItem = new Promise((resolve, reject) => {
      fs.readFile(item, (error, data) => {
        // error state
        if (error) {
          reject(error)
          return
        }
        // success state
        const getProcessedItem = process(data)
        resolve(getProcessedItem)
      })
    })
    result.push(processItem)
  })

  // call result in callback
  Promise.all(result).then(values => {
    fnCallback(null, values)
  }).catch(error => {
    fnCallback(error, null)
  });
};

// ! JANGAN DIMODIFIKASI
module.exports = {
  modifyFile1,
  modifyFile2,
  modifyFile3,
  bacaData,
};
