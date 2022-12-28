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
  </div>
  <!-- <div class="text-center p-5">
    <video width="50%" height="auto" controls>
      <source src="movie.mp4" type="video/mp4">
    </video>
  </div> -->
</template>

<script>
import axios from "./axios/axois";
export default {
  name: "App",
  components: {
    //
  },
  data: () => ({
    message: '',
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
