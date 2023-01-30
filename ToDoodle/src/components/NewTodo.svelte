<script>
    import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();
  
    let name = '';
    let nameEl; // reference to the name input DOM node
  
    const addTodo = () => {
      dispatch('addTodo', name);
      name = '';
      nameEl.focus(); // give focus to the name input
    }
  
    const onCancel = () => {
      name = '';
      nameEl.focus(); // give focus to the name input
    }
  </script>
  
  <form on:submit|preventDefault={addTodo} on:keydown={(e) => e.key === 'Escape' && onCancel()}>
    <h1 class="label-wrapper">
        <label for="todo-0" class="label__lg">ToDoodle</label>
    </h1>
    <h2 class="label-wrapper">
      <label for="todo-0" class="label__lg">What needs to be done?</label>
    </h2>
    <input bind:value={name} bind:this={nameEl} type="text" id="todo-0" autoComplete="off" class="input input__lg" />
    <button type="submit" disabled={!name} class="btn btn__primary btn__lg">Add</button>
  </form>
  
  