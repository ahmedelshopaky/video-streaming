<template>
  <div class="p-5 text-center">
    <p>{{ message }}</p>
    <form class="form">
      <input
        type="file"
        accept="video/*|image/*"
        ref="videoInput"
        class="form-control w-25 m-auto"
      />
      <button
        type="button"
        class="btn btn-primary m-3 w-25"
        @click.prevent="uploadVideo"
      >
        Upload Video
      </button>
    </form>
    <hr />
    <div class="d-flex align-items-center flex-column text-center">
      <button
        type="button"
        class="btn btn-success m-3 w-25"
        @click.prevent="downloadVideo()"
      >
        Download Video
      </button>
      <div v-if="url">
        <img :src="image" width="50%" height="auto" />
        <!-- <video width="50%" height="auto" controls class="m-auto">
          <source src="../../../movie.mp4" type="video/mp4" />
        </video> -->
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
    image: "",
    message: "",
    url: "xxx",
  }),
  methods: {
    async uploadVideo() {
      try {
        const file = this.$refs.videoInput.files[0];
        const reader = new FileReader();

        reader.onload = async () => {
          const videoData = reader.result;
          await axios.post("/api/upload-video", { videoData });
        };

        reader.readAsDataURL(file);
      } catch (err) {
        console.log(err);
      }
    },
    async downloadVideo() {
      try {
        const response = await axios.get("/api/download-video");
        const blob = new Blob([response.data], { type: "image/jpg" });
        this.image = URL.createObjectURL(blob);
      } catch (err) {
        console.log(err);
      }
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
