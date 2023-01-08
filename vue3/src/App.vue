<template>
  <div class="p-5 text-center">
    <p>{{ message }}</p>
    <form @submit.prevent="uploadVideo" class="form">
      <input
        type="file"
        accept="video/*"
        ref="videoInput"
        class="form-control w-25 m-auto"
      />
      <button type="submit" class="btn btn-primary m-3 w-25">
        Upload Video
      </button>
    </form>
    <hr />
    <div class="d-flex align-items-center flex-column text-center">
      <button
        type="submit"
        class="btn btn-success m-3 w-25"
        @click.prevent="downloadVideo()"
      >
        Download Video
      </button>
      <div v-if="url">
        <video width="50%" height="auto" controls class="m-auto">
          <source :src="url" type="video/mp4" />
        </video>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "./axios/axois";
export default {
  name: "App",
  components: {
    //
  },
  data: () => ({
    message: "",
    url: "",
  }),
  methods: {
    async uploadVideo() {
      try {
        const file = this.$refs.videoInput.files[0];
        const reader = new FileReader();

        reader.onload = async () => {
          const videoData = reader.result;
          const res = await axios.post("/api/upload-video", { videoData });
          console.log(res.data);
        };

        reader.readAsDataURL(file);
      } catch (err) {
        console.log(err);
      }
    },
    async downloadVideo() {
      await axios.get("/api/download-video");
    },
  },
  async created() {
    try {
      const result = await axios.get("/");
      this.message = result.data.data;
    } catch (err) {
      console.log(err);
    }
  },
};
</script>

<style></style>
