<template>
    <Row id="setting" style="justify-content: center;display: flex;">
        <Col :span="16" style="top:20%; position: fixed">
            <Form ref="formItem" :model="formItem" :rules="ruleValidate" :label-width="80">
                <FormItem label="缺陷产品" prop="product">
                    <Select v-model="formItem.product" @on-change="getProduct">
                        <Option value="zentao">禅道</Option>
                    </Select>
                </FormItem>
                <FormItem label="url" prop="url">
                    <Input v-model="formItem.url" placeholder="请输入url"></Input>
                </FormItem>
                <FormItem label="用户名" prop="username">
                    <Input v-model="formItem.username" placeholder="请输入用户名"></Input>
                </FormItem>
                <FormItem label="密码" prop="password">
                    <Input v-model="formItem.password" type="password" placeholder="请输入密码"></Input>
                </FormItem>
                <FormItem>
                    <Button type="success" long @click="saveSetting">确定</Button>
                </FormItem>
            </Form>
        </Col>
    </Row>
</template>

<script>
  import Zentao from '@/libs/zentao';
  import Db from '@/libs/storage';
  export default {
    name: 'setting',
    data() {
      return {
        formItem: {
          product: '',
          url: '',
          username: '',
          password: '',
        },
        ruleValidate: {
          product: [
            { required: true, message: '请选择产品', trigger: 'blur' },
          ],
          url: [
            { required: true, message: '请输入url', trigger: 'blur' },
          ],
          username: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
          ],
        },
      };
    },
    methods: {
      saveSetting() {
        this.$refs.formItem.validate((valid) => {
          if (valid) {
            const setting = {};
            setting.product = this.formItem.product;
            setting.url = this.formItem.url;
            setting.username = this.formItem.username;
            setting.password = this.formItem.password;
            Zentao.setting(setting);
            this.$Message.info('设置成功');
            // window.close();
          }
        });
      },
      getProduct(product) {
        Db.getData(product, (data) => {
          this.formItem.url = data.url;
          this.formItem.username = data.username;
          this.formItem.password = data.password;
        });
      },
    },
  };
</script>

<style scoped>

</style>