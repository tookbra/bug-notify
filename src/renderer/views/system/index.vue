<template>
    <Row id="setting" style="justify-content: center;display: flex; background: #fff">
        <Col :span="16" style="top:20%;">
            <Row>
                <Col>
                    <div class="wrapper-content ivu-article">
                        <div>
                            <h1>功能特色</h1>
                            <ul>
                                <li>支持的缺陷管理系统：禅道</li>
                                <li>运行环境: windows8及以上，macOs10.12.6及以上</li>
                            </ul>
                        </div>
                        <h1>更新日志</h1>
                        <article class="doc-update">
                            <Timeline pending>
                                <TimelineItem>
                                    <div class="anchor">
                                        <h2 id="0.0.1">0.0.1</h2>
                                    </div>
                                    <p> <code>2016-09-24</code> </p>
                                    <p>立项</p>
                                    <!--支持的缺陷管理系统：-->
                                    <!--运行环境: windows8及以上，macOs10.12.6及以上-->
                                </TimelineItem>
                            </Timeline>
                        </article>
                    </div>
                </Col>
            </Row>
        </Col>
    </Row>
</template>

<script>
  export default {
    name: 'index',
  };
</script>
<style>
    .ivu-timeline-item-content {
        top: -9px;
    }
    .wrapper-content h1 {
        margin: 12px 0;
    }
    .ivu-article h1 {
        font-size: 26px;
        font-weight: 400;
    }
    .ivu-article h2 {
        font-size: 20px;
        font-weight: 400;
    }
    .doc-update h2 {
        margin: 0;
        font-weight: 400;
    }
    code {
        display: inline-block;
        background: #f7f7f7;
        font-family: Consolas, Monaco, Andale Mono, Ubuntu Mono, monospace;
        margin: 0 3px;
        padding: 1px 5px;
        border-radius: 3px;
        color: #666;
        border: 1px solid #eee;
    }
</style>
