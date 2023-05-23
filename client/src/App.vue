<template>
  <!-- <div v-if="loading">
    <p>Loading...</p>
  </div> -->
  <h1>Todo List</h1>
  <AddItem :items="items" />
  <div class="add-item">
    <input type="text" v-model="list" class="form-input" />
    <button @click="addItem" :disabled="!list" class="button-input">
      Tambah
    </button>
  </div>
  <div class="flex-card">
    <div class="card-item" v-for="(item, index) in items" :key="item._id">
      <div class="icon">
        <img
          :src="edit_icon"
          alt="edit icon"
          class="edit-icon"
          @click="toggleEdit(index)"
        />
        <img
          :src="delete_icon"
          alt="edit icon"
          class="edit-icon"
          v-on:click="removeItem(item, index)"
        />
      </div>
      <div class="title-item">
        {{ item.description }}
      </div>

      <div v-show="index == open" class="flex-edit">
        <input type="text" v-model="edit_list" class="input-edit" />
        <button @click="editItem(item, index)" :disabled="!edit_list">
          Edit
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "App",
  data() {
    return {
      items: [],
      list: "",
      edit_list: "",
      edit_icon: require("./assets/edit.svg"),
      delete_icon: require("./assets/delete.svg"),
      open: null,
    };
  },
  created() {
    // const response = await axios.get("api/list/");
    // this.items = response.data;
    this.getItems();
  },
  methods: {
    async getItems() {
      const response = await axios.get("api/list/");
      this.items = response.data;
    },
    async addItem() {
      const response = await axios.post("api/list/", {
        description: this.list,
      });
      this.items.push(response.data);
      this.list = "";
    },
    async removeItem(item, index) {
      await axios.delete("api/list/" + item._id);
      this.items.splice(index, 1);
    },
    async editItem(item, index) {
      const response = await axios.put("api/list/" + item._id, {
        description: this.edit_list,
      });
      this.items.splice(index, 1, response.data);
      this.edit_list = "";
      this.open = null;
    },
    toggleEdit(index) {
      this.open = index;
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.flex-card {
  display: flex;
  flex-wrap: wrap;
  /* justify-content: space-around; */
}
.card-item {
  width: 220px;
  height: 100px;
  border-radius: 10px;
  border: 1px solid black;
  margin: 10px;
  padding: 10px;
}
.edit-icon {
  width: 20px;
  height: 20px;
  cursor: pointer;
}
.icon {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}
.flex-edit {
  display: flex;
  gap: 10px;
  width: auto;
}
.input-edit {
  width: 100%;
}
.title-item {
  width: 100%;
  overflow-wrap: break-word;
  text-align: start;
  margin-top: 10px;
  /* background-color: #2c3e50; */
}
.add-item {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-bottom: 10px;
}
.form-input {
  width: 300px;
  height: 30px;
  border-radius: 10px;
  /* border: 1px solid black; */
  padding: 5px;
}
.button-input {
  width: 100px;
  height: 45px;
  border-radius: 10px;
  /* border: 1px solid black; */
  padding: 5px;
  cursor: pointer;
}
</style>
