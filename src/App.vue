<template>
  <amplify-authenticator>
    <div id="task-app">
      <h1>Task system</h1>
      <p>{{ error }}</p>
      <vs-input type="hidden" v-model="id" />
      <vs-row>
        <vs-col vs-type="flex" vs-justify="center" vs-align="center" w="4">
          <vs-input v-model="name" placeholder="Task title" />
        </vs-col>
      </vs-row>

      <vs-row>
        <vs-col vs-type="flex" vs-justify="center" vs-align="center" w="4">
          <vs-input v-model="description" placeholder="Description" />
        </vs-col>
        <vs-col vs-type="flex" vs-justify="center" vs-align="center" w="4">
          <vs-select placeholder="Status" v-model="status">
            <vs-option label="New" value="New"> New </vs-option>
            <vs-option label="Under review" value="Under review"> Under review </vs-option>
            <vs-option label="On hold" value="On hold"> On hold </vs-option>
            <vs-option label="Backlog" value="Backlog"> Backlog </vs-option>
            <vs-option label="Awaiting response" value="Awaiting response">
              Awaiting response
            </vs-option>
            <vs-option label="Dev ready" value="Dev ready"> Dev ready </vs-option>
            <vs-option label="Dev in Progress" value="Dev in Progress">
              Dev in Progress
            </vs-option>
            <vs-option label="QA Ready" value="QA Ready"> QA Ready </vs-option>
            <vs-option label="QA in Progress" value="QA in Progress">
              QA in Progress
            </vs-option>
            <vs-option label="Release Ready" value="Release Ready">
              Release Ready
            </vs-option>
            <vs-option label="Committed" value="Committed"> Committed </vs-option>
            <vs-option label="Released on Stage" value="Released on Stage">
              Released on Stage
            </vs-option>
            <vs-option label="Verified on Stage" value="Verified on Stage">
              Verified on Stage
            </vs-option>
            <vs-option label="Released on Rapid" value="Released on Rapid">
              Released on Rapid
            </vs-option>
            <vs-option label="Verified on Rapid" value="Verified on Rapid">
              Verified on Rapid
            </vs-option>
            <vs-option label="Released on Standard" value="Released on Standard">
              Released on Standard
            </vs-option>
            <vs-option label="Verified on Standard" value="Verified on Standard">
              Verified on Standard
            </vs-option>
            <vs-option label="Completed" value="Completed"> Completed </vs-option>
            <vs-option label="Cancelled" value="Cancelled"> Cancelled </vs-option>
          </vs-select>
        </vs-col>
        <vs-col vs-type="flex" vs-justify="center" vs-align="center" w="4">
          <vs-input v-model="track" placeholder="Track" />
        </vs-col>
      </vs-row>

      <vs-input v-model="qaName" placeholder="QA name" />
      <vs-input v-model="priority" placeholder="Priority" />
      <vs-input v-model="storyPoints" placeholder="Story points" />
      <vs-input v-model="sprintName" placeholder="Sprint" />
      <vs-input type="date" v-model="releaseDate" />
      <div v-if="isEditClicked">
        <vs-button v-on:click="updateTask">Update task</vs-button>
      </div>
      <div v-else>
        <vs-button v-on:click="createTask">Create task</vs-button>
      </div>
      <div v-for="task in tasks" :key="task.id">
        <h3>{{ task.name }}</h3>
        <p>Description: {{ task.description }}</p>
        <p>Status: {{ task.status }}</p>
        <p>Track: {{ task.track }}</p>
        <p>QA name: {{ task.qaName }}</p>
        <p>Priority: {{ task.priority }}</p>
        <p>Stroy points: {{ task.storyPoints }}</p>
        <p>Sprint name: {{ task.sprintName }}</p>
        <p>Release date: {{ task.releaseDate }}</p>
        <vs-button v-on:click="prepareTaskForEdit(task)">Update task</vs-button>
        <vs-button v-on:click="deleteTask(task)">Delete task</vs-button>
      </div>
    </div>
    <amplify-sign-out></amplify-sign-out>
  </amplify-authenticator>
</template>

<script>
import { API } from "@aws-amplify/api";
import { createTask, deleteTask, updateTask } from "./graphql/mutations";
import { listTasks } from "./graphql/queries";

export default {
  name: "App",
  created() {
    this.getTasks();
  },
  data() {
    return {
      id: "",
      name: "",
      description: "",
      status: "",
      track: "",
      qaName: "",
      priority: "",
      storyPoints: 0,
      sprintName: "",
      releaseDate: "",
      tasks: [],
      error: "",
      isEditClicked: false,
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
          this.error = key + " missing";
          console.log(task[key]);
          return key;
        }
      }
      await API.graphql({
        query: createTask,
        variables: { input: task },
      });
      this.name = null;
      this.description = null;
      this.status = null;
      this.track = null;
      this.qaName = null;
      this.priority = null;
      this.storyPoints = null;
      this.sprintName = null;
      this.releaseDate = null;
      if (this.tasks.some((item) => item.name === task.name)) return;
      this.tasks = [...this.tasks, task];
    },
    async getTasks() {
      const tasks = await API.graphql({
        query: listTasks,
      });
      this.tasks = tasks.data.listTasks.items;
    },
    async deleteTask(task) {
      console.log(task);
      const result = await API.graphql({
        query: deleteTask,
        variables: {
          input: {
            id: task.id,
          },
        },
      });
      if (result.data) {
        this.tasks = this.tasks.filter((item) => item.id !== task.id);
      }
    },
    prepareTaskForEdit(task) {
      this.isEditClicked = true;
      this.id = task.id;
      this.name = task.name;
      this.description = task.description;
      this.status = task.status;
      this.track = task.track;
      this.qaName = task.qaName;
      this.priority = task.priority;
      this.storyPoints = task.storyPoints;
      this.sprintName = task.sprintName;
      this.releaseDate = task.releaseDate;
    },
    async updateTask() {
      const {
        id,
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
        id,
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
          this.error = key + " missing";
          console.log(task[key]);
          return key;
        }
      }
      const result = await API.graphql({
        query: updateTask,
        variables: { input: task },
      });
      this.id = null;
      this.name = null;
      this.description = null;
      this.status = null;
      this.track = null;
      this.qaName = null;
      this.priority = null;
      this.storyPoints = null;
      this.sprintName = null;
      this.releaseDate = null;
      console.log(result);
      if (result.data.updateTask) {
        this.tasks = this.tasks.filter((item) => item.id !== task.id);
      }
      this.tasks = [...this.tasks, task];
    },
  },
};
</script>

<style>
* {
  font-family: 'Raleway', sans-serif;
}
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
