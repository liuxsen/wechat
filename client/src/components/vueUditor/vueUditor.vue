<template>
  <div ref="editor"></div>
</template>
<script>
  /* eslint-disable */
  import '../../../static/utf8-php/ueditor.config';
  import '../../../static/utf8-php/ueditor.all';
  import '../../../static/utf8-php/ueditor.config';
  import '../../../static/utf8-php/lang/zh-cn/zh-cn';
  export default {
    data() {
      return {
        id: 'ueditorId',
        randomId: 'editor_' + (Math.random() * 100000000000000000),
      };
    },
    props: {
      value: {
        type: String,
        default: null,
      },
      config: {
        type: Object,
        default: {},
      }
    },
    watch: {
      value: function value(val, oldVal) {
        this.editor = UE.getEditor(this.randomId, this.config);
        if (val !== null) {
          this.editor.setContent(val);
        }
      }
    },
    mounted() {
//             保证 this.$el 已经插入文档
      this.$refs.editor.id = this.randomId;
      this.editor = UE.getEditor(this.randomId, this.config);
      this.editor.ready(
        function f2() {
          this.editor.setContent(this.value);
          this.editor.addListener("contentChange", function () {
            const wordCount = this.editor.getContentLength(true);
            const content = this.editor.getContent();
            const plainTxt = this.editor.getPlainTxt();
            this.$emit('input', {wordCount: wordCount, content: content, plainTxt: plainTxt});
          }.bind(this));
          this.$emit('ready', this.editor);
        }.bind(this));
    }
  }
</script>
<style>
</style>

