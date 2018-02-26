import zentao from './zentao';
import Storage from './storage';


// const CRON = '*/1 * * * *';

const job = undefined;

const schedule = () => {
  if (job) {
    job.cancel();
  }
  Storage.getData('current', (data) => {
    console.log(data);
    switch (data) {
      case 'zentao':
        setInterval(() => {
          zentao.start();
        }, 10000);
        break;
      default:
        console.log('not found current setting');
    }
  });
};

export default schedule;
