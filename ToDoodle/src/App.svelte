<script>
  import Todos from "./components/Todos.svelte";

  let todos = [
    { id: 1, name: "Create a Svelte Todo List app", completed: true },
    { id: 2, name: "Master CS178", completed: false },
    { id: 3, name: "Make Elena happy by mastering CS178", completed: false }
  ];
</script>

<Todos {todos} />

