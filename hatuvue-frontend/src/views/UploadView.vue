<template>
  <div class="upload-view">
    <input ref="input" type="file" accept="video/*" />
    <button @click="Upload">업로드</button>

    <div v-show="uploadFile != undefined">
      <input class="title" v-model="name" placeholder="제목" />
      <textarea
        class="desc"
        v-model="description"
        placeholder="설명"
      ></textarea>
      <button @click="CreateVideo"></button>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { request } from "@/util/server";
import storage from "@/util/storage";
import { User } from "@/util/user";
interface Data {
  uploadFile: string | undefined;
  name: string;
  description: "";
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
      name: "",
      description: "",
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
    CreateVideo() {
      const user = storage.get<User>("user") as User;
      console.log(this.name);
      console.log(user.id);
      console.log(this.description);
      console.log(user.username);
      console.log(this.uploadFile);
      request
        .post("video/upload", {
          name: this.name,
          description: this.description,
          owner: user.id,
          author: user.username,
          file: this.uploadFile,
        })
        .then(() => {
          this.$router.push("/");
        })
        .catch((reason) => {
          console.error(reason);
        });
    },
  },
});
</script>
<style lang="scss"></style>
