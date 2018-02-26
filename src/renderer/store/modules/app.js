import Db from '@/libs/storage';
import Vue from 'vue';

const SYSTEM_SETTING_NAME = {
  config: 'config',
};

const app = {
  state: {
    config: {},
  },
  mutations: {
    updateConfig(state, config) {
      state.config = config;
      Db.setData(SYSTEM_SETTING_NAME.config, config);
    },
  },
};

export default app;
