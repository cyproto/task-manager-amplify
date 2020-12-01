<template>
  <amplify-authenticator>
    <div id="task-app">
      <h1>Task system</h1>
      <input type="text" v-model="name" placeholder="Task title" />
      <input type="text" v-model="description" placeholder="Description" />
      <input type="text" v-model="status" placeholder="Status" />
      <input type="text" v-model="track" placeholder="Track" />
      <input type="text" v-model="qaName" placeholder="QA name" />
      <input type="text" v-model="priority" placeholder="Priority" />
      <input type="text" v-model="storyPoints" placeholder="Story points" />
      <input type="text" v-model="sprintName" placeholder="Sprint" />
      <input type="date" v-model="releaseDate" placeholder="Sprint" />
      <button v-on:click="createTask">Create task</button>
    </div>
    <amplify-sign-out></amplify-sign-out>
  </amplify-authenticator>
</template>

<script>
import API from '@aws-amplify/api';
import { createTask } from "./graphql/mutations";

export default {
  name: "App",
  data() {
    return {
      name: "",
      description: "",
      status: "",
      track: "",
      qaName: "",
      priority: "",
      storyPoints: 0,
      sprintName: "",
      releaseDate: "",
    };
  },
  methods: {
    async createTask() {
      const {
        name,
        description,
        status,
        track,
        qaName,
        priority,
        storyPoints,
        sprintName,
        releaseDate,
      } = this;
      const task = {
        name,
        description,
        status,
        track,
        qaName,
        priority,
        storyPoints,
        sprintName,
        releaseDate,
      };
      for (let key in task) {
        if (null === task[key] || "" === task[key]) {
          console.log(task[key]);
          return key;
        }
      }
      await API.graphql({
        query: createTask,
        variables: { input: task },
      });
      for (let key in task) {
        task[key] = null;
      }
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
</style>
