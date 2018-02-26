import axios from 'axios';
import Db from './storage';

const ZENTAO_URL = {
  getSession: '/index.php?m=api&f=getSessionID&t=json',
  login: '/index.php?t=json&m=user&f=login',
  myBug: '/index.php?m=my&f=bug&t=json',
  bugUrl: '/index.php?m=bug&f=view',
};

const http = axios.create({
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
  },
  withCredentials: true,
});

const zentao = {
};


zentao.getSession = (data) => {
  http.get(data.url + ZENTAO_URL.getSession).then((res) => {
    if (res.data.status === 'success') {
      const zentaoData = JSON.parse(res.data.data);
      zentao.login(data, zentaoData.sessionID);
    }
  });
};

zentao.login = (data, sid) => {
  http.post(data.url + ZENTAO_URL.login + '&sid=' + sid + '&account=' + data.username + '&password=' + data.password).then((res) => {
    if (res.data.status === 'success') {
      zentao.getMyBug(data, sid);
    }
  });
};

zentao.getMyBug = (data, sid) => {
  http.get(data.url + ZENTAO_URL.myBug + '&sid=' + sid).then((res) => {
    if (res.data.status === 'success') {
      const bug = JSON.parse(res.data.data);
      Db.getData('bugs', (bugs) => {
        if (bugs.length > 0) {
          for (let i = 0; i < bug.bugs.length; i += 1) {
            const val = bugs.filter(e => e.id !== bug.bugs[i].id);
            if (val.length === 0) {
              bugs.push({
                id: bug.bugs[i].id,
                title: bug.bugs[i].title,
                url: data.url + ZENTAO_URL.bugUrl + '&bugID=' + bug.bugs[i].id + '&sid=' + sid,
              });
            }
          }
        } else {
          for (let i = 0; i < bug.bugs.length; i += 1) {
            bugs.push({
              id: bug.bugs[i].id,
              title: bug.bugs[i].title,
              url: data.url + ZENTAO_URL.bugUrl + '&bugID=' + bug.bugs[i].id + '&sid=' + sid,
            });
          }
        }
        Db.setData('bugs', bugs);
      });
    }
  });
};

zentao.start = () => {
  Db.getData('zentao', (data) => {
    zentao.getSession(data);
  });
};

zentao.setting = (setting) => {
  Db.setData('zentao', setting, true);
};

export default zentao;
