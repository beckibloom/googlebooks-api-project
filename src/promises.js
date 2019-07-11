function doTask(name) {
    const p = new Promise((resolve, reject) => {
      console.log(`${name} has started`);
      const duration =   Math.floor(Math.random() * 5000);
      setTimeout(() => {
        resolve(`${name} has ended after ${duration} milliseconds`);
      }, duration);
    });
    return p;
  }

  Promise
  .all([
    doTask('A'),
    doTask('B'),
    doTask('C')
  ])
  .then(results => {
    //first console.log the results
    results.forEach(result => console.log(result));
    return doTask('D');
  })
  .then(result => {
    console.log(result);
  });
  