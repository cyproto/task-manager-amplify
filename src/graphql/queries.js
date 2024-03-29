/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getTask = /* GraphQL */ `
  query GetTask($id: ID!) {
    getTask(id: $id) {
      id
      name
      description
      status
      track
      qaName
      priority
      storyPoints
      sprintName
      releaseDate
      createdAt
      updatedAt
      owner
    }
  }
`;
export const listTasks = /* GraphQL */ `
  query ListTasks(
    $filter: ModelTaskFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTasks(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        description
        status
        track
        qaName
        priority
        storyPoints
        sprintName
        releaseDate
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
