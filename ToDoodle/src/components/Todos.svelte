<script>
  import FilterButton from './FilterButton.svelte'
  import Todo from './Todo.svelte'
  import MoreActions from './MoreActions.svelte';
  import NewTodo from './NewTodo.svelte';

  export let todos = []
  $: totalTodos = todos.length // #ReactiveValues
  $: completedTodos = todos.filter((todo) => todo.completed).length // #ReactiveValues
  let newTodoName = ''
  $: newTodoId = totalTodos ? Math.max(...todos.map((t) => t.id)) + 1 : 1 // #ReactiveValues

  let filter = 'all'
  const filterTodos = (filter, todos) =>
  filter === 'active' ? todos.filter((t) => !t.completed) :
  filter === 'completed' ? todos.filter((t) => t.completed) :
  todos

  function removeTodo(todo) {
    todos = todos.filter((t) => t.id !== todo.id)
  }

  function addTodo(name) {
    todos = [...todos, { id: newTodoId, name, completed: false }];
  }

  function updateTodo(todo) {
    const i = todos.findIndex((t) => t.id === todo.id)
    todos[i] = { ...todos[i], ...todo }
  }

  const checkAllTodos = (completed) => {
    todos.forEach((t) => t.completed = completed);
    todos = todos;
  }

  const removeCompletedTodos = () => todos = todos.filter((t) => !t.completed);

</script>

<!-- Todos.svelte -->
<!-- ToDoodle interface -->
<div class="todoapp stack-large">
  <!-- NewTodo -->
  <!-- Component that allows for the creation of new Todo tasks -->
  <!-- #ReusableComponent -->
  <!-- #EventHandler -->
  <NewTodo on:addTodo={(e) => addTodo(e.detail)} />

  
    <!-- Filter -->
    <!-- Allows for tasks to be filtered by all, active, or completed tasks-->
    <!-- #ReusableComponent -->
    <!-- #Props -->
    <FilterButton bind:filter />
  
    <!-- TodosStatus -->
    <h2 id="list-heading"> {completedTodos} out of {totalTodos} items completed</h2>
  
    <!-- To-dos -->
    <!-- List of todo tasks -->
    <ul role="list" class="todo-list stack-large" aria-labelledby="list-heading">
      <!-- #ControlFlow -->
      {#each filterTodos(filter, todos) as todo (todo.id)}
      <li class="todo">
        <!-- #ReusableComponent -->
        <!-- #Props -->
        <!-- #EventHandler -->
        <Todo {todo} on:update={(e) => updateTodo(e.detail)} on:remove={(e) =>
        removeTodo(e.detail)} />
      </li>   
      <!-- #ControlFlow -->  
      {:else}
      <li>Nothing to do here!</li>
      <!-- #ControlFlow -->  
      {/each}
    </ul>
  
    <hr />
  
  <!-- MoreActions -->
  <!-- Component that creates streamlining actions like remove all and check all -->
  <!-- #ReusableComponent -->
  <!-- #Props -->
  <!-- #EventHandler -->
  <MoreActions {todos}
    on:checkAll={(e) => checkAllTodos(e.detail)}
    on:removeCompleted={removeCompletedTodos}
  />
  </div>
  