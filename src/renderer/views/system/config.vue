<template>
    <Row id="setting" style="justify-content: center;display: flex;">
        <Col :span="16" style="top:20%; position: fixed">
        <Form ref="formItem" :model="formItem" :rules="ruleValidate" :label-width="120">
            <FormItem label="通知时间" prop="time">
                <Select v-model="formItem.time">
                    <Option value="60000">1分钟</Option>
                    <Option value="900000">15分钟</Option>
                    <Option value="1800000">30分钟</Option>
                    <Option value="3600000">60分钟</Option>
                </Select>
            </FormItem>
            <FormItem label="是否开启追命模式">
                <i-switch size="large" v-model="formItem.openChasing" @on-change="change">
                    <span slot="open">开启</span>
                    <span slot="close">关闭</span>
                </i-switch>
            </FormItem>
            <FormItem>
                <Button type="success" long @click="save">确定</Button>
            </FormItem>
        </Form>
        </Col>
    </Row>
</template>

<script>
  import Db from '@/libs/storage';
  const ipcRenderer = require('electron').ipcRenderer;
  export default {
    name: 'config',
    data() {
      return {
        formItem: {
          time: '',
          openChasing: false,
        },
        ruleValidate: {
          time: [
            { required: true, message: '请选择通知时间', trigger: 'blur' },
          ],
        },
      };
    },
    created() {
      Db.getData('config', (data) => {
        this.formItem.time = data.time;
        this.formItem.openChasing = data.openChasing;
      });
    },
    methods: {
      change(status) {
        this.openChasing = status;
      },
      save() {
        this.$refs.formItem.validate((valid) => {
          if (valid) {
            let config = {
              time: this.formItem.time,
              openChasing: this.formItem.openChasing,
            };
            Db.setData('config', config);
            this.$Message.info('保存成功');
            ipcRenderer.send('reset-scheduleNotify', {
              notifyConfig: config,
            });
          }
        });
      },
    },
  };
</script>

<style scoped>

</style>