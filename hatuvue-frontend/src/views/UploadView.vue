<template>
  <div class="upload-view">
    <input ref="input" type="file" accept="video/*" />
    <button @click="Upload">업로드</button>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { request } from "@/util/server";
interface Data {
  uploadFile: string | undefined;
}
interface UploadRes {
  message: string;
  data: {
    name: string;
    type: string;
    file: string;
    size: number;
  };
}
export default defineComponent({
  name: "UploadView",
  data() {
    return {
      uploadFile: undefined,
    } as Data;
  },
  methods: {
    Upload() {
      let formData = new FormData();

      formData.append("file", (this.$refs.input as any).files[0]);

      request
        .post<UploadRes>("file/upload", formData, {
          "Content-Type": "multipart/form-data",
        })
        .then((res) => {
          if (!res?.data.data) return;
          this.uploadFile = res.data.data.file;
          console.log(res);
        })
        .catch((reason) => console.error(reason));
    },
  },
});
</script>
<style lang="scss"></style>
