<template>
  <amplify-authenticator>
    <div id="task-app">
      <h1>Task manager</h1>
      <vs-row>
        <vs-col vs-type="flex" vs-justify="center" vs-align="center" w="12">
          <p class="error-para">{{ error }}</p>
        </vs-col>
      </vs-row>
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
            <vs-option label="Select" value="Select"> Select </vs-option>
            <vs-option label="New" value="New"> New </vs-option>
            <vs-option label="Under review" value="Under review">
              Under review
            </vs-option>
            <vs-option label="On hold" value="On hold"> On hold </vs-option>
            <vs-option label="Backlog" value="Backlog"> Backlog </vs-option>
            <vs-option label="Awaiting response" value="Awaiting response">
              Awaiting response
            </vs-option>
            <vs-option label="Dev ready" value="Dev ready">
              Dev ready
            </vs-option>
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
            <vs-option label="Committed" value="Committed">
              Committed
            </vs-option>
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
            <vs-option
              label="Released on Standard"
              value="Released on Standard"
            >
              Released on Standard
            </vs-option>
            <vs-option
              label="Verified on Standard"
              value="Verified on Standard"
            >
              Verified on Standard
            </vs-option>
            <vs-option label="Completed" value="Completed">
              Completed
            </vs-option>
            <vs-option label="Cancelled" value="Cancelled">
              Cancelled
            </vs-option>
          </vs-select>
        </vs-col>
        <vs-col vs-type="flex" vs-justify="center" vs-align="center" w="4">
          <vs-select placeholder="Track" v-model="track">
            <vs-option label="Select" value="Select"> Select </vs-option>
            <vs-option label="Rapid" value="Rapid"> Rapid </vs-option>
            <vs-option label="Standard" value="Standard"> Standard </vs-option>
          </vs-select>
        </vs-col>
      </vs-row>

      <vs-row>
        <vs-col vs-type="flex" vs-justify="center" vs-align="center" w="4">
          <vs-input v-model="qaName" placeholder="QA name" />
        </vs-col>
        <vs-col vs-type="flex" vs-justify="center" vs-align="center" w="4">
          <vs-select placeholder="Priority" v-model="priority">
            <vs-option label="Select" value="Select"> Select </vs-option>
            <vs-option label="Low" value="Low"> Low </vs-option>
            <vs-option label="Normal" value="Normal"> Normal </vs-option>
            <vs-option label="High" value="High"> High </vs-option>
            <vs-option label="Urgent" value="Urgent"> Urgent </vs-option>
            <vs-option label="Immediate" value="Immediate">
              Immediate
            </vs-option>
          </vs-select>
        </vs-col>
        <vs-col vs-type="flex" vs-justify="center" vs-align="center" w="4">
          <vs-input v-model="storyPoints" placeholder="Story points" />
        </vs-col>
      </vs-row>

      <vs-row>
        <vs-col vs-type="flex" vs-justify="center" vs-align="center" w="4">
          <vs-input v-model="sprintName" placeholder="Sprint" />
        </vs-col>
        <vs-col vs-type="flex" vs-justify="center" vs-align="center" w="4">
          <vs-input
            type="date"
            v-model="releaseDate"
            placeholder="Release date"
          />
        </vs-col>
      </vs-row>

      <vs-row>
        <vs-col vs-type="flex" vs-justify="center" vs-align="center" w="12">
          <div v-if="isEditClicked" id="button-container">
            <vs-button id="update-button" v-on:click="updateTask"
              >Update task</vs-button
            >
          </div>
          <div v-else id="button-container">
            <vs-button id="create-button" v-on:click="createTask"
              >Create task</vs-button
            >
          </div>
        </vs-col>
      </vs-row>

      <h2>Tasks</h2>

      <div v-for="task in tasks" :key="task.id" class="task-div">
        <vs-row>
          <vs-col vs-type="flex" vs-justify="center" vs-align="center" w="4">
            <h3>{{ task.name }}</h3>
          </vs-col>
        </vs-row>

        <vs-row>
          <vs-col vs-type="flex" vs-justify="center" vs-align="center" w="4">
            <p><strong>Description:</strong> {{ task.description }}</p>
          </vs-col>
        </vs-row>

        <vs-row>
          <vs-col vs-type="flex" vs-justify="center" vs-align="center" w="4">
            <p><strong>Status:</strong> {{ task.status }}</p>
          </vs-col>
          <vs-col vs-type="flex" vs-justify="center" vs-align="center" w="4">
            <p><strong>Priority:</strong> {{ task.priority }}</p>
          </vs-col>
          <vs-col vs-type="flex" vs-justify="center" vs-align="center" w="4">
            <p><strong>Sprint name:</strong> {{ task.sprintName }}</p>
          </vs-col>
        </vs-row>

        <vs-row>
          <vs-col vs-type="flex" vs-justify="center" vs-align="center" w="4">
            <p><strong>Track:</strong> {{ task.track }}</p>
          </vs-col>
          <vs-col vs-type="flex" vs-justify="center" vs-align="center" w="4">
            <p><strong>QA name:</strong> {{ task.qaName }}</p>
          </vs-col>
          <vs-col vs-type="flex" vs-justify="center" vs-align="center" w="4">
            <p><strong>Release date:</strong> {{ task.releaseDate }}</p>
          </vs-col>
        </vs-row>

        <vs-row>
          <vs-col vs-type="flex" vs-justify="center" vs-align="center" w="4">
            <p><strong>Story points:</strong> {{ task.storyPoints }}</p>
          </vs-col>
        </vs-row>

        <vs-row justify="flex-end">
          <vs-col w="1">
            <vs-button
              icon
              circle
              color="#7d33ff"
              relief
              v-on:click="prepareTaskForEdit(task)"
              ><span class="material-icons">edit</span></vs-button
            >
          </vs-col>
          <vs-col w="1">
            <vs-button
              icon
              circle
              color="#fd0054"
              relief
              v-on:click="deleteTask(task)"
              ><span class="material-icons">delete</span></vs-button
            >
          </vs-col>
        </vs-row>
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
      storyPoints: "",
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
          this.error =
            key.charAt(0).toUpperCase() + key.slice(1) + " is missing.";
          console.log(task[key]);
          return key;
        }
      }
      await API.graphql({
        query: createTask,
        variables: { input: task },
      });
      this.name = "";
      this.description = "";
      this.status = "Select";
      this.track = "Select";
      this.qaName = "";
      this.priority = "Select";
      this.storyPoints = "";
      this.sprintName = "";
      this.releaseDate = "";
      this.tasks = null;
      this.getTasks();
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
        this.tasks = null;
        this.getTasks();
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
          key.charAt(0).toUpperCase() + key.slice(1) + " is missing.";
          console.log(task[key]);
          return key;
        }
      }
      const result = await API.graphql({
        query: updateTask,
        variables: { input: task },
      });
      this.id = "";
      this.name = "";
      this.description = "";
      this.status = "Select";
      this.track = "Select";
      this.qaName = "";
      this.priority = "Select";
      this.storyPoints = "";
      this.sprintName = "";
      this.releaseDate = "";
      console.log(result);
      this.tasks = null;
      this.getTasks();
    },
  },
};
</script>

<style>
@import "App.css";
</style>
