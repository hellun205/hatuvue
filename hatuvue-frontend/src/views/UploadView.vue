<template>
  <h1>동영상 업로드</h1>
  <div class="upload-view mt-1">
    <div class="upload-wrapper">
      <div class="status" v-if="uploading"><h2>업로드 중...</h2></div>
      <div class="preview" v-if="previewSrc">
        <video-player class="video" :src="previewSrc" controls preload="auto" />
      </div>

      <div class="input-field mt-1">
        <input class="filename" readonly v-model="selectedFile" />
        <button class="button find ml-10" @click="handleSelectFileClick">
          선택
        </button>
        <button
          class="button ml-10"
          @click="upload"
          :disabled="!isEnableUpload"
        >
          업로드
        </button>
        <input
          ref="input"
          type="file"
          accept="video/*"
          @change="handleChangeFile"
        />
      </div>
    </div>

    <div class="field-wrapper">
      <div class="create-field" v-show="uploadFile != undefined">
        <input class="title" v-model="name" placeholder="제목" />
        <textarea
          class="desc mt-10"
          v-model="description"
          placeholder="설명"
          rows="5"
        ></textarea>
        <button
          class="button create mt-10"
          @click="createVideo"
          :disabled="!handleCreateEnabled()"
        >
          비디오 업로드
        </button>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { getServer, request } from "@/util/server";
import storage from "@/util/storage";
import { User } from "@/util/user";
import { VideoPlayer } from "@videojs-player/vue";
import "video.js/dist/video-js.css";
import { validate } from "@/util/validate";
interface Data {
  selectedFile: string;
  uploading: boolean;
  previewSrc: string;
  uploadFile: string | undefined;
  name: string;
  description: "";
  isEnableUpload: boolean;
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
      selectedFile: "",
      uploading: false,
      isEnableUpload: false,
      previewSrc: "",
      uploadFile: undefined,
      name: "",
      description: "",
    } as Data;
  },
  methods: {
    handleSelectFileClick() {
      this.selectedFile = "";
      this.previewSrc = "";
      (this.$refs.input as HTMLInputElement).click();
    },
    handleChangeFile(e: Event) {
      const input = e.target as HTMLInputElement;
      this.selectedFile = input.files ? input.files[0]?.name : "";
      if (this.selectedFile) {
        this.isEnableUpload = true;
      }
    },
    handleCreateEnabled() {
      return (
        validate("video.name", this.name) &&
        validate("video.description", this.description)
      );
    },
    upload() {
      let formData = new FormData();

      formData.append("file", (this.$refs.input as any).files[0]);
      this.uploading = true;
      this.isEnableUpload = false;
      request
        .post<UploadRes>("file/upload", formData, {
          "Content-Type": "multipart/form-data",
        })
        .then((res) => {
          if (!res?.data.data) return;
          this.uploadFile = res.data.data.file;
          this.previewSrc = `${getServer()}/files/uploads/${
            res.data.data.file
          }`;
          this.uploading = false;
        })
        .catch((reason) => console.error(reason));
    },
    createVideo() {
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
<style lang="scss">
@import "../Constance.scss";

@media (min-width: 0px) {
  .upload-view {
    flex-direction: column;
  }
  .field-wrapper,
  .upload-wrapper {
    width: 90%;
  }

  .field-wrapper {
    margin-top: 1rem;
  }
}

@media (min-width: 850px) {
  .upload-view {
    flex-direction: row;
  }

  .upload-wrapper {
    width: 55%;
  }

  .field-wrapper {
    width: 35%;
    margin-left: 1rem;
  }
}

.upload-view {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;

  .upload-wrapper,
  .field-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .preview {
    aspect-ratio: 16 / 9;
    width: 100%;
    .video {
      z-index: 0;
      border: 1px solid black;
      min-width: 100%;
      max-width: 100%;
      min-height: 100%;
      max-height: 100%;
      width: 100%;
      height: 100%;
      position: relative;
    }
  }

  .input-field {
    width: 100%;
    .filename {
      width: calc(100% - 160px);
    }
    .button {
      width: 70px;
    }
  }

  .create-field {
    display: flex;
    width: 100%;
    flex-direction: column;

    .title {
      width: 100%;
    }

    .desc {
      width: 100%;
      resize: none;
    }
  }

  input[type="file"] {
    display: none;
  }
}
</style>
